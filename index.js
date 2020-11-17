const express = require('express') // 설치한 express module 가져옴
const app = express() // 새 express app 생성
const port = 5000 // port

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { User } = require("./models/User");

const config = require('./config/key');

app.use(bodyParser.urlencoded({extended: true})); // application/x-www-form-urlencoded 받을 수 있도록
app.use(bodyParser.json()); // application/json 받을 수 있도록

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connect Successfuly...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => { // root 디렉터리 접근 시 response할 내용 // get method
  res.send('Hello World! MongoDB')
})

app.post('/register', (req, res) => { // call back function
  // 회원 가입 시 필요정보 받아 INSERT
  // model 가져와야 함 const { User } = require("./models/User");

  const user = new User(req.body); // req.body -> json data // bodyParser 덕분에 json으로 볼수 있음
  user.save((err, userInfo) => { // mongoDB method(save == INSERT) // user.save(); => user model에 저장 // call back function으로 에러 처리
    if(err) return res.json({ success: false, err}) // json 형식으로 client에게 에러 알림
    return res.status(200).json({ // json 형식으로 client에게 성공 알림
      success: true
    })
  }); 

})

app.listen(port, () => { // 지정한 port에서 앱 실행
  console.log(`listening at http://localhost:${port}`)
  console.log(`Running On ${process.env.NODE_ENV}`)
})