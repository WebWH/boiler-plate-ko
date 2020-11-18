const { User } = require("../models/User");

let auth = (req, res, next) => {
    // 인증 처리

    // client cookie에서 토큰 가져옴
    let token = req.cookies.x_auth;

    // 토큰 디코딩
    User.findByToken(token, (err, userModel) => {
        if(err) throw err;
        if(!userModel) return res.json({ isAuth: false, error: true });

        req.token = token;
        req.userModel = userModel; // 미들웨어 다음 로직에서 사용할 수 있음
        next(); // 미들웨어 다음(get method로 request 받는 로직)으로 진행
    })

    // 유저 있으면 인증
}

module.exports = { auth };