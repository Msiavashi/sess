'use strict'

var React = require('react-native');

var {
  View,
  ActivityIndicatorIOS,
  ProgressBarAndroid,
  Platform
} = React;

module.exports = React.createClass({

  spinner(){
    if (Platform.OS === 'android') {
      return (
        <ProgressBarAndroid
          style={{height: 20,}}
          styleAttr="Inverse"
          {...this.props}
        />
      );
    } else {
      return (
        <ActivityIndicatorIOS
          animating={true}
          size="small"
          {...this.props}
        />
      );
    }
  },

  render() {
    return (
      <View>
        {this.spinner()}
      </View>
    );
  },

});
