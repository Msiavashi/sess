var React = require('react-native');
var selfService = require('./src/selfService');
var {
  View,
  Text,
  TouchableHighlight,
} = React;
var styles = require('./styles');
var Button = require('react-native-button');
var ReserveMealView = require('./src/selfService');

//anything needed to be shown in the sidebar panel should be added in this dictionary
//TODO: should add the onPress events
controlPanelElements = ['reserver Meal'];


module.exports = React.createClass({
  render() {
    return (
      <View style={styles.controlPanel}>
        <View style = {styles.controlPanelHeader}>
          {/*show the user information in the header position*/}
        </View>
        <View style = {styles.controlPanelFooter}>
          { /* {this.display()}*/ }
          <Button> reserver Meal </Button>
        </View>
      </View>
    )
  },

  // display() { return controlPanelElements.map( (element) => <Button style={styles.button}> {element} </Button> )
  // }
})
