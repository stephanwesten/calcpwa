#!/bin/bash 
set -e
# ng test --watch=false
timestamp=`date "+%Y-%m-%dT%H:%M";`
echo "export const BuildTimeFile = { buildtime:new Date('${timestamp}') };" | tee src/environments/buildtime-file.ts
ng build  
wrangler publish

# in the future put angular + workers in production mode