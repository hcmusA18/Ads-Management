import OTP from "../models/otpModel.js";
import emailService from "./emailService.js";

export const storeOTP = async (email, otp) => {
    try {
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 2);
        await OTP.create({email, otp, expirationTime});
    } catch (error) {
        throw new Error(`Error storing OTP: ${error.message}`);
    }
}

export const getOTP = async (email) => {
    try {
        const otp = await OTP.findOne({email}).sort({expirationTime: -1});
        if (otp.expirationTime < new Date()) {
            return null;
        }
        return otp;
    } catch (error) {
        throw new Error(`Error getting OTP: ${error.message}`);
    }
}

export const sendOTP = async (email, otp) => {
    try {
        await emailService.sendOTP(email, otp);
    } catch (error) {
        throw new Error(`Error sending OTP: ${error.message}`);
    }
}
