import passport from 'passport'
import * as officerService from '../services/officerService.js';
import * as otpService from '../services/otpService.js';
import { hashPassword, comparePassword } from '../services/passwordService.js';

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

      if (officer.position === 0) {
        req.flash('error', 'Tài khoản của bạn chưa được cấp quyền');
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

function generateOTP() {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

export const forgotPassController = async (req, res) => {
  const { username } = req.body;
  let officer = null;
  if (username.includes('@')) {
    officer = await officerService.getOfficerByEmail(username);
  } else {
    officer = await officerService.getOfficerByUsername(username);
  }
  if (!officer) {
    req.flash('error', 'Tên đăng nhập hoặc email không đúng');
    return res.status(400).json({ message: 'Tên đăng nhập hoặc email không đúng' });
  }
  const email = officer.email;
  const otp = generateOTP();
  try {
    await otpService.storeOTP(email, otp);
    await otpService.sendOTP(email, otp);
    req.flash('success', 'Mã OTP đã được gửi đến email của bạn');
    // stay on the same page
    return res.status(200).json({ message: 'Mã OTP đã được gửi đến email của bạn' });
  } catch (error) {
    req.flash('error', error.message);
    // return the error message
    return res.status(500).json({ message: error.message });
  }
}

export const verifyOTPController = async (req, res) => {
  const { username, otp } = req.body;
  let officer = null;
  if (username.includes('@')) {
    officer = await officerService.getOfficerByEmail(username);
  } else {
    officer = await officerService.getOfficerByUsername(username);
  }
  if (!officer) {
    req.flash('error', 'Tên đăng nhập hoặc email không đúng');
    return res.status(400).json({ message: 'Tên đăng nhập hoặc email không đúng' });
  }
  const email = officer.email;
  try {
    const otpRecord = await otpService.getOTP(email);
    if (!otpRecord) {
      req.flash('error', 'Mã OTP đã hết hạn');
      return res.status(400).json({ message: 'Mã OTP đã hết hạn' });
    }
    if (otpRecord.otp !== otp) {
      req.flash('error', 'Mã OTP không đúng');
      console.log('Mã OTP không đúng');
      return res.status(400).json({ message: 'Mã OTP không đúng' });
    }
    // await otpService.deleteOTP(email);
    req.flash('success', 'Mã OTP hợp lệ');
    return res.status(200).json({ message: 'Mã OTP hợp lệ' });
  } catch (error) {
    req.flash('error', error.message);
    return res.status(500).json({ message: error.message });
  }
}

export const resetPasswordController = async (req, res) => {
  let { username, password } = req.body;
  let officer = null;
  if (username.includes('@')) {
    officer = await officerService.getOfficerByEmail(username);
  } else {
    officer = await officerService.getOfficerByUsername(username);
  }
  password = await hashPassword(password);
  if (!officer) {
    req.flash('error', 'Tên đăng nhập hoặc email không đúng');
    return res.status(400).json({ message: 'Tên đăng nhập hoặc email không đúng' });
  }
  try {
    const message = await officerService.updatePasswordByUsername(officer.username, password);
    req.flash('success', message);
    return res.status(200).json({ message: 'Cập nhật mật khẩu thành công' });
  } catch (error) {
    req.flash('error', error.message);
    return res.status(500).json({ message: error.message });
  }
}

export const changePasswordController = async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;
  const officer = await officerService.getOfficerByUsername(username);
  if (!officer) {
    req.flash('error', 'Tên đăng nhập không đúng');
    return res.status(400).json({ message: 'Tên đăng nhập không đúng' });
  }
  const isMatch = await comparePassword(oldPassword, officer.password);
  if (!isMatch) {
    req.flash('error', 'Mật khẩu cũ không đúng');
    return res.status(400).json({ message: 'Mật khẩu cũ không đúng' });
  }
  const password = await hashPassword(newPassword);
  try {
    const message = await officerService.updatePasswordByUsername(officer.username, password);
    // req.flash('success', message);
    return res.status(200).json({ message: 'Cập nhật mật khẩu thành công' });
  } catch (error) {
    // req.flash('error', error.message);
    return res.status(500).json({ message: error.message });
  }
}


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
