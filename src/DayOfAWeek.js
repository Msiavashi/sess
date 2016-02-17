var React = require('react-native');
var styles = require('.././styles');
var Button = require('react-native-button');

var {
  Text,
  View,
  ScrollView,
  Alert,
  Navigator,
} = React;


var DayOfAWeek = React.createClass({

  _handlePress(){
    this.props.navigator.pop();
  },
  render(){
    return(
    <View style = {styles.daysContainer}>

      {/*navbar*/}
      <View style={styles.daysHeader}>
        <Button onPress = {this._handlePress}>
          back
        </Button>
      </View>

      {/*content*/}
      <View style = {styles.daysFooder}>

      </View>

    </View>
  );
  }

});

module.exports = DayOfAWeek;
