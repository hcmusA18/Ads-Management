import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    })
  }

  sendNewPassword(userEmail, newPassword) {
    const mailOptions = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: 'Mật khẩu cho tài khoản mới',
      text: `Chào bạn,\n\nMật khẩu của bạn đã khởi tạo thành công. Mật khẩu mới của bạn là: ${newPassword}. Vui lòng sử dụng mật khẩu này để đăng nhập vào hệ thống.\n\nTrân trọng,\nCivic Ads`,
      html: `<p>Chào bạn,</p><p>Mật khẩu của bạn đã được khởi tạo thành công. Mật khẩu mới của bạn là: <strong>${newPassword}</strong>. Vui lòng sử dụng mật khẩu này để đăng nhập vào hệ thống.</p><p>Trân trọng,<br>Civic Ads</p>`
    }

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  }

  sendOTP(userEmail, otp) {
    const mailOptions = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: 'Mã OTP để thay đổi mật khẩu',
      text: `Chào bạn,\n\nMã OTP của bạn là: ${otp}. Vui lòng sử dụng mã OTP này để thay đổi mật khẩu.\n\nTrân trọng,\nCivic Ads`,
      html: `<p>Chào bạn,</p><p>Mã OTP của bạn là: <strong>${otp}</strong>. Vui lòng sử dụng mã OTP này để thay đổi mật khẩu.</p><p>Trân trọng,<br>Civic Ads</p>`
    }

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  }
}

export default new EmailService();
