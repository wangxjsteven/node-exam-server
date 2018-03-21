let mongoose = require("mongoose"),
    User,Question,Collection;
mongoose.connect('mongodb://localhost:27017/challenge', (err) => {
    // body...
    if (err) {
        console.log('mongodb 连接失败', err)
    } else {
        console.log('mongodb 连接成功')
    }
});
let Schema = mongoose.Schema;
//骨架模版
let userSchema = new Schema({
    username: String,
    password: String,
    id: String,
    phone: String,
    email: String
})

//变量名User should be the same as the first argument:'User'
User = mongoose.model('User', userSchema);

//question模版
let questionSchema = new Schema({
    questionname: String,
    success: Number,
    id: Number
})

//变量名User should be the same as the first argument:'User'
Question = mongoose.model('Question', questionSchema);

let collectionSchema=new Schema({
    success:Number,
    id:Number
})


Collection=mongoose.model('Collection',collectionSchema);
module.exports = {
    User: User,
    Question: Question,
    Collection:Collection
};

