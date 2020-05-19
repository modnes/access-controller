Access Controller Modules
=========================

[![Coverage Status](https://coveralls.io/repos/github/modnes/access-controller/badge.svg?branch=master)](https://coveralls.io/github/modnes/access-controller?branch=master)

Access Controller module provides an utility class to check if an user has access to some resource based in constraints as roles or functions set.


Installing
----------

    npm i @modnes/access-controller


Usage
-----

To check if an user has access to something the [`AccessController.hasAccess()`](https://github.com/modnes/access-controller/wiki/API#hasaccess) method must be called passing an user object and a constraints object.


```javascript
import AccessController from 'path/to/@modnes/access-controller/access-controller.js'

const USER = {
  id: 1,
  roles: ['user'],
  isLogged: () => true
}
const CONSTRAINTS = {
  roles: ['user', 'manager'],
  functions: [
    user => user.id === 1,
    USER.isLogged
  ]
}

if AccessController.hasAccess(USER, CONSTRAINTS) console.log('User has access!')
```

Methods
-------

Access Controller provides more two methods: userHasRoles() and callFunctions(). These methods can be called in isolation in certain circumstances.

### userHasRoles

The [`userHasRoles()`](https://github.com/modnes/access-controller/wiki/API#userhasroles) method checks if an user has some of passed roles.

```javascript
const USER = {
  id: 1,
  roles: ['user']
}
const ROLES = ['user', 'manager']

if AccessController.userHasRoles(USER, ROLES) console.log('User has some of these roles!')
```

### callFunctions

The [`callFunctions()`](https://github.com/modnes/access-controller/wiki/API#callfunctions) method returns `true` if all passed functions return `true`.

```javascript
const USER = {
  id: 1,
  isLogged: () => true
}
const FUNCTIONS = [
  user => user.id === 1,
  USER.isLogged
]

if AccessController.callFunctions(USER, FUNCTIONS) console.log('All functions returned true!')
```

See the [API documentation](https://github.com/modnes/access-controller/wiki/API)
