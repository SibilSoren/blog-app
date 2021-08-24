const express = require("express");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

const homeText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const aboutText = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";
const contactUsText = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.";

const posts = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log(chalk.green.inverse("Server is running on port 3000"));
});

app.get("/", (req, res) => {
  res.render("index",{content:posts,description:homeText})
  console.log(posts);
});

app.get("/about",(req,res)=>{
  res.render("about",{content:aboutText})
})

app.get("/contactus",(req,res)=>{
  res.render("contact",{content:contactUsText})
})

app.get("/compose",(req,res)=>{
  res.render("compose");
})

app.post("/compose",(req,res)=>{
  const post = {
    title:req.body.postTitle,
    content:req.body.postContent,
  }

  posts.push(post);
  res.redirect("/")
})

app.get("/posts/:postName",(req,res)=>{
  let requestedTitle = req.params.postName;

  for(let i in posts){
    if(requestedTitle === posts[i].title){
      console.log("Match found!")
    }
  }

})
