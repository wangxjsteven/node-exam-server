// let { User } = require('../model/user.js')
const uuidv1 = require('uuid/v1'),
    crypto = require('crypto')
/**
 * @author: kelly
 * @date: 2018.3.13 10:30
 * @path /':
 * @description: websocket处理函数
 */
let socket = function(socket,io){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('join_game', function(user){
    console.log('user disconnected');
  });
};

module.exports = socket