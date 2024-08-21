let nodemailer = require("nodemailer");
/* MAIL WITH HTML BODY ATTACHMENT IMPORTS STARTS */
const fs = require("fs");
const handlebars = require("handlebars");
const {promisify} = require("util");
const readFile = promisify(fs.readFile);
/* MAIL WITH HTML BODY ATTACHMENT IMPORTS ENDS */

// CREATING NODEMAILER-TRANSPORTER TO SEND E-MAIL
let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT ? process.env.SMTP_PORT : '10'),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
  });

  exports.sendEmailToApprover = async(giftID,giftAmount,requestorEmail,approverEmail) => {
    try {
       const htmlFilePath = "./public/views/send-email-to-approver-template.html"; 
       const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: approverEmail,
        subject: `GIFT SUBMISSION APPROVAL NEEDED`,
    };
    /* ------------------------------ MAIL WITH HTML BODY STARTS --------------------------------- */
    /* readFile function accepts first argument as file path and second argument as options */
    let html = await readFile(htmlFilePath,'utf8');
    /* Below line compiles hmtl file gets from above path */
    let template = handlebars.compile(html);
    /* template let's allow to pass dynamic data to write inside html file */
    const HTML_TO_SEND = template(
        {
            approver: approverEmail.split("@")?.[0]?.toLowerCase(),
            requestorEmail: requestorEmail,
            requestor: requestorEmail.split("@")?.[0]?.toLowerCase(),
            giftID: `#GH-${giftID}`,
            giftAmount: giftAmount

        });
    /* ------------------------------ MAIL WITH HTML BODY ENDS --------------------------------- */
    mailOptions.html = HTML_TO_SEND;
    await transporter.sendMail(mailOptions);
    console.log(`EMAIL TRIGGERED TO THE USER FOR APPROVAL`,approverEmail);
    } catch (error) {
        throw new Error(error.message || error);
    }
  }