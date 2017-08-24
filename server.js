var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user:'helloradhika',
    database:'helloradhika',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
var articles = {
'article-one' : { title : 'Article by Radhika',
    heading : 'Article One',
    date : 'Aug 15 2017',
    content :`<p>
            Article One - Content Writing. This is the first article content.
            Article One - Content Writing. This is the first article content
            Article One - Content Writing. This is the first article content
        </p>
         <p>
            Article One - Content Writing. This is the first article content.
            Article One - Content Writing. This is the first article content
            Article One - Content Writing. This is the first article content
        </p>
         <p>
            Article One - Content Writing. This is the first article content.
            Article One - Content Writing. This is the first article content
            Article One - Content Writing. This is the first article content
        </p>`},

'article-two' :  {title : 'Article by Radhika',
    heading : 'Article Two',
    date : 'Aug 18 2017',
    content : 
       ` <p>
            Article Two - Content Writing. This is the second article content.
           Article Two - Content Writing. This is the second article content.
           Article Two - Content Writing. This is the second article content.
        </p>
         <p>
           Article Two - Content Writing. This is the second article content.
           Article Two - Content Writing. This is the second article content.
           Article Two - Content Writing. This is the second article content.
        </p>
         <p>
         Article Two - Content Writing. This is the second article content.
        </p>`
},
'article-three' : {title : 'Article by Radhika',
    heading : 'Article Three',
    date : 'Aug 21 2017',
    content : 
       ` <p> Article Three - Content Writing. This is the third article content.
           Article Three - Content Writing. This is the third article content.
           Article Three - Content Writing. This is the third article content.
        </p>`}
};
function createTemplate(data)
{
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var author_id = data.author_id;
    var category = data.category;
var htmlTemplate = `
<html>
 <head>
     <title>
         ${title}
     </title>
     <meta name="viewport" content="width=device-width, initial-scale=1" />
     <link href="/ui/style.css" rel="stylesheet" />
 </head>   
<body>
    <div class="container">
        <a href="/"> Home</a>
    </div>
    <hr/>
    <h3>
       ${heading}
    </h3>
    <div>
    ${date}
    </div>
     <div>
    ${author_id}
    </div>
     <div>
    ${category}
    </div>
    <div>
       ${content}
    </div>
</body>
</html>`
 ;
 return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool=new Pool(config);
app.get('/test-db', function (req, res) {
  //make a select request
  //return a response results
  pool.query("SELECT * FROM test", function(err, result){
             if(err){
                 res.status(500).send(err.toString());
             }
      else
      {
            res.send(JSON.stringify(result.rows));
      }
});
});
var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
});
var names=[];
app.get('/submit-name', function(req,res){ // URL Submit-name/name:xxxx
    //get the names from the request
    var name=req.query.name;
    names.push(name);
    //JSON Javascript Object Notation
    res.send(JSON.stringify(names));
}
);

app.get('articles/:articleName', function (req, res) {
    //articleName=article-one
    //select * from article where title ='article-one'
    pool.query("SELECT * FROM article where title= '" + req.params.articleName + '"', function(err, result){
             if(err){
                 res.status(500).send(err.toString());
             }
      else
      {
            if(result.rows.length === 0) {
                res.status(404).send('Article Not Found');
            }
            else
            {
                var articleData = result.rows[0];
                 res.send(createTemplate(articleData));
            }
      }
});
  
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
