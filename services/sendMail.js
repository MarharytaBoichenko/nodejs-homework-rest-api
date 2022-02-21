const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (data) => {
  try {
    // создаем письмо
    const mail = { ...data, from: "boichenkomv@gmail.com" };
    // отправляем письмо
    await sgMail.send(mail);
    return true;
  } catch (error) {
    throw error;
  }
};
module.exports = sendMail;
