var React = require('react-native');
var styles = require('.././styles');
var Button = require('react-native-button');
var DOMParser = require('xmldom').DOMParser;
var DayOfAWeek = require('./DayOfAWeek');
var selfPage = '';
var SelfServiceHeader = require('./SelfServiceHeader');
var ResponsiveImage = require('react-native-responsive-image');
var logoutIcon = 'http://www.iconarchive.com/show/100-flat-2-icons-by-graphicloads/switch-turn-off-icon.html';
var {
  Text,
  View,
  ScrollView,
  Alert,
  Navigator,
} = React;

// var selfServices = ['مهندسی نفت و گاز', 'مرکزی', 'ارم', 'خوابگاه شهید دستغیب', 'دانشکده هنر و معماری', 'دانشکده کشاورزی', 'بوفه ارم', 'بوفه مرکزی', 'بوفه خوابگاه مفتح', 'دانشکده دامپزشکی', 'خوابگاه دامپزشکی', 'دانشکده علوم'];
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
  render(){
    return (
       <View style = {styles.selfServiceContainer}>
          <SelfServiceHeader selfPage = {selfPage} shouldParseSelfPage = {true}/>
        <View style = {styles.underHeader}>
          <View style = {styles.backButton}>
            <Button style = {{color: "white", fontSize: 22}} onPress = {() => this.props.changeView()}>
                خروج
            </Button>
          </View>
        </View>
        <ScrollView style = {styles.selfServiceFooter}
        automaticallyAdjustContentInsets={false}>
          {this.showList()}

          {/*making gaps*/}
          <View style = {{backgroundColor: '#EDEDED'}}>
          <Text>    </Text>
          <Text>    </Text>
          </View>
          {/*making gap*/}

        </ScrollView>

      </View>
    )
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
  })

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
