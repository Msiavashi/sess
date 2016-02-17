var React = require('react-native');
var styles = require('.././styles');
var Button = require('react-native-button');
var Modal   = require('react-native-modalbox');
var {
  Text,
  View,
  ScrollView,
  Alert,
  Navigator,
} = React;

var weekDays = ['شنبه', 'یک شنبه', 'دو شنبه','سه شنبه', 'چهار شنبه', 'پنج شنبه', 'جمعه'];


var DayOfAWeek = React.createClass({
  getInitialState: function() { //they are used for Modal view
    return {
      /*modal variables*/
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
    };
  },
  openmodalView(){
    this.refs.modalView.open();
  },
  _handlePress(){
    this.props.navigator.pop();
  },
  showDays(modal){
    return weekDays.map((dayName) => <Day weekDay = {dayName} modalView = {modal} />)
  },
  render(){
    return(
    <View style = {styles.daysContainer}>

      {/*navbar*/}
      <View style={styles.daysHeader}>
        <Button onPress = {this._handlePress} style = {{fontSize: 20, color: 'white', alignSelf: 'flex-end', marginRight: 5}}>
          بازگشت
        </Button>
      </View>

      {/*content*/}
      <ScrollView style = {styles.daysFooter}>
        {this.showDays(this.openmodalView)}
      </ScrollView>
      <Modal style={[styles.modal, styles.modalView]} position={"center"} ref={"modalView"}>
              <Text> hello world </Text>
      </Modal>
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
            <Button onPress = {this.props.modalView}>
                <Text style = {styles.mealText}> صبحانه </Text>
                {/*TODO: add a on/off button here for all the buttons below */}
            </Button>
          </View>
          <View style = {styles.mealButton}>
            <Button onPress = {this.props.modalView}>
                <Text style = {styles.mealText}> ناهار </Text>
            </Button>
          </View>
          <View style = {styles.mealButton}>
            <Button onPress = {this.props.modalView}>
                <Text style = {styles.mealText}> شام </Text>
            </Button>
          </View>
        </View>
      </View>

    );
  },


});

module.exports = DayOfAWeek;
