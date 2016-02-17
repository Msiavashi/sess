var React = require('react-native');
var styles = require('.././styles');
var Button = require('react-native-button');
var SmsAndroid = require('react-native-sms-android');
var Modal = require('react-native-modalbox');
var {
  Text,
  View,
  ScrollView,
  Navigator,
  Alert,
  Navigator,
} = React;

var selfServices = ['مهندسی نفت و گاز', 'مرکزی', 'ارم', 'خوابگاه شهید دستغیب', 'دانشکده هنر و معماری', 'دانشکده کشاورزی', 'بوفه ارم', 'بوفه مرکزی', 'بوفه خوابگاه مفتح', 'دانشکده دامپزشکی', 'خوابگاه دامپزشکی', 'دانشکده علوم'];
var selfNumbers = {selfMarkazi: '09170428700', };
var commands = {jetonViaSMS: '#1#', };    //the commands that are used in sms's should be add to here

var SMSPanelView = React.createClass({
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
      jetonViaSMS: 'off',
      selectedSelfIndex: '',
      selectedOption: '',
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
          selectedOption: 'forgottenFirstFood',
        });
        break;
      case "forgottenSecondFood":
        this.setState({
          forgottenFirstFood: 'off',
          forgottenSecondFood: 'on',
          jetonViaSMS: 'off',
          selectedOption: 'forgottenSecondFood',
        });
        break;
      case "jetonViaSMS":
        this.setState({
          forgottenFirstFood: 'off',
          forgottenSecondFood: 'off',
          jetonViaSMS: 'on',
          selectedOption: 'jetonViaSMS',
        });
        break;
      default:
        break;
    }
  },
  sendButtonOnPress(){
    var phoneNumber = selfNumbers[this.state.selectedSelfIndex];   //TODO: handle the different self numbers here (girls , boys ,etc)
    var smsText = '';
    /*fill the smsText*/
    switch (this.state.selectedOption) {
      case "jetonViaSMS":
        smsText = commands.jetonViaSMS;
        break;
      case "forgottenFirstFood":
        smsText = commands.forgottenFirstFood;
        break;
      case "forgottenSecondFood":
        smsText = commands.forgottenSecondFood;
        break;
      default:
        break;
    }
    SmsAndroid.sms(
      phoneNumber, // phone number to send sms to
      smsText, // sms body
      'sendDirect', // sendDirect or sendIndirect (send method)
      (err, message) => {
        if (err){
          Alert.alert("خطا");
        } else {
          Alert.alert(message); // callback message
        }
      }
    );

  },
  openmodalView(){
    this.refs.modalView.open();
  },
  _selfServicePresHandler(selectedName){
    this.setState({selectedSelfIndex: selfServices.indexOf(selectedName)});
    this.openmodalView();
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
      selfServices.map((selfName) => <ViewNames name={selfName} navigator={this.props.navigator} open = {this._selfServicePresHandler} />)
  );
},
});

var ViewNames = React.createClass({
  render(){
    return(
      <Button onPress={() => this.props.open(this.props.name)}>
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
