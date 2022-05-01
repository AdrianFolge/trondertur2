const express = require('express');
const app = express();
const { pool } = require("./dbConfig.js");
const bcrypt = require("bcryptjs");
const session = require('express-session');
const flash = require("express-flash");
const path = require('path')
const passport = require("passport");
const exphbs = require('express-handlebars');
const multer = require('multer');
const fileUpload = require('express-fileupload');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images");
    }, 
    filename: (req, file, cb) => {
       
        cb(null, file.originalname);
    },
});





const upload = multer({storage: storage});


const initializePassport = require("./passportConfig");
const { url } = require('inspector');
const { fstat } = require('fs');

initializePassport(passport); 
const host = '0.0.0.0';
const PORT = process.env.PORT || 3000;

//app.listen(PORT, host,function(){
//    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//  });


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false}));

app.use(session({
    secret: 'secret', 
    resave: false,
    saveUninitialized: false,

}));

app.use(passport.initialize());
app.use(passport.session());


app.use(flash());
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join('../app')));

app.get('/', (req, res)=> {
    res.render('index');
});

app.get('/users/register', checkAuthenticated, (req, res) =>{
    res.render("register");
});

app.get('/users/login', checkAuthenticated, (req, res) =>{
    res.render("login");
});



app.get('/users/index' ,checkNotAuthenticated, (req, res) =>{
    res.render("index", { user: req.user.name, user_email: req.user.email, user_image: "/images/"+req.user.images, coords: req.user.coords_images} )});

app.get("/users/logout", (req, res) => {
    req.logOut();
    req.flash("success_msg", "You have logged out");
    res.redirect("/users/login");
});





app.post('/users/register', upload.single("files") ,async (req, res) =>{
 
    let {name, email, password, password2} = req.body;
    let errors = [];
    console.log(req.body.files);
    let files = req.file.filename;
 
            
    if (!name || !email || !password || !password2){
        errors.push({message: "Please enter all fields"});

    }

    if(password.length < 6){
        errors.push({ message: "Password should be at least 6 characters"});
    }

    if(password != password2) {
        errors.push({message: "Passwords do not match"});
    }

    if (errors.length >0) {
        res.render("register", {errors});
    }else{
        // Form validation has passed

        await bcrypt.hash(password, 10);
        let hashedPassword = await bcrypt.hash(password, 10);
       
        
        
        pool.query(
            `SELECT * FROM users WHERE email = $1`, [email], (err, results) =>{
                if(err){
                    throw err;
                }

                console.log(results.rows);

                if(results.rows.length > 0) {
                    errors.push({message: "Email already registered"});
                    res.render('register', {errors});
                }else{
                    pool.query(
                        `INSERT INTO users (name,email,password, images, coords_images)
                        VALUES ($1, $2, $3, $4, $5)
                        RETURNING password`, [name, email, hashedPassword, files, '{"test","test"}' ], (err, results)=>{
                            if (err){
                                throw err;
                            }
                            console.log(results.rows);
                            req.flash(`success_msg`, "You are now registered. Please log in");
                            res.redirect("/users/index");
                        }
                    );
                }
            }
        );
    }
}); 


app.post("/users/login", passport.authenticate('local', {
    successRedirect: "/users/index",
    failureRedirect: "/users/login",
    failureFlash: true
}));

app.post('/users/index' ,checkNotAuthenticated, async(req, res) =>{
    console.log(req.body);
    res.render("index", { user: req.user.name, user_email: req.user.email, user_image: "/images/"+req.user.images, coords: req.user.coords_images}, 
    console.log(res),
    pool.query(
        `SELECT * FROM users WHERE email = $1`, [req.user.email], (err, results) =>{
            if(err){
                throw err;
            }

            
    if(req.query.q == undefined) {
        console.log("INGENTING");
    }

    
    else{
        let lengde = req.user.coords_images.length;
        console.log(req.user.user_coords)
        pool.query(
            `UPDATE users SET coords_images[$3]
            = $2 
            WHERE email=$1;`, [req.user.email,req.query.q, lengde+1],(err, results)=>{
                if (err){
                    throw err;
                }
               
                            //req.flash(`success_msg`, "You are now registered. Please log in");
                            //res.redirect("/users/index");
                            //req.query.tur_files, 
                        }
                    );

    
        pool.query(
            `UPDATE users SET coords_images[$3]
            = $2 
            WHERE email=$1;`, [req.user.email,req.query.tur_files, lengde+2],(err, results)=>{
                if (err){
                    throw err;
                }
                
                                        //req.flash(`success_msg`, "You are now registered. Please log in");
                                        //res.redirect("/users/index");
                                        //req.query.tur_files, 
                        }
                    );

       // pool.query(
       //     `Select genTrip from users 
       //     where name = 'admin';`,(err, results)=>{
       //         if (err){
       //             throw err;
       //         }
       //         console.log("skjer");
       //         console.log(results);

//            });
            
        

                    

    }
           

        }
    )
    );
    

    
});

function checkAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return res.redirect("/users/index");
    }
    next();
}

function checkNotAuthenticated(req, res, next){
    if( req.isAuthenticated()){
        return next();
    }
    res.redirect("/users/login");
}

app.get("/upload", (req,res) => {
    res.render("upload");
});

app.post("/upload", upload.single("files") ,(req,res) => {
    console.log(res.file.filename);
    
    res.send("Image Uploaded");
});



app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
});