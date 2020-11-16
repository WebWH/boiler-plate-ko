const express = require('express') // 설치한 express module 가져옴
const app = express() // 새 express app 생성
const port = 5000 // port

const mongoose = require('mongoose')
    mongoose.connect('mongodb+srv://mongoadmin:mongoadmin1!@bolierplate.pgfmu.mongodb.net/<dbname>?retryWrites=true&w=majority', {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
    }).then(() => console.log('MongoDB Connected...'))
      .catch(err => console.log(err))

app.get('/', (req, res) => { // root 디렉터리 접근 시 response할 내용
  res.send('Hello World! 몽고 하이ㅋ')
})

app.listen(port, () => { // 지정한 port에서 앱 실행
  console.log(`Example app listening at http://localhost:${port}`)
})