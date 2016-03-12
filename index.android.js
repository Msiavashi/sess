
 /**
 * https://github.com/facebook/react-native
 */
import DB from './src/database';
var Button = require('react-native-button');
var RoundedButton = require('apsl-react-native-button');
var React = require('react-native');
var ResponsiveImage = require('react-native-responsive-image');
var smsIcon = require('./icons/SMS-Message-icon.png');
var {
  Image,
  AppRegistry,
  Text,
  Linking,
  View,
  TextInput,
  Navigator,
  TouchableHighlight,
} = React;
import Spinner from 'react-native-loading-spinner-overlay';
var SMSPanelView = require('./src/sms');
var logoImage = require('./icons/vector_soup_food_logo.png');
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
  render(){
    return(
      <Navigator
          initialRoute={{id: 'IndexView', name: 'Index'}}
          renderScene={this.renderScene}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }} />
    );
  },
  renderScene(route, navigator){
    routeId = route.id;
    if ( routeId === 'IndexView' ){
      return(
        <IndexView navigator = {navigator} />
      );
    }
    else if (routeId === 'SMSPanelView')
    {
      return (
        <SMSPanelView navigator = {navigator} />
      );
    }
  },
});

var IndexView = React.createClass({
  getInitialState(){
    return {
      visible: false,
      viewOne: true,
      pageNumber: 0,
      /*checkbox status indicator*/
      checkedStatus: false
    }
  },
  componentWillMount(){
    /*if there was a account saved in database log in automatically*/
    DB.user.find().then(resp => {
      if (resp){
        username = resp[0].username;
        password = resp[0].password;
        this.login();
      }
      else{
        this.setState({checkedStatus: true});
      }
    });
  },
  login(){
      this.setState({visible: true});
      Login.login(username, password, this, this.state.checkedStatus);
  },

  changeView(){
      if (this.state.pageNumber === 0){
      this.setState({
        viewOne: !this.state.viewOne,
        visible: false
      });
    }
  },

  changeViewToSMSPanel(){
    this.props.navigator.push({id: 'SMSPanelView'})
  },
  render(){
    if(!this.state.viewOne) return <MainPage changeView = {this.changeView}/>
    return(
        <View style = {styles.loginViewContainer}>
          <View style = {styles.loginViewHeader}>
              <View style = {styles.logoView} >
                <Image style = {{ flex:1 }} source={logoImage}/>
              </View>
          </View>
          <View style = {styles.loginViewFooter}>
            <View style = {{flex:1, borderRadius: 20, backgroundColor:'rgba(80, 80, 80, 0.8)', marginBottom:30, marginLeft: 10, marginRight:10, padding: 30, justifyContent: 'center', alignItems: 'center'}}>
              <View style = {styles.userNameInput}>
                <TextInput
                  placeholderTextColor = {'white'}
                  ref = {"username"}
                  placeholder = {'نام کاربری'}
                  onChangeText = {(text) => username = text}
                  style = {{fontSize: 14, color: 'white'}}
                />
              </View>
              <View style = {styles.passwordInput}>
                <TextInput
                  placeholderTextColor = {'white'}
                  ref = {"password"}
                  placeholder = {'رمز عبور'}
                  onChangeText = {(text) => password = text}
                  style = {{fontSize:14, color: 'white'}}
                />
              </View>
            </View>
            <View style = {styles.ButtonsSection}>
              <View style = {styles.loginButtonView}>
                <RoundedButton style = {styles.loginButton} onPress={ () => this.login() }> <Text style = {styles.loginButtonText}> ورود</Text> </RoundedButton>
              </View>
              <View>
                <Button onPress = { () => this.changeViewToSMSPanel() }> <ResponsiveImage source={smsIcon} initWidth="64" initHeight="64"/> </Button>
              </View>
            </View>
          </View>
          <Spinner visible={this.state.visible} />
        </View>

    )
  },
});

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
          changeView = {this.props.changeView}
          />
      </Drawer>
    );
  }
});

AppRegistry.registerComponent('sess', () => sess);
