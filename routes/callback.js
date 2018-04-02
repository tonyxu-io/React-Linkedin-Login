var express = require('express');
var router = express.Router();
const request = require('superagent');
require('dotenv').config()

/* GET users listing. */
router.get('/', function(req, res, next) {
  requestAccessToken(req.query.code,req.query.state)
  .then((response) => {
    res.render('callback', { access_token: response.body.access_token});
  })
});

function requestAccessToken(code,state) {
  return request.post('https://www.linkedin.com/oauth/v2/accessToken')
    .send('grant_type=authorization_code')
    .send(`redirect_uri=${process.env.EXPRESS_APP_REDIRECT_URI}`)
    .send(`client_id=${process.env.EXPRESS_APP_CLIENT_ID}`)
    .send(`client_secret=${process.env.EXPRESS_APP_CLIENT_SECRET}`)
    .send(`code=${code}`)
    .send(`state=${state}`)
}

module.exports = router;
