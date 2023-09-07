# Meetups Api

🎉 Api for meetups service, user roles control

## Installation:

```
$ yarn install
```

## .development.env && .production.env

-   **_PORT_** - Your host of application
-   **_POSTGRES_HOST_** -
-   **_POSTGRES_USER_** -
-   **_POSTGRES_DB_** -
-   **_POSTGRES_PASSWORD_** -
-   **_POSTGRES_PORT_** -
-   **_JWT_ACCESS_TOKEN_SECRET_** -
-   **_JWT_ACCESS_TOKEN_EXPIRATION_TIME_** -
-   **_JWT_REFRESH_TOKEN_SECRET_** -
-   **_JWT_REFRESH_TOKEN_EXPIRATION_TIME_** -
-   **_SALT_** -

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
