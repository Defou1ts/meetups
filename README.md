# Meetups Api

🎉 Api for meetups service, user roles control

## Installation:

```
$ yarn install
```

## .development.env && .production.env

-   **_PORT_** - Your port of application
-   **_POSTGRES_HOST_** - postgres host (postgres if run in Docker)
-   **_POSTGRES_USER_** - postgres user (postgres)
-   **_POSTGRES_DB_** - postgres db name
-   **_POSTGRES_PASSWORD_** - postgres password to connect (root)
-   **_POSTGRES_PORT_** - postgres port
-   **_JWT_ACCESS_TOKEN_SECRET_** - jwt access secret key
-   **_JWT_ACCESS_TOKEN_EXPIRATION_TIME_** - jwt expiration time
-   **_JWT_REFRESH_TOKEN_SECRET_** - jwt refresh secret key
-   **_JWT_REFRESH_TOKEN_EXPIRATION_TIME_** - jwt refresh expiration time
-   **_SALT_** - salt for bcryptjs, password or tokens hashing

## Basic functionality:

-   One to Many relations
-   Many to Many relations
-   Users role guards
-   Input data validation
-   HTTP correct requests and responses
-   JWT authorization with access token and refresh token
-   Swagger Docmentation

## Technologies stack & project structure:

-   **_NestJS_**
-   **_PostgreSQL_**
-   **_Sequelize_**
-   **_Swagger_**
-   **_Eslint_**
-   **_Prettier_**
-   **_PassportJS_**

## Docker run:

Take care of correct POSTGRES_HOST=postgres if you run app in docker or in local machine

```
$ docker-compose build
$ docker-compose up
```
