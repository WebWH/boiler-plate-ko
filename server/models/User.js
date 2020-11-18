const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // blowfish 대칭키 알고리즘 사용
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // delete space
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: { // 유효기간
        type: Number
    }
})

// MongoDB save method 전처리(pw encrypt)
userSchema.pre('save', function(next) {
    var user = this; // userSchema

    if (user.isModified('password')) {
        // pw encrypt
        bcrypt.genSalt(saltRounds, function(err, salt) {
            console.log(`create salt : ${salt}`);
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if (err) return next(err);
                user.password = hash;
                next(); // save() method 호출로 넘어감
            });
        });
    } else {
        next();
    }
})


userSchema.methods.comparePassword = function(plainPassword, cb) { // callback
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => { // 1,2번째 인자를 비교한 뒤, 결과를 callback으로 받음
        if(err) return cb(err, isMatch);
        cb(null, isMatch);
    })
}


userSchema.methods.genToken = function(cb) {
    var userModel = this;
    var token = jwt.sign(userModel._id.toHexString(), 'secretToken'); // secretToken: _id
    userModel.token = token;
    userModel.save( (err, userModel) => {
        if(err) return cb(err, null);
        cb(null, userModel);
    })
}


userSchema.statics.findByToken = function(token, cb) {
    var userModel = this;

    jwt.verify(token, 'secretToken', (err, decoded) => {
        userModel.findOne({"_id": decoded, "token": token }, (err, userModel) => {
            if(err) return cb(err);
            cb(null, userModel);
        })
    })
}


const User = mongoose.model('User', userSchema) // schema를 model로 감싸줌(model, schema)

module.exports = { User } // 외부에서 이 schema 접근 허용