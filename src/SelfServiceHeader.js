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


module.exports = React.createClass({
  getInitialState(){
    return{
      userName: '',
      edCredit: '',
    }
  },
  componentDidMount(){
    this.setHeaderValues();
  },
  setHeaderValues(){
    var parser = new DOMParser();
    this.props.selfPage = parser.parseFromString(this.props.selfPage, "text/xml");   //converts the response Text to document
    var header = String(this.props.selfPage.getElementById('Toolbar1_lblUserName'));
    header = header.substring(header.indexOf('>') + 1, header.lastIndexOf('</'))
    header = header.split(':');
    var credit = String(this.props.selfPage.getElementById('edCredit'));
    credit = credit.substring(credit.indexOf('>') + 1, credit.lastIndexOf('</'));
    this.setState({userName: header[1], edCredit: credit});   //set the user name and credit on the header
  },
  render(){
    return(
      <View style = {styles.selfServiceHeader}>
        <View style = {styles.selfServiceCreditView}>
          <Text style = {styles.creditText}>{this.state.edCredit}</Text>
        </View>
        <Text style = { styles.selfServiceHeaderTitle }> {this.state.userName} </Text>
      </View>
    );
  },
});
