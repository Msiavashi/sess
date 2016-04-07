var React = require('react-native');
var styles = require('./styles');
var Button = require('react-native-button');
var Login = require('./src/login');
var ReserveMealView = require('./src/selfService');
var Days = require('./src/days');
var SMSPanelView = require('./src/sms');
var {
  Navigator,
  Alert,
  View,
  ScrollView,
  Text,
  TextInput,
} = React;

var drawerTypes = ['overlay', 'displace', 'static'];

var MyMainView = React.createClass({
  setParentState(args){
    this.props.setParentState(args)
  },
  render(){
    return (
      <Navigator
          initialRoute={{id: 'ReserveMealView', name: 'Index'}}
          renderScene={this.renderScene}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }} />
    );
  },

  renderScene(route, navigator) {
      var routeId = route.id;
      if (routeId === 'ReserveMealView') {

          return (
            <ReserveMealView.ReserveMealView navigator = {navigator} changeView = {this.props.changeView}/>
          );
      }
      else if ( routeId === 'Days'){
        return (
          <Days navigator = {navigator} selectedSelfName = {route.selectedSelfName} selectedSelfCode = {route.selectedSelfCode}/>
        );
      }
      else if ( routeId === 'sms'){
        return(
          <SMSPanelView navigator = {navigator}/>
        )
      }
  },

});

module.exports = MyMainView;
