import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});




const sendEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
    
  },
} ); 

export default sendEmail