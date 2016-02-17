var React = require('react-native');
var styles = require('.././styles');
var Button = require('react-native-button');

var {
  Text,
  View,
  ScrollView,
  Alert,
  Navigator,
} = React;

var weekDays = ['شنبه', 'یک شنبه', 'دو شنبه','سه شنبه', 'چهار شنبه', 'پنج شنبه', 'جمعه'];


var DayOfAWeek = React.createClass({

  _handlePress(){
    this.props.navigator.pop();
  },
  showDays(){
    return weekDays.map((dayName) => <Day weekDay = {dayName} />)
  },
  render(){
    return(
    <View style = {styles.daysContainer}>

      {/*navbar*/}
      <View style={styles.daysHeader}>
        <Button onPress = {this._handlePress}>
          بازگشت
        </Button>
      </View>

      {/*content*/}
      <ScrollView style = {styles.daysFooter}>
        {this.showDays()}
      </ScrollView>

    </View>
  );
  }
});


/*renders one day of a week*/
var Day = React.createClass({
  render(){
    return(
      <View style = {styles.singleDayContainer}>
        {/*show the day name on top of each day content*/}
        <Text style = {styles.weekDayName}>{this.props.weekDay}</Text>
        <View>
          <View style = {styles.mealButton}>
            <Button>
                <Text style = {styles.mealText}> صبحانه </Text>
                {/*TODO: add a on/off button here for all the buttons below */}
            </Button>
          </View>
          <View style = {styles.mealButton}>
            <Button>
                <Text style = {styles.mealText}> ناهار </Text>
            </Button>
          </View>
          <View style = {styles.mealButton}>
            <Button>
                <Text style = {styles.mealText}> شام </Text>
            </Button>
          </View>
        </View>
      </View>

    );
  },


});

module.exports = DayOfAWeek;
