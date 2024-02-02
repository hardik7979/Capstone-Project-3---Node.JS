import express from "express";
import bodyParser from "body-parser";

// Initiating the Express App and Port
const app = express();
const port = process.env.PORT || 3000;
let date = new Date();
let year = date.getFullYear();
let blogData =[];

// Setting the Public directory as the static content library 
app.use(express.static("public"));

// Configuring body-parser to view the body content of the request and response
app.use(bodyParser.urlencoded({ extended: true }));

// Setting the Default Get to render the Home Page
app.get("/",(req, res)=>{
    res.render("index.ejs", { year: year });
});

app.get("/blogs", (req, res)=>{
    res.render("blogs.ejs", {blogData : blogData, year: year});
});

app.get("/about", (req, res)=>{
    res.render("about.ejs", {year:year});
});

app.get("/contact", (req, res)=>{
    res.render("contact.ejs", {year:year});
});

app.post("/submit", (req, res)=>{
    let contentUpdate = 0;
    blogData.forEach((blogObj)=>{
        if(blogObj.title == req.body.title){
            let index = blogData.indexOf(blogObj);
            blogData[index].content = req.body.content;
            console.log("Content Updated!");
            contentUpdate = 1;
        }
    });
    if (contentUpdate == 0){
        blogData.push(req.body);
    }
    
    res.redirect("/");
});

app.post("/search", (req, res)=>{
    let dataFound = 0;
    blogData.forEach((blogObj)=>{
        if( blogObj.title == req.body.titleSelected )
        {
            dataFound = 1;
            res.render("index.ejs",{year:year, blogObj:blogObj});
        }
    });
    if (dataFound == 0)
    {
        res.redirect("/");
    }
});

// Listening on Port 3000
app.listen(port, (req, res)=>{
    console.log(`Listening on port ${port}`);
});
