/* global describe, it */
import { expect } from 'chai'
import AccessController from '../access-controller.js'

describe('Access Controller', () => {
  it('Expects a user to have access by their roles', () => {
    const USER = {
      roles: ['user', 'manager']
    }
    const CONSTRAINTS = {
      roles: ['coordinator', 'manager']
    }

    expect(AccessController.hasAccess(USER, CONSTRAINTS)).to.be.equal(true)
  })

  it('Expects a user to have access by functions', () => {
    const USER = {
      id: 1,
      isLogged: () => true
    }
    const CONSTRAINTS = {
      functions: [
        user => user.id === 2,
        USER.isLogged
      ]
    }

    expect(AccessController.hasAccess(USER, CONSTRAINTS)).to.be.equal(true)
  })

  it('Expects a user to not have access by their roles', () => {
    const USER = {
      roles: ['user']
    }
    const CONSTRAINTS = {
      roles: ['coordinator', 'manager']
    }

    expect(AccessController.hasAccess(USER, CONSTRAINTS)).to.be.equal(false)
  })

  it('Expects a user to not have access by functions', () => {
    const USER = {
      roles: ['user'],
      id: 1,
      isLogged: () => true
    }
    const CONSTRAINTS = {
      roles: ['user', 'manager'],
      functions: [
        USER.isLogged,
        user => user.id === 2
      ]
    }

    expect(AccessController.hasAccess(USER, CONSTRAINTS)).to.be.equal(false)
  })
})
