var React = require('react-native');
var styles = require('.././styles');
var Button = require('react-native-button');
var DOMParser = require('xmldom').DOMParser;
var selfPage = '';

var {
  Text,
  View,
  ScrollView,
  Alert,
  Navigator,
} = React;

var selfServices = ['مهندسی نفت و گاز', 'مرکزی', 'ارم', 'خوابگاه شهید دستغیب', 'دانشکده هنر و معماری', 'دانشکده کشاورزی', 'بوفه ارم', 'بوفه مرکزی', 'بوفه خوابگاه مفتح', 'دانشکده دامپزشکی', 'خوابگاه دامپزشکی', 'دانشکده علوم'];

var setSelfPage = function(pageSource)
{
  let parser = new DOMParser();
  selfPage = parser.parseFromString(pageSource, "text/xml");
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
  showList(){
    return (
      selfServices.map((selfName) => <ViewNames name={selfName} navigator={this.props.navigator} />)
  );
  },
});

/*produce a single button for a single self service provided in the selfServices array*/
var ViewNames = React.createClass({
  _handlePress(){
    this.props.navigator.push({ id: "DayOfAWeek" });
  },
  render(){
    return(
    <Button onPress={this._handlePress}>
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
exports.setSelfPage = setSelfPage;
