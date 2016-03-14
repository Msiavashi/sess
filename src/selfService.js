var React = require('react-native');
var styles = require('.././styles');
var Button = require('react-native-button');
var DOMParser = require('xmldom').DOMParser;
var DayOfAWeek = require('./DayOfAWeek');
var selfPage = '';
var SelfServiceHeader = require('./SelfServiceHeader');
var ResponsiveImage = require('react-native-responsive-image');
var controlPanelImage = require('.././icons/cp.png');
var smsIcon = require('.././icons/ic_sms_white_24dp.png');
var aboutUsIcon = require('.././icons/ic_description_white_24dp.png');
var contactUsIcon = require('.././icons/ic_contact_mail_white_24dp.png');
var logoutIcon = require('.././icons/logout.png');

var {
  Modal,
  Text,
  View,
  ScrollView,
  Alert,
  DrawerLayoutAndroid,
  Navigator,
} = React;
var selfServices = [ {name: "ارم", code: "3" }, {name: "دانشکده هنر و معماری", code: "0"}, {name: "خوابگاه شهید دستغیب", code: "0"}, {name: "دانشکده علوم", code: "0"}, {name: "دانشکده مهندسی نفت و گاز", code: "7" }, {name : "مرکزی" , code: "8"}, {name: "دانشکده کشاورزی", code: "0"}, {name: "دانشکده دامپزشکی", code: "0"}, {name: "بوفه ارم", code: "0"}, {name: "بوفه مرکزی", code: "0"}, {name: "بوفه خوابگاه مفتح", code: "0"}, {name: "خوابگاه دامپزشکی", code: "0"} ];

var setSelfPage = function(pageSource){
  selfPage = pageSource;
}

var convertSelfSourceToXMLDom = function(pageSource){
  convertSelfSourceToXMLDom.counter = ++convertSelfSourceToXMLDom.counter || 0;
  if (convertSelfSourceToXMLDom.counter === 1){
      var parser = new DOMParser();
      selfPage = parser.parseFromString(pageSource, "text/xml");   //converts the response Text to document
  }
}
var ReserveMealView = React.createClass({
  getInitialState(){
    return{
      username: '',
      desc: '',
      gotoSMS: false
    }
  },
  componentDidMount(){
    var parser = new DOMParser();
    var selfPage = parser.parseFromString(DayOfAWeek.pageSource, "text/xml");
    /*edName*/
    var header = selfPage.getElementById('Toolbar1_lblUserName').textContent.split(':');

    /*edUserType*/
    var userType = selfPage.getElementById('edUserType').textContent;
    this.setState({username: header[1], desc:userType});
  },
  aboutPressHandler(){
    var title = "درباره";
    var messege = "نسخه :  BETA" + '\n' + "امین روستا" + "\n" + "محمد سیاوشی";
    Alert.alert(title, messege, [{text: "بستن"}]);
  },
  smsPressHandler(){
    this.props.navigator.push({id: 'sms'});
  },
  render(){
    var controlPanel = (
      <View style={styles.controlPanel}>
        <View style = {styles.controlPanelHeader}>
          {/*show the user information in the header position*/}
          <ResponsiveImage source = {controlPanelImage} initWidth = '340' initHeight = '340'/>
        </View>
        <View>
        <Text style = {{color: 'red', marginTop: 15, alignSelf: 'center', marginBottom: 5, fontWeight: 'bold', fontSize: 18}}> {this.state.username} </Text>
        <Text style = {{color: 'black', marginBottom: 5, alignSelf: 'center', fontSize: 14}}> {this.state.desc} </Text>
        </View>
        <View style = {styles.controlPanelFooter}>
          { /* show the options here to the user */ }
          <View style = {{flexDirection: 'row', margin: 10}}>
            <Button style = {styles.controlPanelOption} onPress = {() => this.smsPressHandler()}> ارسال پیامک </Button>
            <ResponsiveImage style = {{marginTop:4, marginLeft: 10}} source = {smsIcon} initWidth = '20' initHeight = '20'/>
          </View>
          <View style = {{flexDirection: 'row', margin: 10}}>
            <Button style = {styles.controlPanelOption} onPress = {() => this.aboutPressHandler()}> درباره ما </Button>
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
    );
    if (this.state.gotoSMS) return <SMSPanelView navigator = {this.props.navigator} />
    else{
      return (
        <DrawerLayoutAndroid
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => controlPanel}>
         <View style = {styles.selfServiceContainer}>
          <SelfServiceHeader selfPage = {selfPage} shouldParseSelfPage = {true}/>
          <ScrollView style = {styles.selfServiceFooter}
          automaticallyAdjustContentInsets={false}>
            {this.showList()}
          </ScrollView>
        </View>
        </DrawerLayoutAndroid>
      );

    }
      },
  /*the function should load the next page <ViewNames> on second response from server thats why that counter is there*/
  showList(){
        convertSelfSourceToXMLDom(selfPage);
        DayOfAWeek.pageSource = selfPage;
        return (
          selfServices.map((selfName) => <ViewNames name = {selfName.name} navigator = {this.props.navigator} pageSource = {selfPage} />)
      );
  },
});

ReserveMealView.changeWeek = function(moveTo){
  var request = new XMLHttpRequest();
  request.onreadystatechange = (e) => {
    if ( request.readyState !== 4 ){
      return;
    }
    if (request.status === 200) {
      this.openURL("http://sups.shirazu.ac.ir/SfxWeb/Sfx/SfxChipWeek.aspx", null);
    }
    else {
      console.log('error' + ' ' + request.status);
    }
  };
  if (moveTo === "next"){
    request.open('GET', "http://sups.shirazu.ac.ir/SfxWeb/Script/AjaxMember.aspx?Act=SfxNextWeek&Rand=0.6350482569541782", true);
    request.send();
  }
  else if (moveTo === "previous"){
    request.open('GET', "http://sups.shirazu.ac.ir/SfxWeb/Script/AjaxMember.aspx?Act=SfxPrevWeek&Rand=0.3835966335609555", true);
    request.send();
  }
}

ReserveMealView.openURL = function(url, indexPage){
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if ( request.readyState !== 4 ){
        return;
      }
      if (request.status === 200 && request.responseText) {
        setSelfPage(request.responseText);
        if (indexPage !== null){
          indexPage.changeView();
        }
        else if (request.status !== 200){
          reject(request.responseText);
        }
        //update the content of app
        else{
          var parser = new DOMParser();
          selfPage = parser.parseFromString(selfPage, "text/xml");   //converts the response Text to document
          DayOfAWeek.pageSource = selfPage;
          DayOfAWeek.requestFoodList(0);
          resolve(selfPage);
        }
      }
    };
    request.open('GET', url, true);
    request.send();
  });

}

/*produce a single button for a single self service provided in the selfServices array*/
var ViewNames = React.createClass({
  _handlePress(selectedValue){
    DayOfAWeek.pageSource = this.props.pageSource;
    var code = '';
    for (i = 0; i < selfServices.length; ++i){
      if (selfServices[i].name == selectedValue){
        code = selfServices[i].code;
        break;
      }
    }
    this.props.navigator.push({ id: "DayOfAWeek", selectedSelfName: selectedValue, selectedSelfCode: code, selfPage: this.props.pageSource});
  },
  render(){
    return(
    <Button onPress={() => this._handlePress(this.props.name)}>
      <View style = {styles.selfServiceWeekDays}>
          <Text style = {styles.selfServiceWeekDayName}>
            {this.props.name}
          </Text>
      </View>
    </Button>
  );
  },
});

exports.ReserveMealView = ReserveMealView;
