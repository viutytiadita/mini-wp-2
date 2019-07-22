# mini-wp

## Users

#### all endpoint Users

| method | routes                        | detail                              | body | headers | query |
| ------ | ----------------------------- | ------------------------------------|--------|-------------|----|
| POST   | /users/register                 | create new `User`                         | email, password,username | - | -|
| POST   | /users/login                    | `User` login to system                    | email, password | - | -|
| POST   | /users/tokensignin                    | `User` sign in with Google                   | - | - | -|                

------

#### Example endpoint

> POST / users/register
#### input all required
    {
        "email": "tviuty@yahoo.com",
        "password": "123456",
        "username" : "tviuty"
    }

minimum password length : 6

#### expected output
status code: 201

object

    {
        "id": 2,
        "email": "tviuty1206@yahoo.com",
        "password": "$2a$10$hnpJVqap6dJRTIANw8avFOSRe2Uhy43KD2jz5DCd6yIZBYlTUaN9.",
        "username" : "tviuty",
        "updatedAt": "2019-07-08T10:01:21.667Z",
        "createdAt": "2019-07-08T10:01:21.667Z"
    }
    

 > POST / users/login
#### input
    {
        "email": "tviuty@yahoo.com",
        "password": "123456",
    }
#### expected output
status code: 200

object

    {
       "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0dml1dHlAeWFob28uY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkdG5iaU52eHp2Vmpud2cuOUJBYXJiZVBGVU5BaDFzbEZEbFJpODU0a1h4VGxCYzdEeXYvZlMiLCJjcmVhdGVkQXQiOiIyMDE5LTA3LTA4VDA2OjExOjIyLjU5NFoiLCJ1cGRhdGVkQXQiOiIyMDE5LTA3LTA4VDA2OjExOjIyLjU5NFoiLCJpYXQiOjE1NjI1NzE2NzIsImV4cCI6MTU2MjU3NTI3Mn0.HF9CmMpJrzSV64fO-T6CH76bJkPCf22td4PddDa-lW8",
        "user": "eyJhbGciOiJIUzI1NiIsInR9",
        "username": "tviuty"
    }

> same as sign in with google

## Category

### all endpoint Category

| method | routes                        | detail                              | body | headers |
| ------ | ----------------------------- | ------------------------------------|--------|-------------|
| GET    | /categories/all                    |   show `Todo` list created by owner                 | - | - |
| GET    | /categories/one/:name               | show one `Todo` list by id              | - | - |
                 

------

## Article

### all endpoint Article

| method | routes                        | detail                              | body | query | headers |
| ------ | ----------------------------- | ------------------------------------|--------|-------------|----|
| GET    | /articles/all                   |   show all `Articles` list                  | - | - | - |
| GET    | /articles/my                   |   show `Articles` list created by owner                  | - |  - | token |
| GET    | /articles/category/:id                    |   show `Articles` list by category id   | - | - | - |
| GET    | /articles/title/:title             |   show `Articles` list by title of articles  | - | - | - |
| GET    | /articles/find                |   show `Articles` list by name of tag  | - | tag | - |
| POST   | /articles                    | create new `Articles`                   | title, content,file,category |  - | token |
| PUT    | /articles/:articleid       | update `Articles` content         | title, content |  - | token |
| DELETE   | /articles/:articleid             | delete one of `Articles` list by id          | - |  - | token |
| PATCH    | /articles/pic/:articleid             | update picture from one of `Articles` list          | file |  - | token |
| PATCH    | /articles/tag/:articleid             | push tags to one of `Articles` list          | tag(array) |  - | token |
| PATCH    | /articles/deletetag/:articleid             | assign tags to array of null to one of `Articles` list          | - | - | token |
------

> GET / articles / all

#### expected output
status code: 200

array of object

    [
        {
            "category_id":"5d2adabbdd30f45770f968c8",
            "picture": "https://storage.googleapis.com/mini-word/1563522326221Ci836oTUoAEMZ9_.jpg_large",
            "tags":[],
            "_id":"5d2b509fadf64f264af80497",
            "title":"Beautiful Days ",
            "content":"<h5> enjoy everyday's life </h5>",
            "user_id":"5d2adabbdd30f45770f96836",
            "createdAt":"2019-07-14T15:56:15.571Z",
            "updatedAt":"2019-07-14T15:56:15.571Z",
            "__v":0
        }
    ]

> POST / articles

#### input required
    {
        "title":"Beautiful Days ",
        "content": "<h5> enjoy everyday's life </h5>",
        "picture": "https://storage.googleapis.com/mini-word/1563522326221Ci836oTUoAEMZ9_.jpg_large",
        "category" : "5d2adabbdd30f45770f968c8" (optional)
        "tag" : ["holiday","enjoy","life"]           (optional)
    }


#### expected output
status code: 201

    {
        "category_id":"5d2adabbdd30f45770f968c8",
        "picture": "https://storage.googleapis.com/mini-word/1563522326221Ci836oTUoAEMZ9_.jpg_large",
        "tags":["holiday","enjoy","life"],
        "_id":"5d2b509fadf64f264af80497",
        "title":"Beautiful Days ",
        "content":"<h5> enjoy everyday's life </h5>",
        "user_id":"5d2adabbdd30f45770f96836",
        "createdAt":"2019-07-14T15:56:15.571Z",
        "updatedAt":"2019-07-14T15:56:15.571Z",
        "__v":0
    }




## Example Expected output validation error if req.body empty for all Collection

status code : 400

    {
        "message":"Article validation failed: title: Path `title` is required., content: Path `content` is required."
    }


#### expected output JsonWebTokenError (try to edit or delete document without token)
status code : 401

    {
        "message": "Sorry you are not authorized"
    }

