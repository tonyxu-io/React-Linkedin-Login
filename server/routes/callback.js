var express = require('express');
var router = express.Router();
const request = require('superagent');

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
    .send('redirect_uri=http://localhost:3001/callback')
    .send('client_id=86012cynxvvidr')
    .send('client_secret=kPc9a1iKrbnwdkCa')
    .send(`code=${code}`)
    .send(`state=${state}`)
}

module.exports = router;
