var React = require('react-native');
var styles = require('.././styles');
var Button = require('react-native-button');
var DOMParser = require('xmldom').DOMParser;
var selfPage = '';

var {
  Text,
  Image,
  View,
  ScrollView,
  Alert,
  Navigator,
} = React;

var setSelfPage = function(pageSource)
{
  let parser = new DOMParser();
  selfPage = parser.parseFromString(pageSource, "text/xml");

}

var ReserveMealView = React.createClass({

  _handlePress(){
    this.props.navigator.push({ id: "DayOfAWeek" });
  },
  render(){
    return (
       <View style = {styles.selfServiceContainer}
       automaticallyAdjustContentInsets={false}>
        <View style = {styles.selfServiceHeader}>
          <Text style = { styles.selfServiceHeaderTitle }> some information about his/her account </Text>
        </View>
        <ScrollView style = {styles.selfServiceFooter}
        automaticallyAdjustContentInsets={false}>
          <Button onPress={this._handlePress}>
            <View style = {styles.selfServiceWeekDays}>
                <Text style = {styles.selfServiceWeekDayName}>
                  Sunday
                </Text>
            </View>
          </Button>
          <Button onPress={this._handlePress}>
            <View style = {styles.selfServiceWeekDays}>
                <Text style = {styles.selfServiceWeekDayName}>
                  Monday
                </Text>
            </View>
          </Button>
          <Button onPress={this._handlePress}>
            <View style = {styles.selfServiceWeekDays}>
                <Text style = {styles.selfServiceWeekDayName}>
                  Tuesday
                </Text>
            </View>
          </Button>
          <Button onPress={this._handlePress}>
            <View style = {styles.selfServiceWeekDays}>
                <Text style = {styles.selfServiceWeekDayName}>
                  Wednesday
                </Text>
            </View>
          </Button>
          <Button onPress={this._handlePress}>
            <View style = {styles.selfServiceWeekDays}>
                <Text style = {styles.selfServiceWeekDayName}>
                  Thursday
                </Text>
            </View>
          </Button>
          <Button onPress={this._handlePress}>
            <View style = {styles.selfServiceWeekDays}>
                <Text style = {styles.selfServiceWeekDayName}>
                  Friday
                </Text>
            </View>
          </Button>
          <Button onPress={this._handlePress}>
            <View style = {styles.selfServiceWeekDays}>
                <Text style = {styles.selfServiceWeekDayName}>
                  Saturday
                </Text>
            </View>
          </Button>
        </ScrollView>
      </View>
    )
  }
});

exports.ReserveMealView = ReserveMealView;
exports.setSelfPage = setSelfPage;
