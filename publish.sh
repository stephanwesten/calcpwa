#!/bin/bash 
set -e
ng test
timestamp=`date "+%Y-%m-%dT%H:%M";`
echo "export const BuildTimeFile = { buildtime:new Date('${timestamp}') };" | tee src/environments/buildtime-file.ts
ng build  
wrangler publish
