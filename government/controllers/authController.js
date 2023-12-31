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
  passport.authenticate(strategy, { failureRedirect: '/' }, (err, officer, info) => {
      if (err) {
        return next(err);
      }

      if (!officer) {
        req.flash('error', info.message)
        return res.redirect('/');
      }

      if (req.body.rememberPass) {
        res.cookie('username', req.body.username, {
          maxAge: 60 * 60 * 1000,
          httpOnly: false,
          signed: true,
        });
        res.cookie('password', req.body.password, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
          signed: true,
        });
      }

      req.login(officer, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }
        if (req.query.reqUrl) {
          return res.redirect(req.query.reqUrl);
        }
        return redirectUrl(officer, res);
      });
    })(req, res, next);
};


export const ggLoginController = (req, res, next) => {
    passport.authenticate('google', { failureRedirect: '/' }, (err, officer, info) => {
      if (err) {
        return next(err);
      }

      if (!officer) {
        req.flash('error', info.message)
        return res.redirect('/');
      }

      req.login(officer, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }
        if (officer.username === 'admin') {
          return res.redirect('/so');
        }
        if (officer.position === 1) {
          return res.redirect('/quan');
        }
        if (officer.position === 2) {
          return res.redirect('/phuong');
        }
          return res.redirect('/');
      });
    })(req, res, next);
  };

export const loginController = authController('local');
