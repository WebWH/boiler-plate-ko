const express = require('express') // 설치한 express module 가져옴
const app = express() // 새 express app 생성
const port = 5000 // port

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { auth } = require("./server/middleware/auth");
const { User } = require("./server/models/User");

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
 */
app.get('/', (req, res) => { // root 디렉터리 접근 시 response할 내용 // get method
    res.send('Hello World! MongoDB')
})


app.get('/api/hello', (req, res) => {
    res.send('Hi')
})


// register Router
app.post('/api/users/register', (req, res) => { // call back function
    // 회원 가입 시 필요정보 받아 INSERT
    // model 가져와야 함 const { User } = require("./models/User");

    const user = new User(req.body); // req.body -> json data // bodyParser 덕분에 json으로 볼수 있음

    // save 이전에 암호화 => User.js .pre

    user.save((err, userInfo) => { // mongoDB method(save == INSERT) // user.save(); => user model에 저장 // call back function으로 에러 처리
        if(err) return res.json({ success: false, err}); // json 형식으로 client에게 에러 알림
        return res.status(200).json({ // json 형식으로 client에게 성공 알림
            success: true
        })
    }); 

})
// end register Router


// login Router
app.post('/api/users/login', (req, res) => {
    // SELECT email(id) == req.email ?
    User.findOne({ email: req.body.email }, (err, userModel) => { // 쿼리 결과가 model에 담기고, userModel에 model(method 포함)이 담김
        if(!userModel) {
            return res.json({
                loginSuccess: false,
                message: "가입되지 않은 메일입니다."
            });
        }

        userModel.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({
                loginSuccess: false, 
                message: "비밀번호가 틀렸습니다."
            });

            userModel.genToken( (err, user) => {
                if(err) return res.status(400).send(err);

                // token 저장 : localstorage, cookie, session 중 하나에 저장
                res.cookie("x_auth", user.token).status(200).json({ 
                    loginSuccess: true, 
                    userId: user._id
                })
            })
        })
    })
});
// end login Router


// Auth Router
app.get('/api/users/auth', auth, (req, res) => { // auth : middleware, endpoint 가기 전 작업
    // 미들웨어를 통과하면 이곳으로 옴 == 인증 성공했다는 의미
    res.status(200).json({
        _id: req.userModel._id, // 미들웨어에서 가져온 req.userModel 활용
        isAdmin: req.userModel.role === 0 ? false : true,
        isAuth : true,
        email: req.userModel.email,
        name: req.userModel.name,
        lastname: req.userModel.lastname,
        lastname: req.userModel.role,
        image: req.userModel.image,
    })
});
// end Auth Router


// logout Router
app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.userModel._id }, { token: "" }, (err, userModel) => { // 미들웨어에서 가져온 req.userModel 활용
        if(err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        })
    }) 
});
// end logout Router


app.listen(port, () => { // 지정한 port에서 앱 실행
    console.log(`listening at http://localhost:${port}`)
    //console.log(`Running On ${process.env.NODE_ENV}`)
})