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
  _backButtonPressed(){
    this.props.navigator.push({ id: "IndexView" });
  },
  getInitialState: function() { //they are used for Modal view
    return {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true
    };
  },
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
              <View style = {{flex: 5}}>
                <Text> فراموشی </Text>
                <Button>  </Button>
              </View>

              <View style = {{flex : 5, backgroundColor: 'gray'}}>
                <Text> بدون کارت </Text>
                <Button>  </Button>
              </View>

              <View style = {{ justifyContent:'center', flex:1, backgroundColor: '#CDBA96', borderWidth: 2, borderColor: '#EED8AE'}}>
                  <Button style = {{flex: 1,}}> ارسال </Button>
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
