#!/bin/bash 
timestamp=`date "+%Y-%m-%dT%H:%M";`
echo "export const BuildTimeFile = { buildtime:new Date('${timestamp}') };" | tee src/environments/buildtime-file.ts
ng build  
wrangler publish
