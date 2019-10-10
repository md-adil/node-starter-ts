# Simple Node js starter with express routing and objection model.

    git clone https://github.com/md-adil/node-starter my-project

```bash
cd my-project
yarn
cp .env.example .env
# change .env file update database name & settings
yarn migrate
yarn start
```

### We have already written some codes for you

#### Login
```js
// src/routes/api.js

const controller = require("../controllers"),
    loginController = controller("auth/loginController");
route.post("/login", loginController.login);
```
```js
// src/controllers/auth/loginController.js

exports.login = async req => {
    if (!req.body.email || !req.body.password) {
        throw new ValidationError('Email and password is required')
    }
    const user = await User.query().where('email', req.body.email).first();
    if (!user) {
        throw new ValidationError('Invalid credentials');
    }
    if (!await bcrypt.compare(req.body.password, user.password)) {
        throw new ValidationError('Invalid credentials');
    }
    const token = jwt.sign({ iat: (new Date()).getTime(), sub: user.id }, config.key);
    return {
        token, user
    }
}


```
### Request
    POST /api/login
Headers

    Content-Type: application/json
    Accept: application/json

Required  `Accept: application/json`  when need json as response

Request body
```json
{
    "email": "someemail@somedomain.com",
    "password": "password"
}
```
### Response
Error response body with `status code 422`
```json
{
    "message": "Invalid credentials"
}
```
Success Response body
```json
{
    "token": "<token>",
    "user": {
        "id": 1,
        "name": "Name",
        "email": "someemail@somedomain.com",
    }
}
```

#### Resister
```js
// src/routes/api.js

const registerController = controller("auth/registerController");
router.post("/users", registerController.register);
```

```js
// src/controllers/auth/registerController.js

exports.register = async req => {
    if (await User.query().where('email', req.body.email).select('id').first()) {
        throw new ValidationError("It seems someone has already take this email address.");
    }
    const user = await User.query().insert({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10)
    });
    const token = jwt.sign({iat: (new Date).getTime(), sub: user.id}, config.key);
    return {
        token, user
    }
};
```
#### Fetching users
```js
// src/routes/api.js

const controller = require("../controllers");
const userController = controller("userController");

router.get("/users", userController.index);
```

```js
// src/controllers/userController.js

const { ResponseError } = require("../errors");
const User = require("../models/User");

exports.index = async req => {
    if (!req.query.page) {
        throw new ResponseError(
            "Page is required" /** response error message */,
            422 /** Response error code */
        );
    }
    return User.query().page(req.query.page, 25);
};
```


### Request
    GET /api/users?page=1

Headers

    Accept: application/json
    Authorization: <token> // the token from login response

Required  `Accept: application/json`  when need json as response


### Response
Error response body with `status code 422`
```json
{
    "message": "Page is required"
}
```
Success Response body
```json
{
    "results": [
        {
            "id": 1,
            "name": "Adil",
            "email": "adil.sudo@gmail.com",
        },
        {
            "id": 2,
            "name": "Adil",
            "email": "md-adil@gmail.com",
        }
    ],
    "total": 2
}
```

### Database and Migrations

Migrate database

```bash
yarn migrate
```

Connect database through native client

```bash
yarn db:connect
```

Show all tables through native client

```bash
yarn db:tables
```

Explain table through native client

```bash
yarn db explain users
```

Select from tables with or without limit through native client

```bash
yarn db select users 100 # default 1000
```

## Note
This is only for mysql and rest api.

This is basic setup, how I use in my production environment, I want to extend it as full-fledged another javascript backend framework.
Need some feedback and suggestion.

Thanks In Advanced,
Adil.