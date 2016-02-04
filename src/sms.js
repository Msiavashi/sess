var React = require('react-native');
var styles = require('.././styles');
var Button = require('react-native-button');
var SmsAndroid = require('react-native-sms-android');
var {
  Text,
  View,
  ScrollView,
  Alert,
  Navigator,
} = React;


SmsAndroid.sms(
  '123456789', // phone number to send sms to
  'This is the sms text', // sms body
  'sendDirect', // sendDirect or sendIndirect
  (err, message) => {
    if (err){
      console.log("error");
    } else {
      console.log(message); // callback message
    }
  }
);
