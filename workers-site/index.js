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

  /**
   * You can add custom logic to how we fetch your assets
   * by configuring the function `mapRequestToAsset`
   */
  // options.mapRequestToAsset = handlePrefix(/^\/docs/)

  try {
    if (DEBUG) {      
      // customize caching
      options.cacheControl = {
        bypassCache: true,
      };
    }
    console.log("** pathname: ", url.pathname)
    if (url.pathname.startsWith("/cf/kv")) {
      // note: 'calcpwa' is defined in the wrangler.toml file as kvstore
      console.log("** kv operation, method: ", event.request.method)
      if (event.request.method === "PUT") {
        const uid = "sheet/" + genID()
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
          let value = await calcpwa.get("test123")
          if (value) {
            console.log("** retrieved key test123")
            return new Response(value, { status: 200 })
          } else {
            console.log("** key test123 not found ")
            return new Response("{}", { status: 404 })
          }  
        } catch (err) {
          console.log("** get key test123 raised error: ", err)
          return new Response(err, { status: 500 })
        }  
      }
    }

    // return angular application
    const page = await getAssetFromKV(event, options);

    // allow headers to be altered
    const response = new Response(page.body, page);

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

/**
 * Here's one example of how to modify a request to
 * remove a specific prefix, in this case `/docs` from
 * the url. This can be useful if you are deploying to a
 * route on a zone, or if you only want your static content
 * to exist at a specific path.
 */
function handlePrefix(prefix) {
  return request => {
    // compute the default (e.g. / -> index.html)
    let defaultAssetKey = mapRequestToAsset(request)
    let url = new URL(defaultAssetKey.url)

    // strip the prefix from the path for lookup
    url.pathname = url.pathname.replace(prefix, '/')

    // inherit all other props from the default request
    return new Request(url.toString(), defaultAssetKey)
  }
}