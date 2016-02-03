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
    <View>

      {/*navbar*/}
      <View>
        <Button onPress = {this._handlePress}>
          back
        </Button>
      </View>

      {/*content*/}
      <View>
        <Text> hello world </Text>
      </View>

    </View>
  );
  }

});

module.exports = DayOfAWeek;
