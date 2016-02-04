var Store = require('react-native-store');

const DB = {
    'user': Store.model('user')  //holds username and hashed password
}

module.exports = DB;
