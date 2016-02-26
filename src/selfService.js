var React = require('react-native');
var styles = require('.././styles');
var Button = require('react-native-button');
var DOMParser = require('xmldom').DOMParser;
var DayOfAWeek = require('./DayOfAWeek');
var selfPage = '';
var {
  Text,
  View,
  ScrollView,
  Alert,
  Navigator,
} = React;

// var selfServices = ['مهندسی نفت و گاز', 'مرکزی', 'ارم', 'خوابگاه شهید دستغیب', 'دانشکده هنر و معماری', 'دانشکده کشاورزی', 'بوفه ارم', 'بوفه مرکزی', 'بوفه خوابگاه مفتح', 'دانشکده دامپزشکی', 'خوابگاه دامپزشکی', 'دانشکده علوم'];
var selfServices = [ {name: "ارم", code: "3" }, {name: "دانشکده هنر و معماری", code: "0"}, {name: "خوابگاه شهید دستغیب", code: "0"}, {name: "دانشکده علوم", code: "0"}, {name: "دانشکده مهندسی نفت و گاز", code: "7" }, {name : "مرکزی" , code: "8"}, {name: "دانشکده کشاورزی", code: "0"}, {name: "دانشکده دامپزشکی", code: "0"}, {name: "بوفه ارم", code: "0"}, {name: "بوفه مرکزی", code: "0"}, {name: "بوفه خوابگاه مفتح", code: "0"}, {name: "خوابگاه دامپزشکی", code: "0"} ];
var selfServicesCodes = [7, 8, 3, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]; //the index of each Code should be correspond to the selft Name Index in the selfServices array TODO: add the others COdes

var setSelfPage = function(pageSource){
  selfPage = pageSource;
}

var convertSelfSourceToXMLDom = function(pageSource){
  convertSelfSourceToXMLDom.counter = ++convertSelfSourceToXMLDom.counter || 0;
  if (convertSelfSourceToXMLDom.counter === 1){

      // console.log("in the if");
      var parser = new DOMParser();
      selfPage = parser.parseFromString(pageSource, "text/xml");   //converts the response Text to document
      // console.log(selfPage);

  }
}

var ReserveMealView = React.createClass({

  render(){
    return (
       <View style = {styles.selfServiceContainer}
       automaticallyAdjustContentInsets={false}>
        <View style = {styles.selfServiceHeader}>
          <Text style = { styles.selfServiceHeaderTitle }> لیست سلف ها </Text>
        </View>
        <ScrollView style = {styles.selfServiceFooter}
        automaticallyAdjustContentInsets={false}>
          {this.showList()}
        </ScrollView>
      </View>
    )
  },
  /*the function should load the next page <ViewNames> on second response from server thats why that counter is there*/
  showList(){
        convertSelfSourceToXMLDom(selfPage);
        return (
          selfServices.map((selfName) => <ViewNames name = {selfName.name} navigator = {this.props.navigator} pageSource = {selfPage} />)
      );
  },
});

ReserveMealView.openURL = function(url, indexPage){
  var request = new XMLHttpRequest();
  // ReserveMealView.countResponses = ++ReserveMealView.countResponses || 0; //if its was not defined first time;
  request.onreadystatechange = (e) => {
    if ( request.readyState !== 4 ){
      return;
    }
    if (request.status === 200 && request.responseText) {
      // console.log("got the response");
      // console.log(request.responseText);
      setSelfPage(request.responseText);
      indexPage.changeView();
    }
    else {
      console.log('error' + ' ' + request.status);
      // ++ReserveMealView.countResponses;
    }
  };
  request.open('GET', url, true);
  request.send();
}

/*produce a single button for a single self service provided in the selfServices array*/
var ViewNames = React.createClass({
  _handlePress(selectedValue){
    DayOfAWeek.getListOfFoodsForCurrentWeek(this.props.pageSource);
    var code = '';
    for (i = 0; i < selfServices.length; ++i){
      if (selfServices[i].name == selectedValue){
        code = selfServices[i].code;
        break;
      }
    }
    this.props.navigator.push({ id: "DayOfAWeek", selectedSelfName: selectedValue, selectedSelfCode: code, selfPage: this.props.pageSource });
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
