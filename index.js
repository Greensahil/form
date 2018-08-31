const express=require('express');
const app=express();
const bodyParser=require('body-parser');
app.use(express.static(__dirname+ "/public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.get("/",function(req,res){
    res.render('index.ejs')
    

})
app.listen(process.env.PORT||3000, function(){
    console.log("The Server Has Started!");
 });