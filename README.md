# Pintereach

Streamlining and bootstrapping research into a modern social paradigm.

Product Vision: https://docs.google.com/document/d/1az045aRxpwRjG878pPx-YY3G4sVOqY-vpnc0QBYSwLA/edit#

## Overview
This API is used as part of _Pitnereach_ and allows for CRUD operations to be preformed on the Users, Boards, and Articles.

This documentation will cover all of the data models and endpoints which can be accessed via:
> <https://pintereach-backend.herokuapp.com/>

# Endpoints

## Authentication

| Request Type | Endpoint       | Description   |
|:------------:|:--------------:|:-------------:|
| POST         | /auth/register | Creates User  |
| POST         | /auth/login    | Logs In User  |


* JSON Web Tokens Used to Verify Users

### Register

* A __POST__ request to the `/auth/register` endpoint expects to recieve an object in the following format: 

```javascript
{
    "username": "mikeharms",
    "password": "steak",
    "first_name": "Michael",
    "last_name": "Harms",
    "email": "michael.harms6010@gmail.com"
}
```

| Field        | Type     | Required   | Unique     |
|:------------:|:--------:|:----------:|:----------:|
| username     | string   |  true      | true       |
| password     | string   |  true      | false      |
| first_name   | string   |  false     | false      |
| last_name    | string   |  false     | false      |
| email        | string   |  false     | false      |

### Login

* A __POST__ request to the `auth/login` endpoint expects to recieve an object in the following format: 

```javascript
{
    "username": "mikeharms",
    "password": "steak"
}
```

| Field        | Type     | Required   | Unique     |
|:------------:|:--------:|:----------:|:----------:|
| username     | string   |  true      | true       |
| password     | string   |  true      | false      |

* The server response to a _login_ will include a token. This token is required to be in the authorization header of all requests to this api's content endpoints. Tokens expire in 24h and require the user to log in again.

## An authorization header with a valid token is required for _ALL_ the endpoints below this line. _Tokens expire in 24h!_ 

| Request Type | Endpoint                    | Description                |
|:------------:|:---------------------------:|:--------------------------:|
| GET          | /users/                     | Gets all Users             |
| GET          | /users/:user_id             | Gets boards by a user's ID |
| PUT          | /board/:board_id            | Edits a board's information|
| DELETE       | /board/:user_id             | Deletes a board            |

### GET Users

* A __GET__ request to the `users/all` endpoint will return all users.

## Boards

| Request Type | Endpoint                    | Description                |
|:------------:|:---------------------------:|:--------------------------:|
| GET          | /boards/                    | Gets all Boards            |
| POST         | /boards/                    | Creates a new board        |
| GET          | /board/:user_id             | Gets boards by a user's ID |
| PUT          | /board/:board_id            | Edits a board's information|
| DELETE       | /board/:board_id            | Deletes a board            |

### Requests

* A __GET__ request to the `/boards/` endpoint returns an array of objects formatted as follows: 

```javascript
{
        "id": 4,
        "board_title": "Memetics",
        "user_id": 3
}
```

* A __GET__ request to the `/boards/:id` endpoint returns a single object in the above format. 

| Field            | Type      | Required   | Unique     |
|:----------------:|:---------:|:----------:|:----------:|
| board_title      | String    |  true      | false      |
| user_id          | Integer   |  true      | false      |

* A __POST__ request to the `/boards/` endpoint expects to receive an object as follows. 

```javascript
{
        "board_title": "Memetics",
        "user_id": 3
}
```

* The server will automatically supply new boards with a unique ID.

* A __PUT__ request to the `/boards/:id` endpoint expects to receive an object formatted as follows: 

```javascript
{
        "id": 4,
        "board_title": "New Title",
        "user_id": 3
}
```

* A __DELETE__ request to the `/boards/:id` endpoint deletes the board that corresponds to that id, this action can not be undone.


## Articles

| Request Type | Endpoint               | Description                   |
|:------------:|:----------------------:|:-----------------------------:|
| GET          | /articles              | Gets all articles             |
| POST         | /articles              | Creates a new article         |
| GET          | /articles/:board_id    | Gets articles from one board  |
| PUT          | /articles/:article_id  | Edit's an article's data      |
| DELETE       | /articles/:article_id  | Deletes specified article     |

### Requests

* A __GET__ request to the `/articles/` endpoint returns an array of objects in the following format: 

```javascript
{
    "id": 6,
    "url": "https://exampleurl.com",
    "article_label": "Crispr babies 'not the same as Godzilla', say experts",
    "board_id": 1
}
```

| Field            | Type      | Required   | Unique     |
|:----------------:|:---------:|:----------:|:----------:|
| url              | String    |  true      | false      |
| article_label    | String    |  true      | false      |
| board_id         | Integer   |  true      | false      |


* A __POST__ request to the `/articles/` endpoint expects to receive an object in the request body as follows: 

```javascript
{
    "url": "https://exampleurl.com",
    "article_label": 'Gene Editing "Needs funding immediately," says Genomics Editor, Ed Gene',
    "board_id": 1
}
```

* The server will automatically add a unique ID to new articles

* A __PUT__ request to the `/articles/:id` endpoint expects to receive an object as follows: 

```javascript
{
    "id": 6,
    "url": "https://updatedurl.com",
    "article_label": "Updated Content Goes Here",
    "board_id": 2
}
```

* A __DELETE__ request to the `/articles/:id` endpoint deletes the article that corresponds to that id, this action can not be undone.

