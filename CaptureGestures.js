var React = require('react-native')
var {NativeModules, StyleSheet, PanResponder, View} = React
var deviceScreen = NativeModules.UIManager.Dimensions.window

module.exports = React.createClass({

  componentWillMount: function() {
    this._panGesture = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
    });
  },
  var style = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: this.props.width || deviceScreen.width,
    height: deviceScreen.height,
    backgroundColor: 'transparent'
  },
  render () {

    return (
      <View style={this.style} {...this._panGesture.panHandlers} />
    );
  }
});
