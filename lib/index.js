const jwt = require('jsonwebtoken')
const FormData = require('form-data')

function signJWT(clientId, privateKey, username){
  const options = {
    issuer: clientId,
    audience: 'https://login.salesforce.com',
    subject: username,
    expiresIn: '3m',
    algorithm:'RS256'
  }
  return jwt.sign({ prn: username }, privateKey, options);
}

module.exports.getToken = async function(clientId, privateKey, username) {
  const jwtToken = signJWT(clientId, privateKey, username)
  const form = new FormData()
  form.append('grant_type','urn:ietf:params:oauth:grant-type:jwt-bearer' )
  form.append('assertion', jwtToken)
  try {
    const response = await fetch('https://login.salesforce.com/services/oauth2/token',
      {
        method: "POST",
        body: form
      })
    const parsedResponse = await response.json()
    return parsedResponse.access_token
  } catch (e) {
    throw(e)
  }
}


