
 /**
 * https://github.com/facebook/react-native
 */
var Button = require('react-native-button');
var React = require('react-native');
var ResponsiveImage = require('react-native-responsive-image');
var GiftedSpinner = require('react-native-gifted-spinner');
var {
  AppRegistry,
  Text,
  Linking,
  View,
  TextInput,
  TouchableHighlight,
} = React;

var logoURL = 'http://shirazu.ac.ir/sites/default/files/logo-bluehq.png';
var username = null;
var password = null;

var styles = require('./styles');
var drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 0,
  }
}

var Drawer = require('react-native-drawer');
var MyMainView = require('./MyMainView');
var MyControlPanel = require('./ControlPanel');
var deviceScreen = require('Dimensions').get('window');
var tweens = require('./tweens');
var Login = require('./src/login');
var ActionButton = require('./src/ActionButton');

var sess = React.createClass({

  getInitialState(){
    return {
      viewOne: true,

    }
  },
  changeView(){
    Login.login(username, password);

    //TODO: put a loading here/**********/

    this.setState({
      viewOne: !this.state.viewOne
    });
  },

  render(){
    if(!this.state.viewOne) return <MainPage changeView={ () => this.changeView() } />
    return(
      <View style = {styles.loginViewContainer}>
      {/*<ActionButton/> */}
        <View style = {styles.loginViewHeader}>
             <ResponsiveImage source={{uri: logoURL}} initWidth="150" initHeight="150"/>
        </View>
        <View style = {styles.loginViewFooter}>
            <View style = {styles.loginViewInputsView}>
            <TextInput
              placeholderTextColor = {'white'}
              ref = {"username"}
              placeholder = {'نام کاربری'}
              onChangeText = {(text) => username = text}
            />

            <TextInput
              placeholderTextColor = {'white'}
              ref = {"password"}
              placeholder = {'رمز عبور'}
              onChangeText = {(text) => password = text}
            />

            </View>

            <View style = {styles.ButtonsSection}>
              <View style = {styles.loginButtonView}><Button style = {styles.loginButton} onPress={ () => this.changeView() }> <Text style = {styles.loginButtonText}> ورود</Text>  </Button></View>

              <View style = {styles.smsButtonView}><Button style = {styles.smsButton}> <Text style = {styles.smsButtonText}>پیامک</Text> </Button></View>
            </View>
        </View>
      </View>
    )
  },
});


var counter = 0
var MainPage = React.createClass({
  getInitialState(){
    return {
      drawerType: 'overlay',
      openDrawerOffset:100,
      closedDrawerOffset:0,
      panOpenMask: .1,
      panCloseMask: .9,
      relativeDrag: false,
      panStartCompensation: true,
      openDrawerThreshold: .25,
      tweenHandlerOn: false,
      tweenDuration: 350,
      tweenEasing: 'linear',
      disabled: false,
      tweenHandlerPreset: null,
      acceptDoubleTap: true,
      acceptTap: false,
      acceptPan: true,
      rightSide: false,
    }
  },

  setDrawerType(type){
    this.setState({
      drawerType: type
    })
  },

  tweenHandler(ratio){
    if(!this.state.tweenHandlerPreset){ return {} }
    return tweens[this.state.tweenHandlerPreset](ratio)
  },

  noopChange(){
    this.setState({
      changeVal: Math.random()
    })
  },

  openDrawer(){
    this.refs.drawer.open()
  },

  setStateFrag(frag){
    this.setState(frag)
  },

  render() {
    var controlPanel = <MyControlPanel closeDrawer={() => {this.refs.drawer.close()}} />
    return (
      <Drawer
        ref="drawer"
        type={this.state.drawerType}
        animation={this.state.animation}
        openDrawerOffset={this.state.openDrawerOffset}
        closedDrawerOffset={this.state.closedDrawerOffset}
        panOpenMask={this.state.panOpenMask}
        panCloseMask={this.state.panCloseMask}
        relativeDrag={this.state.relativeDrag}
        panStartCompensation={this.state.panStartCompensation}
        openDrawerThreshold={this.state.openDrawerThreshold}
        content={controlPanel}
        styles={drawerStyles}
        disabled={this.state.disabled}
        tweenHandler={this.tweenHandler}
        tweenDuration={this.state.tweenDuration}
        tweenEasing={this.state.tweenEasing}
        acceptDoubleTap={this.state.acceptDoubleTap}
        acceptTap={this.state.acceptTap}
        acceptPan={this.state.acceptPan}
        changeVal={this.state.changeVal}
        negotiatePan={false}
        side={this.state.rightSide ? 'right' : 'left'}
        >
        <MyMainView
          drawerType={this.state.drawerType}
          setParentState={this.setStateFrag}
          openDrawer={this.openDrawer}
          openDrawerOffset={this.state.openDrawerOffset}
          closedDrawerOffset={this.state.closedDrawerOffset}
          panOpenMask={this.state.panOpenMask}
          panCloseMask={this.state.panCloseMask}
          relativeDrag= {this.state.relativeDrag}
          panStartCompensation= {this.state.panStartCompensation}
          tweenHandlerOn={this.state.tweenHandlerOn}
          disabled={this.state.disabled}
          openDrawerThreshold={this.state.openDrawerThreshold}
          tweenEasing={this.state.tweenEasing}
          tweenHandlerPreset={this.state.tweenHandlerPreset}
          animation={this.state.animation}
          noopChange={this.noopChange}
          acceptTap={this.state.acceptTap}
          acceptDoubleTap={this.state.acceptDoubleTap}
          acceptPan={this.state.acceptPan}
          rightSide={this.state.rightSide}
          />
      </Drawer>
    );
  }
});

AppRegistry.registerComponent('sess', () => sess);
