const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const nodemailer=require('nodemailer')
const flash   = require('connect-flash');
const fileUpload = require('express-fileupload');
const session = require('express-session');

//Nodemailer keys are stored in here
const keys=require('./config/keys');

app.use(express.static(__dirname+ "/public"));
app.set('view engine','ejs');


app.use(bodyParser.urlencoded({
    limit: '5mb',
    parameterLimit: 100000,
    extended: false
}));

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(session({ cookie: { maxAge: 60000 }, 
    secret: 'sahil',
    resave: false, 
    saveUninitialized: false}));
app.use(flash());
app.get("/",function(req,res){
    res.render('index.ejs')
    

})

//Nodemailer setup

app.post("/send",function(req,res){
    
})
// app.post('/upload', fileUpload(), function(req, res) {  
//   const sampleFile = req.files.uploadedFile;
//   // do something with file
//   res.send('File uploaded');
// })
app.post('/setup', function(req, res, next) {
    // console.log('setup: data', req.body.newpdf);
    // console.log('setup: check', req.body.check);
    // console.log('setup avatar: ', req.body.avatar);
    // console.log(req.body)
    var encodedpdf=(req.body.payload)
    // console.log(encodedpdf)
    
    // console.log(typeof req.body)
    // console.log(typeof encodedpdf);
    // console.log(req.body)
    // const content = Buffer.from(encodedpdf, 'base64');
    // console.log(content);
    // console.log(typeof encodedpdf)

    
    // var decodedFile = new Buffer(, 'base64');
    // var decodedFile = new Buffer(req.body, 'base64');
    
    res.json({
    success:true
    });


    const output=`
    <p>You have a new contact request</p>
    <h3>Contact detalis</h3>
    <ul>
    <li>Name:${req.body.name}</li>
    <li>Email:${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `
    let transporter = nodemailer.createTransport({
        host: 'smtp.mailgun.org',
        port: 2525,
        secure: false, // true for 465, false for other ports
        auth: {
            user: keys.user, // generated ethereal user
            pass: keys.pass // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer contact" <foo@example.com>', // sender address
        to: 'greenncoder@gmail.com', // list of receivers
        subject: 'Node contact request', // Subject line
        text: 'Hello world?', // plain text body
        html: output, // html body
        attachments: [{
            filename: 'transportpdf.pdf',
            content: encodedpdf,
            encoding: 'base64'
          }]

    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
    // req.flash("success","Message has been sent")

    // res.render('index',{success:req.flash("success")})
    
    

});
var encodedpdf
app.get('/apple',function(req,res){
    const output=`
    <p>You have a new contact request</p>
    <h3>Contact detalis</h3>
    <ul>
    <li>Name:${req.body.name}</li>
    <li>Email:${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `
    let transporter = nodemailer.createTransport({
        host: 'smtp.mailgun.org',
        port: 2525,
        secure: false, // true for 465, false for other ports
        auth: {
            user: keys.user, // generated ethereal user
            pass: keys.pass // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer contact" <foo@example.com>', // sender address
        to: 'greenncoder@gmail.com', // list of receivers
        subject: 'Node contact request', // Subject line
        text: 'Hello world?', // plain text body
        html: output, // html body
        attachments: [{
            filename: 'transportpdf.pdf',
            content: encodedpdf,
            encoding: 'base64'
          }]

    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
    // req.flash("success","Message has been sent")

    // res.render('index',{success:req.flash("success")})
    
    
})
app.listen(process.env.PORT||3000, function(){
    console.log("The Server Has Started!");
 });