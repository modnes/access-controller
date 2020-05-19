/**
 * modnes Access Controller
 * @module access-controller
 * @author Luiz Henrique Canet Filho <me@luizca.net>
 */

/**
 * User object with optional roles property as array
 * @typedef {Object} User
 * @property {?string[]} roles User roles
 */

/**
 * Constraints object with roles and/or functions property as array
 * @typedef {Object} Constraints
 * @property {?string[]} roles     Allowed roles
 * @property {?constraintFunction[]} functions User roles
 */

/**
 * This is called when cheking functions
 * @callback constraintFunction
 * @param {User} user
 * @return {Boolean}
 */

/**
 * AccessController
 */
export default class AccessController {
  /**
   * Check if an user has access against constraints
   * @param  {User}         user        User object
   * @param  {Constraints}  constraints [description]
   * @return {Boolean}
   */
  static hasAccess (user, constraints) {
    const CHECK_ROLES = Array.isArray(constraints.roles)
    const CHECK_FUNCTIONS = Array.isArray(constraints.functions)
    let access = true

    if (CHECK_ROLES) access = AccessController.userHasRoles(user, constraints.roles)

    if (CHECK_FUNCTIONS) access = AccessController.callFunctions(user, constraints.functions)

    return access
  }

  /**
   * Checks if the user has any of the roles
   * @param  {User}     user  User object
   * @param  {string[]} roles Allowed roles
   * @return {Boolean}
   */
  static userHasRoles (user, roles) {
    return user.roles.some(userRole => roles.find(role => role === userRole))
  }

  /**
   * Check if all functions returns true
   * @param  {User}                 user      [description]
   * @param  {constraintFunction[]} functions [description]
   * @return {Boolean}
   */
  static callFunctions (user, functions) {
    for (const functionToCall of functions) {
      if (!functionToCall(user)) return false
    }

    return true
  }
}
