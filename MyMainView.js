var React = require('react-native')

var {
  SwitchIOS,
  SliderIOS,
  PickerIOS,
  PickerItemIOS,
  View,
  ScrollView,
  Text,
} = React

var styles = require('./styles')
var Button = require('./Button')

var drawerTypes = ['overlay', 'displace', 'static']

module.exports = React.createClass({
  setParentState(args){
    this.props.setParentState(args)
  },

  render(){
    return (
      <View>
        <Text> anything about the main view goes here </Text>
      </View>
    )
  }
})
