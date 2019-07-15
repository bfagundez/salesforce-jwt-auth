# salesforce-jwt-auth

Salesforce JWT auth written in modern js.

Usage:
```
const salesforceJWT = require('salesforce-jwt-auth')
const jsforce = require('jsforce')

// load your key
const privateKey = require('fs').readFileSync('./certificates/server.key', 'utf8')

const accessToken = await salesforceJWT.getToken(<clientId>, privateKey, <username>)
const connOptions = {
  instanceUrl : <instance url>,
  accessToken : accessToken
}

// use JSforce
const conn = await new jsforce.Connection(connOptions)
```
