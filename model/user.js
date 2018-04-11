let mongoose = require("mongoose"),
    User, Question, Collection, Judge, Result, Subject, Course, Infinite;
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
    "username": String,
    "sex": String,
    "birthday": Date,
    "age": Number,
    "password": String,
    "email": String
})

//变量名User should be the same as the first argument:'User'
User = mongoose.model('User', userSchema);

//question模版
let questionSchema = new Schema({
    "paperId": Number,
    "subjectId": Number,
    "answer": String,
    "option": Array,
    "questionname": String,
    "id": Number
})
//变量名User should be the same as the first argument:'User'
Question = mongoose.model('Question', questionSchema);

let collectionSchema = new Schema({
    "id": Number,
    "subjectId": Number,
    "username":String,
    "problemAns": String,
    "problemNote": String
})
Collection = mongoose.model('Collection', collectionSchema);


let judgeSchema = new Schema({
    "correctAns": String,
    "result": String,
    "originAns": String,
    "id": Number
})
Judge = mongoose.model('Judge', judgeSchema);


let resultSchema = new Schema({
    "result": String,
    "id": Number
})
Result = mongoose.model('Result', resultSchema);


let subjectSchema = new Schema({
    "id": Number,
    "name": String
})
Subject = mongoose.model('Subject', subjectSchema);


let courseSchema = new Schema({
    "id": Number,
    "paper_year": String,
    "paper_title": String
})
Course = mongoose.model('Course', courseSchema);

let infiniteSchema = new Schema({
    "id": Number,
    "paperId": Number
})
Infinite = mongoose.model('Infinite', infiniteSchema);


module.exports = {
    User,
    Question,
    Collection,
    Judge,
    Result,
    Subject,
    Course,
    Infinite
};