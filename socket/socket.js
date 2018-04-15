// let { User } = require('../model/user.js')
const uuidv1 = require('uuid/v1'),
    crypto = require('crypto'),
    type = require('../utils/type.js')
let answerList = [],
    resultList = []
let { Question, Subject, User } = require('../model/user.js')
/**
 * @author: kelly
 * @date: 2018.3.13 10:30
 * @path /':
 * @description: websocket处理函数
 */
let socket = function(socket, io) {
    console.log('a user connected');

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    socket.on('join_game', async function({ user = {}, subjectName = '' }) {

        let result = await RedisClient.multi()
            .select(0)
            .get(`roomList`)
            .execAsync();
        let roomList
        if (result[0] !== 'OK') {
            return socket.emit('error', PayloadException('NETWORK_EXCEPTION', '房间创建失败：redis服务器异常'))
        } else {
            roomList = result[1] === 'null' || result[1] === "undefined" ?
                null : result[1]
        }
        if (!roomList) {
            RedisClient.multi()
                .set(`roomList`, [user.name])
                .exec((err, result) => {
                    if (result[0] !== 'OK') {
                        return socket.emit('showError', PayloadException('NETWORK_EXCEPTION', '房间创建失败：redis服务器异常'))
                    }
                    socket.join(user.name)
                });
        } else {
            if (type(roomList) === 'string') {
                roomList = roomList.split(',')
            }
            if (roomList.length === 0) {
                socket.join(user.name)
            } else {
                let room = roomList[0],
                    index = 0;
                while (room === user.name && index < roomList.length) {
                    room = roomList[index]
                        ++index
                }
                if (room === user.name) {
                    return
                }
                let antagonist = await User.findOne({ username: room })

                Subject.findOne({ name: subjectName }, (err, obj) => {

                    Question.find(delEmptyProp({ subjectId: obj.id }), (err, questions) => {
                        // console.log(questions)
                        if (err) {
                            socket.emit('showError', PayloadException('BUSINESS_ERROR', '获取题库失败，原因：' + err))
                            return
                        }
                        let list = [],
                            count = 0;
                        for (let item of questions) {
                            let {
                                id,
                                paperId,
                                subjectId,
                                questionname,
                                option
                            } = item
                            list.push({
                                "ProblemId": id,
                                "ProblemOrder": ++count,
                                id,
                                paperId,
                                subjectId,
                                questionname,
                                option
                            })
                        }

                        socket.join(room)
                        io.to(room).emit('startGame', { problems: list, antagonist, room })
                        roomList.splice(roomList.indexOf(room), 1)

                        if (roomList.length === 0) {

                            RedisClient.multi()
                                .del(`roomList`)
                                .exec((err, result) => {

                                    if (err) {
                                        return socket.emit('showError', err)
                                    }
                                    if (result[0] !== 'OK') {
                                        return socket.emit('showError', PayloadException('NETWORK_EXCEPTION', '房间创建失败：redis服务器异常'))
                                    }
                                })
                        } else {
                            RedisClient.multi()
                                .set(`roomList`, roomList)
                                .exec((err, result) => {

                                    if (err) {
                                        return socket.emit('showError', err)
                                    }
                                    if (result[0] !== 'OK') {
                                        return socket.emit('showError', PayloadException('NETWORK_EXCEPTION', '房间创建失败：redis服务器异常'))
                                    }
                                })
                        }
                    })
                })
            }
        }
    });

    socket.on('submitAnswer', ({ room, username }) => {
        if (!answerList.find((u) => u === username)) {
            answerList.push(username)
        }
        if (answerList.length >= 2) {
            console.log(answerList)
            io.to(room).emit('nextQuestion')
            answerList = []
        }
    })

    socket.on('submitResult', ({ room, username, score }) => {
        let winner
        if (!resultList.find((r) => r.username === username)) {
            if (resultList.length === 1) {
                let old = resultList[0]

                if (old.score > score) {
                    winner = old.username
                } else if (old.score === score) {
                    winner = 'both'
                } else {
                    winner = username
                }
            }
            resultList.push({username,score})
        }
        if (resultList.length >= 2) {
            console.log(resultList)
            io.to(room).emit('showResult', {
                resultList,
                winner
            })
            resultList = []
        }
    })
};

module.exports = socket