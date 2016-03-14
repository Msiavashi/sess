var React = require('react-native');
var styles = require('.././styles');
var DOMParser = require('xmldom').DOMParser;
var {
  Text,
  View,
  ScrollView,
  Alert,
  Navigator,
} = React;


var SelfServiceHeader = React.createClass({
  getInitialState(){
    return{
      userName: '',
      edCredit: 1
    }
  },
  componentDidMount(){
    this.setHeaderValues();
  },
  setHeaderValues(nextProps){
    // if(this.props.shouldParseSelfPage === true){
    var parser = new DOMParser();
    //TODO: remove the strings
    if(nextProps){
      this.props.selfPage = parser.parseFromString(String(nextProps.selfPage), "text/xml");   //converts the response Text to document
    }
    else{
      this.props.selfPage = parser.parseFromString(String(this.props.selfPage), "text/xml");   //converts the response Text to document
    }

    var header = this.props.selfPage.getElementById('Toolbar1_lblUserName').textContent.split(':');
    SelfServiceHeader.credit = this.props.selfPage.getElementById('edCredit').textContent;
    this.setState({userName: header[1]});   //set the user name and credit on the header
  },
  componentWillReceiveProps(nextProps){
    if (this.props.selfPage !== nextProps.selfPage)
    {
        this.setHeaderValues(nextProps);
    }
  },
  render(){
    return(
      <View style = {styles.selfServiceHeader}>
        <View style = {styles.selfServiceCreditView}>
          <Text style = {styles.creditText}>{SelfServiceHeader.credit}</Text>
        </View>
        <Text style = { styles.selfServiceHeaderTitle }> {this.state.userName} </Text>
      </View>
    );
  },
});
SelfServiceHeader.credit = null;
module.exports = SelfServiceHeader;
