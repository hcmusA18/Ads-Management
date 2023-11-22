import passport from 'passport'

const redirectUrl = (officer, res) => {
  const redirectMap = {
    admin: '/so',
    1: '/quan',
    2: '/phuong',
  }
  const positionKey = officer.username === 'admin' ? 'admin' : officer.position;
  return res.redirect(redirectMap[positionKey] || '/');
}

const authController = (strategy) => (req, res, next) => {
  passport.authenticate(strategy, (err, officer, info) => {
    if (err) {
      return next(err);
    }

    if (!officer) {
      return res.redirect('/');
    }

    req.login(officer, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      return redirectUrl(officer, res);
    });
  })(req, res, next);
}

export const loginController = authController('local');
export const ggLoginController = authController('google');
