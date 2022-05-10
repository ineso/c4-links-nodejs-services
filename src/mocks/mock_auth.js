// Copyright Carrefour(2021)
//

const _ = require('lodash')
const crypto = require('crypto')

const secret = 'Carrefour123'
const cookieName = 'SESSIONID'

function signData (data) {
  return crypto.createHmac('sha256', secret).update(data).digest('base64').trim()
}

/** 
 * Class representing a MockAuth.
 */
module.exports = class MockAuth {

  constructor(config) {
    this.config = config
  }

  login (res, redirectURL) {
    const data = JSON.stringify(this.config)
    res.cookie(cookieName, signData(data), {
      path: '/',
      maxAge: 86400000,
      httpOnly: true,
      sameSite: true,
      signed: false
    })
    res.status(301).redirect(redirectURL)
  }

  logout (res, redirectURL) {
    res.clearCookie(cookieName)
    res.status(301).redirect(redirectURL)
  }

  auth () {
    return (req, res, next) => {
      req.oidc = this.config
      next()
    }
  }

  checkAuth () {
    return (req, res, next) => {
      const data = JSON.stringify(this.config)
      let session = _.get(req.cookies, cookieName)
      if (!session || session !== signData(data)) {
        res.status(401).send('Failed to authenticate, please login first')
        return
      }
      next()
    }
  }

  configure (app) {
    app.use(this.auth())
    if (this.config.routes) {
      let login = _.get(this.config, 'routes.login')
      let logout = _.get(this.config, 'routes.logout')
      let callback = _.get(this.config, 'routes.callback') || '/'
      let postLogoutRedirect = _.get(this.config, 'routes.postLogoutRedirect') || '/'

      if (login) {
        app.get(login,
          (req, res) => this.login(res, callback)
        )
      }
      if (logout) {
        app.get(logout,
          (req, res) => this.logout(res, "/post-logout")
        )
      }
      app.get('/post-logout',
        (req, res) => res.status(301).redirect(postLogoutRedirect)
      )
    }
  }
}
