var React = require('react-native');

var {
  Text,
  View,
  Alert
} = React;

var displayMeals = React.createClass({
  render(){
    return (
       <View>
        Alert.alert("works fine");
      </View>
    )
  }
});

module.exports = displayMeals;
