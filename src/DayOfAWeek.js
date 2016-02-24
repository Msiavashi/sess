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

var listOfFoods = [];
var weekDays = ['شنبه', 'یک شنبه', 'دو شنبه','سه شنبه', 'چهار شنبه', 'پنج شنبه', 'جمعه'];

function requestFoodList(weekDayName, selfName, mealIndex, selfPage){
  /*we can change the selfName to index along the way to be more like what sess does*/
  var request = new XMLHttpRequest();
  requestFoodList.requestMealIndex = ++requestFoodList.requestMealIndex || 0;
  /*getting the edDate and edMeal (.value not working after converting so a bit of extra work happend here )*/
  var mealElement = String(selfPage.getElementById("Meal" + requestFoodList.requestMealIndex));
  var value = mealElement.substring(mealElement.search("onclick"));
  value = value.substring(value.search("\'") + 1, value.lastIndexOf("\'")).split(':');
  var edDate = value[0];
  var edMeal = value[1];
  request.onreadystatechange = (e) => {
    if ( request.readyState !== 4 ){
      return;
    }
    if (request.status === 200 && requestFoodList.requestMealIndex < 20) {
      listOfFoods[requestFoodList.requestMealIndex] = request.responseText;
      requestFoodList("", "", 0, selfPage);
      return;
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

      /*foods to be shown in modal view*/
      food1: '',
      food2: '',
      food1Code: '',
      food2Code: '',
    };
  },
  /*parameters: 1- selected weekDay name 2-mealIndex is the number of meal 1, 2 ,3 each for breakfast,lunch, dinner*/
  openmodalView(weekDay, mealIndexInWeek, mealIndexInDay){
    var foods = listOfFoods[mealIndexInWeek].split('^');
    var food1Info = '';
    var food2Info =  '';
    var code1 = '';
    var code2 = '';
    try{
      food1Info = foods[1].split('!')[0].split("~")[0];
      code1 = foods[1].split("~")[1];
    }
    catch(err){   //this should never happen xD
      food1Info = '';
    }
    try{
      food2Info = foods[2].split("!")[0];
      code2 = foods[0];
    }
    catch(err){   // but this might happen sometimes xD
      food2Info = '';
      code1 = foods[0];   //for breakfasts the number should be for the food 1
    }

    var obj = {food1: food1Info, food2: food2Info, food2Code: code2, food1Code: code1};
    this.setState(obj);
    console.log(this.state.food2Code);
    console.log(this.state.food1Code);
    this.refs.modalView.open();
  },
  _handlePress(){
    this.props.navigator.pop();
  },
  showDays(modal){
    var counter = -3; //TODO: replace it with a better approach to be started from 0
    return weekDays.map((dayName) => <Day weekDay = {dayName} modalView = {modal} mealIndex = {counter += 3}  />)
  },
  render(){
    // getListOfFoodsForCurrentWeek(this.props.selfPage);
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
            <Button style = {{flex : 1}}>
              {/*TODO: set te name of the food in the fields */}
              <Text> {this.state.food1} </Text>
            </Button>
          </View>
          <View style = {{flex: 1, backgroundColor: 'lightGreen', justifyContent: 'center'}}>
            <Button style = {{flex : 1}}>
              {/*TODO: set te name of the food in the fields */}
              <Text> {this.state.food2} </Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
  }
});

DayOfAWeek.getListOfFoodsForCurrentWeek = function(selfPage){
  var totalNumberOfMealsPerWeek = 20;
  requestFoodList("", "", 0,selfPage);
}

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
            <Button onPress = {() => this.props.modalView(this.props.weekDay, this.props.mealIndex, 0)}>
                <Text style = {styles.mealText}> صبحانه </Text>
                {/*TODO: add a on/off button here for all the buttons below */}
            </Button>
          </View>
          <View style = {styles.mealButton}>
            <Button onPress = {() => this.props.modalView(this.props.weekDay, this.props.mealIndex + 1, 1)}>
                <Text style = {styles.mealText}> ناهار </Text>
            </Button>
          </View>
          <View style = {styles.mealButton}>
            <Button onPress = {() => this.props.modalView(this.props.weekDay, this.props.mealIndex + 2, 2)}>
                <Text style = {styles.mealText}> شام </Text>
            </Button>
          </View>
        </View>
      </View>
    );
  },
});

module.exports = DayOfAWeek;
// exports.getListOfFoodsForCurrentWeek = getListOfFoodsForCurrentWeek;
