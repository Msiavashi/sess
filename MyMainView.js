var React = require('react-native')
var styles = require('./styles')
var Button = require('react-native-button')
var Login = require('./src/login');

var {
  Alert,
  View,
  ScrollView,
  Text,
} = React;




var drawerTypes = ['overlay', 'displace', 'static']

module.exports = React.createClass({
  setParentState(args){
    this.props.setParentState(args)
  },

  render(){
    return (
      <View>
        <Button OnPress={Login.login()}> press Me </Button>
      </View>
    )
  }
})
