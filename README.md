# Work Log System

A web application where employers can keep a check on their employees' work done
every particular day.

### Deployment link: https://famous-haupia-4d946e.netlify.app/

## Installation

Read on on how to set up this for development. Clone the repo.

```
$ git clone https://github.com/ronnie-36/Work-Log-System.git
$ cd Work-Log-System
```

### Server

#### .env file

Rename `.env.example` to `.env` and fill in database connection strings, JWT secret and your client and server production URLs.

```
#db
MONGO_URI_DEV=mongodb://localhost:27017/worklogsystem
MONGO_URI_PROD=

#jwt
JWT_SECRET_DEV=secret
JWT_SECRET_PROD=

#site urls
SERVER_URL_DEV=http://localhost:5000
SERVER_URL_PROD=
FRONTEND_URL=http://localhost:3000
```

#### Install dependencies

```
$ cd server
$ npm install
```

#### Run the server

You are good to go, server will be available on `http://localhost:5000`

```
$ npm run server
```

### Client

Just install the dependencies and run the dev server. App will load on `http://localhost:3000`.

```
$ cd client
$ npm install
$ npm start
```

That's it as far for development setup.

#### Database setup

But before that you need MongoDB database, so go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), create cluster, whitelist all IPs and get database URL. Set that URL in `.env` file as `MONGO_URI_PROD`.

```
MONGO_URI_PROD=mongodb+srv://<your-username-here>:<your-password-here>@cluster0-abcd.mongodb.net/test?retryWrites=true&w=majority
```
