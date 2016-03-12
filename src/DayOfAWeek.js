var React = require('react-native');
var styles = require('.././styles');
var Button = require('react-native-button');
var Modal = require('react-native-modalbox');
import Spinner from 'react-native-loading-spinner-overlay';
var ResponsiveImage = require('react-native-responsive-image');
var SelfServiceHeader = require('./SelfServiceHeader');
var DOMParser = require('xmldom').DOMParser;
var reservedIcon = require('.././icons/ic_done_all_black_24dp.png');
var notReservedIcon = require('.././icons/ic_remove_circle_outline_black_24dp.png');
var notPlannedIcon = require('.././icons/ic_clear_black_24dp.png');
var previousWeekIcon = require('.././icons/ic_chevron_left_white_24dp.png');
var nextWeekIcon = require('.././icons/ic_chevron_right_white_24dp.png');
var backButtonIcon = require('.././icons/ic_arrow_forward_white_24dp.png');
var {
  Text,
  View,
  ScrollView,
  Alert,
  Navigator,
} = React;
var selfService = require('./selfService');
var listOfFoods = [];
var weekDays = ['شنبـه', 'یک شنبـه', 'دو شنبـه','سه شنبـه', 'چهار شنبـه', 'پنج شنبـه', 'جمعه'];
var dates = [];
function updateFoodList(edMeal, mealIndexInWeek, edDate){
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    updateFoodList.mealIndexInWeek = mealIndexInWeek;
    request.onreadystatechange = (e) => {
      if ( request.readyState !== 4 ){
        return;
      }
      else if (request.status === 200) {
        resolve(selfService.ReserveMealView.openURL("http://sups.shirazu.ac.ir/SfxWeb/Sfx/SfxChipWeek.aspx", null));
      }
      else if (request.status === 404){
        reject(request.responseText);
      }
    };
    request.open('GET', "http://sups.shirazu.ac.ir/SfxWeb/Script/AjaxMember.aspx?Act=FoodDessert&ProgDate=" + edDate +  "&Restaurant=8&Meal=" + edMeal + "&Rand=0.9790692615049984", true);
    request.send();
  })
}

function submitReservation(selfCode, foodCode, edDate, edMeal, mealIndexInWeek){
  DayOfAWeek.loading();
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    submitReservation.mealIndexInWeek = mealIndexInWeek;
    submitReservation.edDate = edDate;
    submitReservation.edMeal = edMeal;
    request.onreadystatechange = (e) => {
      if ( request.readyState !== 4 ){
        return;
      }
      if (request.status === 200) {
        if (request.responseText.indexOf("مبلغ اعتبار شما کافی نیست") !== -1){
          Alert.alert("خطا", "مبلغ اعتبار شما کافی نیست");
          reject(request.responseText);
          DayOfAWeek.loading();
        }
        else{
          resolve(updateFoodList(submitReservation.edMeal, submitReservation.mealIndexInWeek, submitReservation.edDate));
        }
      }
      else if (request.status === 404){
        reject(request.responseText);
      }
    };
    request.open('GET', "http://sups.shirazu.ac.ir/SfxWeb/Script/AjaxMember.aspx?Act=BuyChipsWeek&Restaurant=" + selfCode + "&ProgDate=" + edDate + "&Meal=" + edMeal + "&Food=" + foodCode + "&Dessert=&Rand=0.47429", true);
    request.send();

  })
}

function deleteMeal(date, code, mealIndexInDay, mealIndexInWeek){
  DayOfAWeek.loading();
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    deleteMeal.mealIndexInWeek = mealIndexInWeek;
    deleteMeal.mealIndexInDay = mealIndexInDay;
    deleteMeal.date = date;
    request.onreadystatechange = (e) => {
      if ( request.readyState !== 4 ){
        return;
      }
      if (request.status === 200) {
          resolve(updateFoodList(deleteMeal.mealIndexInDay, deleteMeal.mealIndexInWeek, deleteMeal.date));
      }
      else if (request.status === 404){
        reject(request.responseText);
      }
    };
    request.open('GET', 'http://sups.shirazu.ac.ir/SfxWeb/Script/AjaxMember.aspx?Act=DeleteMeal&IdentChip=1%3A' + code + '%3A' + date + '%3A' + mealIndexInDay +'%3A1&Rand=0.7137566171586514', true);
    request.send();
  })

}
var DayOfAWeek = React.createClass({
  statics:{
    fromDateToDate : '',
    loading: null
  },
  getInitialState(){ //they are used for Modal view
    return {
      /*modal variables*/
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      selectedDay: '',
      selectedMealName: '',

      /*foods to be shown in modal view*/
      food1: '',
      food2: '',
      food1Code: '',
      food2Code: '',
      selectedFoodCode: '',
      selectedMealIndexInWeek: '',

      /*loading*/
      visible: false,
      food1TextColor: 'white',
      food2TextColor: 'white',

      fromDateToDate: ''
    };
  },
  onModalClosed(){
    /*reset the variables*/
    this.setState({food1TextColor: 'white', food2TextColor: 'white', food1Code: '', food2Code: '', selectedFoodCode: '', selectedMealIndexInWeek: ''})
  },
  loading(){
      this.setState({visible: !this.state.visible});
  },
  componentDidMount(){
    DayOfAWeek.loading = this.loading;
    DayOfAWeek.loading();
    /**getting list of foods**/
    DayOfAWeek.requestFoodList(0);
  },
  getDates(){
    var element = String(DayOfAWeek.pageSource.getElementById('edDesc'));
    element = element.substring(element.indexOf('>') + 1, element.lastIndexOf('</')).split(' ');
    var start = element[6]
    var end = element[10]
    DayOfAWeek.fromDateToDate = start + ' - ' + end;
    for (let i = 0; i < 7; ++i){
      let date = String(DayOfAWeek.pageSource.getElementById("edDay" + i));
      let tmp = date.substring(date.indexOf('<td') + 1, date.lastIndexOf('</td>'));
      tmp = tmp.split(" ");
      dates[i] = tmp[tmp.length - 1];
    }
  },
  componentWillMount(){
    this.getDates();
  },
  shouldComponentUpdate(nextProps, nextState){
    this.getDates();
    return true;
  },

  setHeaderValues(source){
    var credit = String(source.getElementById('edCredit'));
    credit = credit.substring(credit.indexOf('>') + 1, credit.lastIndexOf('</'));
    SelfServiceHeader.credit = credit;
  },

  /*parameters: 1- selected weekDay name 2-mealIndex is the number of meal 1, 2 ,3 each for breakfast,lunch, dinner*/
  openmodalView(weekDay, mealIndexInWeek, mealIndexInDay, mealName){
    var foods = listOfFoods[mealIndexInWeek].food;
    this.setState({selectedDay: weekDay, selectedMealName: mealName});
    if (foods.indexOf("ErrorMessage") > -1){    //it contains an error mean that the Meal is already reserved
      value = DayOfAWeek.pageSource.getElementById("Meal" + mealIndexInWeek).getAttribute('value');
      console.log(value);
      if (value !== "برنامه ریزی نشده"){
          value = value + "(حذف)";
      }
      this.setState({food1: value, food2: '', selectedMealIndexInWeek: mealIndexInWeek});
    }
    else{   //the Meal is not Reserved Yet
      foods = listOfFoods[mealIndexInWeek].food.split('^');
      var food1Info = '';
      var food2Info =  '';
      var code1 = '';
      var code2 = '';
      try{
        food1Info = foods[1].split('!')[0].split("~")[0];
        code1 = foods[0];
      }
      catch(err){   //this should never happen xD
        food1Info = '';
      }
      try{
        food2Info = foods[2].split("!")[0];
        code2 = foods[1].split("~")[1];
      }
      catch(err){   // but this might happen sometimes xD
        food2Info = '';
        code1 = foods[0];   //for breakfasts the number should be for the food 1
      }
      var obj = {food1: food1Info, food2: food2Info, food2Code: code2, food1Code: code1, selectedMealIndexInWeek: mealIndexInWeek};
      this.setState(obj);
    }
    this.refs.modalView.open();
  },
  submitButton(){
    //finding the edDate
    var value = DayOfAWeek.pageSource.getElementById("Meal" + this.state.selectedMealIndexInWeek).getAttribute('onclick');

    if (value.indexOf("DeleteMeal") > -1){    //if the food is already reserved
      value = value.substring(value.search("\'") + 1, value.lastIndexOf("\'")).split(':');
      var date = value[2];
      var code = value[1];
      var mealIndex = value[3];
      deleteMeal(date, code, mealIndex, this.state.selectedMealIndexInWeek)
        .then(response => this.setHeaderValues(response))
        .then(() => this.refs.modalView.close())
        .catch(resp => console.error(resp));
    }
    else{     //if the food is not reserved
      value = value.substring(value.search("\'") + 1, value.lastIndexOf("\'")).split(':');
      var edDate = value[0];
      var edMeal = value[1];
      //sending the request
      submitReservation(this.props.selectedSelfCode, this.state.selectedFoodCode, edDate, edMeal, this.state.selectedMealIndexInWeek)
        .then(response => this.setHeaderValues(response))
        .then(() => this.refs.modalView.close())
        .catch(resp => console.error(resp));
    }
  },
  _handlePress(){
    this.props.navigator.pop();
  },
  showDays(modal){
    var counter = -3; //TODO: replace it with a better approach to be started from 0
    return weekDays.map((dayName) => <Day weekDay = {dayName} date = {dates[weekDays.indexOf(dayName)]} modalView = {modal} mealIndex = {counter += 3}  />)
  },
  nextWeek(){
    DayOfAWeek.loading();
    selfService.ReserveMealView.changeWeek("next");
  },
  previousWeek(){
    DayOfAWeek.loading();
    selfService.ReserveMealView.changeWeek("previous");
  },
  foodSelectionHandler(foodCode){
    this.setState({selectedFoodCode: foodCode});
    if (this.state.food1Code == foodCode){
      this.setState({food1TextColor: "pink", food2TextColor: "white"});
    }
    else if (foodCode == this.state.food2Code){
      this.setState({food1TextColor: "white", food2TextColor: "pink"});
    }
  },
  render(){
    /*****this.nextweek, this._handleOnPres, this.previousWeek*****/
    // getListOfFoodsForCurrentWeek(this.props.selfPage);
    return(
    <View style = {styles.daysContainer}>

      {/*navbar*/}
      <View styles = {{flex:1}}>
        <SelfServiceHeader selfPage = {this.props.selfPage} shouldParseSelfPage = {false} parentState = {this.setState}/>
        <View style = {{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <View>
            <Button style = {styles.creditText} onPress = {this.previousWeek}><ResponsiveImage source={previousWeekIcon} initWidth="60" initHeight="60"/></Button>
          </View>
          <View style = {{flex:1, marginTop:10, marginBottom: 10, alignItems: 'center', justifyContent:'center'}}>
            <Text style = {{flex:1, fontSize: 16, color: 'white'}}>{DayOfAWeek.fromDateToDate}</Text>
            <Text style = {{flex:1, fontSize: 22, fontWeight: "bold", color: 'white'}}>{this.props.selectedSelfName}</Text>
          </View>
          <View >
            <Button style = {styles.creditText} onPress = {this.nextWeek}><ResponsiveImage source={nextWeekIcon} initWidth="60" initHeight="60"/></Button>
          </View>
        </View>
        <View style = {[styles.selfServiceHeader, {flexDirection:'column', alignItems: 'flex-end', backgroundColor: '#7777'}]}>
            <Button style = { [styles.selfServiceHeaderTitle, {color: 'white'}] } onPress = {this._handlePress}>
              <ResponsiveImage source ={backButtonIcon} initWidth = '40' initHeight = '40' />
            </Button>
        </View>
      </View>

      {/*content*/}
      <ScrollView style = {styles.daysFooter}>
        {this.showDays(this.openmodalView)}
        {/*make gaps*/}
        <Text>   </Text>
        <Text>   </Text>
      </ScrollView>
      <Spinner visible = {this.state.visible}/>
      <Modal style={[styles.modal, styles.mealModalView, { backgroundColor: '#D6D6D6' }]} position={"center"} ref={"modalView"} onClosed = {() => this.onModalClosed()}>
        <View style = {{flex: 1, marginLeft: 10, marginRight: 10}}>
          <View style = {{marginTop: 10}}>
            <Text style = {{fontSize: 22, fontWeight: 'bold', padding: 10 , color: 'black'}}>{this.state.selectedDay} - {this.state.selectedMealName}</Text>
          </View>
          <View style = {{flex: 1, backgroundColor: '#009ECE', justifyContent: 'center'}}>
            <Button onPress = {() => this.foodSelectionHandler(this.state.food1Code)}>
              {/*TODO: set te name of the food in the fields */}
              <Text style = {{color: this.state.food1TextColor, fontSize: 18}}> {this.state.food1} </Text>
            </Button>
          </View>
          <View style = {{flex: 1, backgroundColor: '#FF9E00', justifyContent: 'center'}}>
            <Button onPress = {() => this.foodSelectionHandler(this.state.food2Code)}>
              {/*TODO: set te name of the food in the fields */}
              <Text style = {{color: this.state.food2TextColor, fontSize: 18}}> {this.state.food2} </Text>
            </Button>
          </View>
          <View style = {{flex:1, flexDirection: 'row', alignItems: 'stretch'}}>
            <View style = {{flex:1}}>
              <Button style = {{flex:1, paddingTop:10, paddingBottom: 10, fontSize: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 10, color: 'white', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF0000'}} onPress = {() => this.refs.modalView.close()}>
                  انصراف
              </Button>
            </View>
            <View style = {{flex:1}}>
              <Button style = {{flex:1, paddingTop:10, paddingBottom: 10, fontSize: 20, fontWeight: 'bold', marginTop: 10, marginBottom: 10, color: 'white', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0099CC'}} onPress = {() => this.submitButton()}>
                  ثبت
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
  }
});

DayOfAWeek.pageSource = '';
/*renders one day of a week*/
var Day = React.createClass({
  findIcon(mealIndex){
    var icons = { reserved : reservedIcon, notReserved: notReservedIcon, notPlanned : notPlannedIcon };
    var status = listOfFoods[mealIndex] && listOfFoods[mealIndex].status;
    return status && icons[status];
  },
  render(){
    return(
      <View style = {styles.singleDayContainer}>
        {/*show the day name on top of each day content*/}
        <View style = {{backgroundColor: '#716F70', padding: 10, paddingRight: 5}}>
          <Text style = {styles.weekDayName}>{this.props.weekDay}</Text>
          <Text style = {{color: 'white', fontSize: 14}}> {this.props.date} </Text>
        </View>
        <View>
          <View style = {styles.mealButton}>
            {/*fires up when a meal is selected*/}
            <Button onPress = {() => this.props.modalView(this.props.weekDay, this.props.mealIndex, 0, "صبحانه")}>
                <ResponsiveImage source={this.findIcon(this.props.mealIndex)} initWidth="18" initHeight="18"/>
                <Text style = {[styles.mealText, {flex:1}]}> صبحانه </Text>
            </Button>
          </View>
          <View style = {[styles.mealButton, {backgroundColor: "#CECECE"}]}>
            <Button  onPress = {() => this.props.modalView(this.props.weekDay, this.props.mealIndex + 1, 1, "نهار")}>
                <ResponsiveImage source={this.findIcon(this.props.mealIndex + 1)} initWidth="20" initHeight="20"/>
                <Text style = {[styles.mealText, {flex:1}]}> ناهار </Text>
            </Button>
          </View>
          <View style = {styles.mealButton}>
            <Button onPress = {() => this.props.modalView(this.props.weekDay, this.props.mealIndex + 2, 2, "شام")}>
                <ResponsiveImage source={this.findIcon(this.props.mealIndex + 2)} initWidth="18" initHeight="18"/>
                <Text style = {[styles.mealText, {flex:1}]}> شام </Text>
            </Button>
          </View>
        </View>
      </View>
    );
  },
});
DayOfAWeek.requestFoodList = function(mealIndex){
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    DayOfAWeek.requestMealIndex = mealIndex;
    /*getting the edDate and edMeal (.value not working after converting so a bit of extra work happend here )*/

    var value = DayOfAWeek.pageSource.getElementById("Meal" + DayOfAWeek.requestMealIndex).getAttribute('onclick');
    value = value.substring(value.search("\'") + 1, value.lastIndexOf("\'")).split(':');
    var edDate = value && value[0];
    var edMeal = value && value[1];
    request.onreadystatechange = (e) => {
      if ( request.readyState !== 4 ){
        return;
      }
      /*on network failure*/
      if (request.status !== 200){
        Alert.alert('خطا', 'اشکال در دریافت اطلاعات');
        reject(request.responseText);
      }
      else if (request.status === 200 && DayOfAWeek.requestMealIndex <= 20) {
        /*if the the response contains an error*/
        if (request.responseText.indexOf("در تاریخ وارد شده سال معتبر نیست") !== -1){
          var value = DayOfAWeek.pageSource.getElementById("Meal" + DayOfAWeek.requestMealIndex).getAttribute('value');
          /*the meal is not planned*/
          if (value === "برنامه ریزی نشده"){
            listOfFoods[DayOfAWeek.requestMealIndex] = {food: request.responseText, status: "notPlanned"};
          }
          else{
            listOfFoods[DayOfAWeek.requestMealIndex] = {food: request.responseText, status: "reserved"};
          }
        }
        /*otherwise the food is not reserved*/
        else{
            listOfFoods[DayOfAWeek.requestMealIndex] = {food: request.responseText, status: "notReserved"};
        }
        /*breaks the DayOfAWeek.loading*/
        if (DayOfAWeek.requestMealIndex === 20){
          DayOfAWeek.loading();
          resolve(request.responseText);
        }
        DayOfAWeek.requestFoodList(++mealIndex);
        return;
      }
      else {
        console.error('error' + ' ' + request.status);
      }
    };
    request.open('GET', "http://sups.shirazu.ac.ir/SfxWeb/Script/AjaxMember.aspx?Act=FoodDessert&ProgDate=" + edDate +  "&Restaurant=8&Meal=" + edMeal + "&Rand=0.9790692615049984", true);
    request.send();

  });
}
module.exports = DayOfAWeek;
