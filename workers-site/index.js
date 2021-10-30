import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'
import { request } from 'http'


/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = true

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }
    event.respondWith(new Response('Internal Error from calcpwa', { status: 500 }))
  }
})

var genID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return Math.random().toString(36).substr(2, 9);
};

async function handleEvent(event) {
  const url = new URL(event.request.url)
  let options = {}
  console.log("*** handleEvent: ", url)

  try {
    if (DEBUG) {      
      // customize caching
      options.cacheControl = {
        bypassCache: true,
      };
    }
    console.log("** pathname: ", url.pathname)
    // determine to serve from cloudflare key value store (cfkv) or the static site
    if (url.pathname.startsWith("/cfkv")) {
      // note: 'calcpwa' is defined in the wrangler.toml file as kvstore
      // TODO: we should not hardcode this, but how to get a configured namespace is unknown
      console.log("** kv operation, method: ", event.request.method)
      if (event.request.method === "PUT") {
        const uid = "sheet:" + genID()
        console.log("** store key: " + uid)
        const body = await event.request.text()
        try {
          // two weeks expiration
          await calcpwa.put(uid, body, {expirationTtl: 1249920})
          // return generated id
          const data = {
            uid: uid
          }
          const json = JSON.stringify(data, null, 2)        
          return new Response(json, {
            status: 200,
            headers: {
              "content-type": "application/json;charset=UTF-8"
            },
          })
        } catch (err) {
          console.log("** set key raised error: ", uid, err)
          return new Response(err, { status: 500 })
        }  
      } else {
        // retrieve from KV
        try {
          // retrieve id from url/pathname:  /cfkv/sheets/sheet:c125np00d 
          // for now we ignore whether the type, sheets, is properly specified
          const pathArray = url.pathname.split('/')
          const sheetId = pathArray[pathArray.length-1]
          console.log("** retrieve sheetId: ", sheetId)
          // we could detect whether sheetId is not empty to give better error feedback
          let value = await calcpwa.get(sheetId)
          if (value) {
            console.log("** retrieved key ", sheetId)
            return new Response(value, { status: 200 })
          } else {
            console.log("** key not found ", sheetId)
            return new Response("{}", { status: 404 })
          }  
        } catch (err) {
          console.log("** get key test123 raised error: ", err)
          return new Response(err, { status: 500 })
        }  
      }
    }

    console.log("** request to serve angular application: ", event.request)

    // if the url starts with a prefix then strip this
    options.mapRequestToAsset = handlePrefix(/^\/sheets\/.*/)

    // return angular application
    const page = await getAssetFromKV(event, options);

    // allow headers to be altered
    const response = new Response(page.body, page);

    // TODO: set header sheetId:  pathname:  /share/sheet:2bia918r7 
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("Referrer-Policy", "unsafe-url");
    response.headers.set("Feature-Policy", "none");

    return response;

  } catch (e) {
    // if an error is thrown try to serve the asset at 404.html
    if (!DEBUG) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/404.html`, req),
        })

        return new Response(notFoundResponse.body, { ...notFoundResponse, status: 404 })
      } catch (e) {}
    }

    return new Response(e.message || e.toString(), { status: 500 })
  }
}


function handlePrefix(prefix) {
  return request => {
    // compute the default (e.g. / -> index.html)
    let defaultAssetKey = mapRequestToAsset(request)
    let url = new URL(defaultAssetKey.url)
    console.log("request for url: ", url)

    // replace the prefix (a sheet to be shared) with root index.html
    // the pwa will load and use the original (!) url to navigate to the right place 
    // this will load the sheet
    url.pathname = url.pathname.replace(prefix, '/index.html')
    console.log("stripped url: ", url)

    // inherit all other props from the default request
    return new Request(url.toString(), defaultAssetKey)
  }
}
