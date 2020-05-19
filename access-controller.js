/**
 * modnes Access Controller
 * @module '@modnes/access-controller'
 * @author Luiz Henrique Canet Filho <me@luizca.net>
 */

/**
 * AccessController
 */
export default class AccessController {
  static hasAccess (user, constraints) {
    const CHECK_ROLES = Array.isArray(constraints.roles)
    const CHECK_FUNCTIONS = Array.isArray(constraints.functions)
    let access = true

    if (CHECK_ROLES) access = AccessController.userHasRoles(user, constraints.roles)

    if (CHECK_FUNCTIONS) access = AccessController.callFunctions(user, constraints.functions)

    return access
  }

  static userHasRoles (user, roles) {
    return user.roles.some(userRole => roles.find(role => role === userRole))
  }

  static callFunctions (user, functions) {
    for (const functionToCall of functions) {
      if (!functionToCall(user)) return false
    }

    return true
  }
}
