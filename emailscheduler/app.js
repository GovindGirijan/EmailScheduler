const sendgridmail = require("@sendgrid/mail");
const schedule = require('node-schedule');
const API_KEY = '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'
sendgridmail.setApiKey(API_KEY);




const express = require('express');
const bodyparser = require('body-parser');
const route = require('./Routes/routing');
const emailModel = require('./Model/emailSchema');

const app = express();
app.use(bodyparser.json());
app.use('/', route);

const port = process.env.PORT || 3004;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

runjobs = async () => {
    const schedulelist = await emailModel.find({}, { _id: 0, __v: 0 });
    schedulelist.map((sdemail) => { schedule.scheduleJob(sdemail.Date, () => {
        const message = {
            to: sdemail.to,
            from: sdemail.from,
            subject: sdemail.subject,
            text: sdemail.text
        }
        sendgridmail.send(message).then(response => console.log('Email sent')).catch(error => {
            emailModel.findOneAndUpdate(
                { subject: req.body.subject },
                { status : false}
              )
        }
          );
    })
        
    });
}

runjobs();