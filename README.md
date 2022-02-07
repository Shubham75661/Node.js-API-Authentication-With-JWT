
# Node.js-API-Authentication-With-JWT


A project which will create a user and authenticate user using JWT. The users password 
will gets decrypted using bcryptjs  


## API Reference

#### Create user

```http
  POST /api/user/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**.   |
| `email` | `string` | **Required**.   |
| `password` | `string` | **Required**.   |




#### Login user

```http
  POST /api/user/login

```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. user's email |
| `password`      | `string` | **Required**. user's password |

#### Private routes

```http
  POST /api/posts
