var React = require('react-native')
var Button = require('./Button.js')
var {
  View,
  Text
} = React

var styles = require('./styles')
var Button = require('react-native-button')
var selfService = require('./src/selfService')

//anything needed to be shown in the sidebar panel should be added in this dictionary
//TODO: should add the onPress events
controlPanelElements = ['hello', 'World'];


module.exports = React.createClass({
  render() {
    return (
      <View style={styles.controlPanel}>
        {this.display()}
      </View>
    )
  },
  display() { return controlPanelElements.map( (element) => <Button style={styles.button}> {element} </Button> )
  }
})
