import passport from 'passport'

export const loginController = (req, res, next) => {
  passport.authenticate('local', (err, officer, info) => {
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
      if (officer.username == 'admin') {
        return res.redirect('/so');
      }
      if (officer.position == 1) {
        return res.redirect('/quan');
      }
      if (officer.position == 2) {
        return res.redirect('/phuong');
      }
        return res.redirect('/');
    });
  })(req, res, next);
};


export const ggLoginController = (req, res, next) => {
    passport.authenticate('google', (err, officer, info) => {
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
        if (officer.username == 'admin') {
          return res.redirect('/so');
        }
        if (officer.position == 1) {
          return res.redirect('/quan');
        }
        if (officer.position == 2) {
          return res.redirect('/phuong');
        }
          return res.redirect('/');
      });
    })(req, res, next);
  };

