var React = require('react-native');
var selfService = require('./src/selfService');
var DayOfAWeek = require('./src/DayOfAWeek');
var DOMParser = require('xmldom').DOMParser;
var smsIcon = require('./icons/ic_sms_white_24dp.png');
var aboutUsIcon = require('./icons/ic_description_white_24dp.png');
var contactUsIcon = require('./icons/ic_contact_mail_white_24dp.png');
var logoutIcon = require('./icons/logout.png');
var {
  View,
  Text,
  TouchableHighlight,
} = React;
var styles = require('./styles');
var Button = require('react-native-button');
var ReserveMealView = require('./src/selfService');
var ResponsiveImage = require('react-native-responsive-image');
var controlPanelImage = require('./icons/cp.png');
module.exports = React.createClass({
  getInitialState(){
    return {
      edName: '',
      edUserType:''
    }
  },
  componentWillMount(){
    var parser = new DOMParser();
    var selfPage = parser.parseFromString(DayOfAWeek.pageSource, "text/xml");
    /*edName*/
    var header = selfPage.getElementById('Toolbar1_lblUserName').textContent.split(':');

    /*edUserType*/
    var userType = selfPage.getElementById('edUserType').textContent;

    this.setState({edName: header[1], edUserType: userType});
  },
  render() {
    return (
      <View style={styles.controlPanel}>
        <View style = {styles.controlPanelHeader}>
          {/*show the user information in the header position*/}
          <ResponsiveImage source = {controlPanelImage} initWidth = '340' initHeight = '340'/>
        </View>
        <View>
        <Text style = {{color: 'red', marginTop: 15, alignSelf: 'center', marginBottom: 5, fontWeight: 'bold', fontSize: 18}}> {this.state.edName} </Text>
        <Text style = {{color: 'black', marginBottom: 5, alignSelf: 'center', fontSize: 14}}> {this.state.edUserType} </Text>
        </View>
        <View style = {styles.controlPanelFooter}>
          { /* show the options here to the user */ }
          <View style = {{flexDirection: 'row', margin: 10}}>
            <Button style = {styles.controlPanelOption}> ارسال پیامک </Button>
            <ResponsiveImage style = {{marginTop:4, marginLeft: 10}} source = {smsIcon} initWidth = '20' initHeight = '20'/>
          </View>
          <View style = {{flexDirection: 'row', margin: 10}}>
            <Button style = {styles.controlPanelOption}> درباره ما </Button>
            <ResponsiveImage style = {{marginTop:4, marginLeft: 10}} source = {aboutUsIcon} initWidth = '20' initHeight = '20'/>
          </View>
          <View style = {{flexDirection: 'row', margin: 10}}>
            <Button style = {styles.controlPanelOption}> ارتباط با ما </Button>
            <ResponsiveImage style = {{marginTop:4, marginLeft: 10}} source = {contactUsIcon} initWidth = '20' initHeight = '20'/>
          </View>
          <View style = {{flexDirection: 'row', margin: 10}}>
            <Button onPress = {() => this.props.changeView()} style = {styles.controlPanelOption}> خروج </Button>
            <ResponsiveImage style = {{marginTop:4, marginLeft: 10}} source = {logoutIcon} initWidth = '25' initHeight = '25'/>
          </View>
        </View>
      </View>
    )
  },
})
