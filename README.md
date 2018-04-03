# React Linkedin Login

A simple app to demo Linkedin login

## Screenshot

![React Linkedin Login Screenshot](https://github.com/yihan-us/storage/blob/master/React-Linkedin-Login.png?raw=true)

## Demo

http://linkedin-login-react.herokuapp.com

## Usage

### Clone

```shell
git clone https://github.com/yihan-us/React-Linkedin-Login.git
```

### Install Dependencies

Intall dependencies for server
```shell
cd React-Linkedin-Login
npm install
```

Install dependencies for client
```shell
cd client
npm install
```
### Get Linkedin App Credential from Linkedin Developer Portal

- client_id
- client_secret

Configure 'http://localhost:3001/callback' as Oauth2.0 redirect uri

### Create Environment Variables

/React-Linkedin-Login/.env

```shell
EXPRESS_APP_CLIENT_ID=${Your-Client-ID}
EXPRESS_APP_CLIENT_SECRET=${Your-Client-Secret}
EXPRESS_APP_REDIRECT_URI=http://localhost:3001/callback
```

/React-Linkedin-Login/client/.env

```shell
REACT_APP_CLIENT_ID=${Your-Client-ID}
REACT_APP_REDIRECT_URI=http://localhost:3001/callback
```

### Build Client

/React-Linkedin-Login/client:

```shell
yarn run build
```

### Start Server

/React-Linkedin-Login/:

```shell
PORT=3001 npm start
```

## Consumed SDK/API

### [Linkedin Javascript SDK](https://developer.linkedin.com/docs/getting-started-js-sdk)

* Request authorization for a user
* Log the user out

### [Linkedin REST API](https://developer.linkedin.com/docs/rest-api)

* Requesting data from the APIs
* Share on Linkedin
* Request OAuth Code
* Request OAuth Access Token