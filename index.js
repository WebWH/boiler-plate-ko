const express = require('express') // 설치한 express module 가져옴
const app = express() // 새 express app 생성
const port = 5000 // port

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./server/config/key');

app.use(bodyParser.urlencoded({extended: true})); // application/x-www-form-urlencoded 받을 수 있도록
app.use(bodyParser.json()); // application/json 받을 수 있도록
app.use(cookieParser());


mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connect Successfuly...'))
  .catch(err => console.log(err))


/***
 * Router
 * request에 /api/product 가 붙어 있으면 products.js으로 이동
 */
app.use('/api/users', require('./server/routers/users'));
app.use('/api/product', require('./server/routers/products'));


//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}


app.listen(port, () => { // 지정한 port에서 앱 실행
    console.log(`listening at http://localhost:${port}`)
    //console.log(`Running On ${process.env.NODE_ENV}`)
})