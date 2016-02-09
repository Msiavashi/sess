var React = require('react-native');
var styles = require('.././styles');
var Button = require('react-native-button');
var SmsAndroid = require('react-native-sms-android');
var Modal   = require('react-native-modalbox');
var {
  Text,
  View,
  ScrollView,
  Navigator,
  Alert,
  Navigator,
} = React;

var selfServices = ['مهندسی نفت و گاز', 'مرکزی', 'ارم', 'خوابگاه شهید دستغیب', 'دانشکده هنر و معماری', 'دانشکده کشاورزی', 'بوفه ارم', 'بوفه مرکزی', 'بوفه خوابگاه مفتح', 'دانشکده دامپزشکی', 'خوابگاه دامپزشکی', 'دانشکده علوم'];
var selfNumbers = [];
var commands = [{jetonViaSMS: '#1#'}];    //the commands that are used in sms's should be add to here
/*
SmsAndroid.sms(
  '123456789', // phone number to send sms to
  'This is the sms text', // sms body
  'sendDirect', // sendDirect or sendIndirect
  (err, message) => {
    if (err){
      console.log("error");
    } else {
      console.log(message); // callback message
    }
  }
);
*/
var SMSPanelView = React.createClass({
  _selectFieldOnPress(){
    this.setState({

    });
  },
  _backButtonPressed(){
    this.props.navigator.push({ id: "IndexView" });
  },
  getInitialState: function() { //they are used for Modal view
    return {
      /*modal variables*/
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      /*selections variables*/
      forgottenFirstFood: 'off',
      forgottenSecondFood: 'off',
      jetonViaSMS: 'off'
    };
  },
  /*TODO: find a shortcut for this radio-like buttons (this function is only for test & not yet effecient to use ) */
  selectionChanged(selected){
    switch (selected) {
      case "forgottenFirstFood":
        this.setState({
          forgottenFirstFood: 'on',
          forgottenSecondFood: 'off',
          jetonViaSMS: 'off',
        });
        break;
      case "forgottenSecondFood":
        this.setState({
          forgottenFirstFood: 'off',
          forgottenSecondFood: 'on',
          jetonViaSMS: 'off',
        });
        break;
      case "jetonViaSMS":
        this.setState({
          forgottenFirstFood: 'off',
          forgottenSecondFood: 'off',
          jetonViaSMS: 'on',
        });
        break;
      default:
        break;
    }
  },
  sendButtonOnPress(){
    //TODO: write the body
    //find the number of the self
    //find what is the selection of the user
    //call the sendSMS fucntion to perform the rest
  }
  openmodalView(id){
    this.refs.modalView.open();
  },
  render(){
  return (
     <View style = {styles.selfServiceContainer}
     automaticallyAdjustContentInsets={false}>
      <View style = {styles.selfServiceHeader}>
        <Text style = { styles.selfServiceHeaderTitle }> ارسال پیامک </Text>
        <Button style = {styles.backButton} onPress = {this._backButtonPressed}> بازگشت </Button>
      </View>
      <ScrollView style = {styles.selfServiceFooter}
      automaticallyAdjustContentInsets={false}>
        {this.showList()}
      </ScrollView>
      <Modal style={[styles.modal, styles.modalView]} position={"center"} ref={"modalView"}>
              <Text> فراموشی </Text>
              <View style = {{flex: 5, backgroundColor: 'lightblue', borderRadius: 5, borderColor: 'white'}}>

                <View style = {{flex: 1, alignItems: 'center', flexDirection: 'row', borderWidth: 1, borderColor: 'grey'}}>
                  <Button style = {{flex: 1}} onPress = {() => this.selectionChanged("forgottenFirstFood")}>   {this.state.forgottenFirstFood}  </Button>
                  <Text style = {{flex: 1, fontSize: 18, fontWeight: 'bold'}}> غذای یک </Text>
                </View>

                <View style = {{flex: 1, alignItems: 'center', flexDirection: 'row', borderWidth: 1, borderColor: 'grey'}}>
                  <Button style = {{flex: 1}} onPress = {() => this.selectionChanged("forgottenSecondFood")}>   {this.state.forgottenSecondFood}  </Button>
                  <Text style = {{flex: 1, fontSize: 18, fontWeight: 'bold'}}> غذای دو </Text>
                </View>

              </View>
              <Text> سایر گزینه ها </Text>
              <View style = {{flex: 5, backgroundColor: 'lightblue', borderRadius: 5, borderColor: 'white'}}>
                <View style = {{flex: 1, alignItems: 'flex-start', flexDirection: 'row', borderWidth: 1, borderColor: 'grey'}}>
                  <Button style = {{flex: 1}} onPress = {() => this.selectionChanged("jetonViaSMS")}>   {this.state.jetonViaSMS}  </Button>
                  <Text style = {{flex: 1, fontSize: 18, fontWeight: 'bold'}}>  بدون کارت </Text>
                </View>

              </View>
              <View style = {{ justifyContent:'center', flex:1, backgroundColor: '#CDBA96', borderWidth: 2, borderColor: '#EED8AE'}}>
                  <Button style = {{flex: 1,}} onPress = {this.sendButtonOnPress}> ارسال </Button>
              </View>
      </Modal>
    </View>
  )
},
  showList(){
    return (
      selfServices.map((selfName) => <ViewNames name={selfName} navigator={this.props.navigator} open = {this.openmodalView} />)
  );
},
});

var ViewNames = React.createClass({
  _nameOnPress(){

  },

  render(){
    return(
      <Button onPress={this.props.open}>
        <View style = {styles.selfServiceWeekDays}>
            <Text style = {styles.selfServiceWeekDayName}>
              {this.props.name}
            </Text>
        </View>
      </Button>
  );
  },
});

module.exports = SMSPanelView;
