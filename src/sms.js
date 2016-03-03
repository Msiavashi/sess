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
    var state = { forgottenFirstFood: 'off', forgottenSecondFood: 'off', jetonViaSMS: 'off' };
    state.selectedOption = selected;
    state[selected] = 'on';
    this.setState(state);
  },
  sendButtonOnPress(){
    var phoneNumber = selfNumbers[this.state.selectedSelfIndex];   //TODO: handle the different self numbers here (girls , boys ,etc)
    var smsText = commands[this.state.selectedOption];
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
     </View>

     <View style = {styles.underHeader}>
       <View style = {styles.backButton}>
         <Button style = {{color: "white", fontSize: 22}} onPress = {this._backButtonPressed}>
             بازگشت
         </Button>
       </View>
     </View>
      <ScrollView style = {styles.selfServiceFooter}
      automaticallyAdjustContentInsets={false}>
        {this.showList()}
      </ScrollView>
      <Modal style={[styles.modal, styles.modalView, {backgroundColor: '#B8B4B3'}]} position={"center"} ref={"modalView"}>

              <View style = {{flex: 5, backgroundColor: '#41459C', marginBottom: 10}}>
                <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <Button style = {{flex: 1, alignItems: 'center'}} onPress = {() => this.selectionChanged("jetonViaSMS")}> <Text style = {{flex: 1, fontSize: 24, fontWeight: 'bold', color: 'white'}}>  بدون کارت </Text> </Button>
                </View>
              </View>

              <View style = {{flex: 5,flexDirection: 'row', marginBottom: 10}}>
                <View style = {{flex: 1,backgroundColor: 'green', alignItems: 'center', justifyContent: 'center'}}>
                  <Button style = {{flex: 1}} onPress = {() => this.selectionChanged("forgottenFirstFood")}><Text style = {{flex: 1, fontSize: 18, fontWeight: 'bold', color:'white', fontSize: 18}}> غذای فراموشی یک </Text></Button>
                </View>

                <View style = {{flex: 1,backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}}>
                  <Button style = {{flex: 1}} onPress = {() => this.selectionChanged("forgottenSecondFood")}>   <Text style = {{flex: 1, fontSize: 18, fontWeight: 'bold', color:'white', fontSize: 18}}> غذای فراموشی دو </Text>  </Button>
                </View>
              </View>

              <View style = {{ justifyContent:'center', flex:1, backgroundColor: '#292929', borderWidth: 2, borderColor: '#EED8AE'}}>
                  <Button style = {{flex: 1, color: 'white'}} onPress = {this.sendButtonOnPress}> ارسال </Button>
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
