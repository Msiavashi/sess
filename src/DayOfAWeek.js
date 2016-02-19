var React = require('react-native');
var styles = require('.././styles');
var Button = require('react-native-button');
var Modal = require('react-native-modalbox');
var {
  Text,
  View,
  ScrollView,
  Alert,
  Navigator,
} = React;

var weekDays = ['شنبه', 'یک شنبه', 'دو شنبه','سه شنبه', 'چهار شنبه', 'پنج شنبه', 'جمعه'];

function requestFoodList(weekDayName, selfName, mealIndex, selfPage){
  /*we can change the selfName to index along the way to be more like what sess does*/
  var request = new XMLHttpRequest();
  
  /*getting the edDate and edMeal (.value not working after converting so a bit of extra work happend here )*/
  var mealElement = String(selfPage.getElementById(mealIndex));
  var value = mealElement.substring(mealElement.search("onclick"));
  value = value.substring(value.search("\'") + 1, value.lastIndexOf("\'")).split(':');
  var edDate = value[0];
  var edMeal = value[1];

  request.onreadystatechange = (e) => {
    if ( request.readyState === 4 ){
      return;
    }
    if (request.status === 200) {
      console.log(request.responseText);
    }
    else {
      console.log('error' + ' ' + request.status);
    }
  };
  request.open('GET', "http://sups.shirazu.ac.ir/SfxWeb/Script/AjaxMember.aspx?Act=FoodDessert&ProgDate=" + edDate +  "&Restaurant=8&Meal=" + edMeal + "&Rand=0.9790692615049984", true);
  request.send();
}

var DayOfAWeek = React.createClass({
  getInitialState: function() { //they are used for Modal view
    return {
      /*modal variables*/
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
    };
  },
  /*parameters: 1- selected weekDay name 2-mealIndex is the number of meal 1, 2 ,3 each for breakfast,lunch, dinner*/
  openmodalView(weekDay, mealIndex){
    // Alert.alert(String(mealIndex));
    requestFoodList(weekDay, this.props.selectedSelfName, mealIndex, this.props.selfPage);
    this.refs.modalView.open();
  },
  _handlePress(){
    this.props.navigator.pop();
  },
  showDays(modal){
    // Alert.alert(String(this.props.selectedSelfName));
    var counter = -3; //TODO: replace it with a better approach to be started from 0
    return weekDays.map((dayName) => <Day weekDay = {dayName} modalView = {modal} mealIndex = {counter += 3}  />)
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
      <Modal style={[styles.modal, styles.mealModalView]} position={"center"} ref={"modalView"}>
        <View style = {{flex: 1}}>
          <View style = {{flex: 1, backgroundColor: 'pink', justifyContent: 'center'}}>
            <Button>
              {/*TODO: set te name of the food in the fields */}
              <Text> food name 1 </Text>
              <Text> radioButton </Text>
            </Button>
          </View>
          <View style = {{flex: 1, backgroundColor: 'lightGreen', justifyContent: 'center'}}>
            <Button style = {{flex : 1}}>
              {/*TODO: set te name of the food in the fields */}
              <Text> food name 2</Text>
              <Text> radioButton </Text>
            </Button>
          </View>
        </View>
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
            {/*fires up when a meal is selected*/}
            <Button onPress = {() => this.props.modalView(this.props.weekDay,"Meal" + this.props.mealIndex)}>
                <Text style = {styles.mealText}> صبحانه </Text>
                {/*TODO: add a on/off button here for all the buttons below */}
            </Button>
          </View>
          <View style = {styles.mealButton}>
            <Button onPress = {() => this.props.modalView(this.props.weekDay,"Meal" + (this.props.mealIndex + 1))}>
                <Text style = {styles.mealText}> ناهار </Text>
            </Button>
          </View>
          <View style = {styles.mealButton}>
            <Button onPress = {() => this.props.modalView(this.props.weekDay,"Meal" + (this.props.mealIndex + 2))}>
                <Text style = {styles.mealText}> شام </Text>
            </Button>
          </View>
        </View>
      </View>

    );
  },


});

module.exports = DayOfAWeek;
