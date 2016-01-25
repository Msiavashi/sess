var React = require('react-native');
var Login = require('./src/login');
var {
  Text,
  View,
  TextInput,
  AppRegistry,
  StyleSheet,
  onChangeText,
  Button,
  TouchableHighlight
} = React;

var username = null;
var password = null;

var sess = React.createClass({

  render: function(){
    return (
      <View style ={Styles.container} >

          <TextInput
            ref = {"username"}
            placeholder = {'enter your username'}
            onChangeText = {(text) => username = text}
            //value = {this.state.text}
           />
           <TextInput
             ref = {"password"}
             placeholder = {'enter your password'}
             onChangeText = {(text) => password = text}
             //value = {this.state.text}
            />

            <Button style={Styles.button} onPress={this.callLogin} >
              LOGIN
            </Button>
      </View>
    );
  },
  callLogin: function()
  {
    Login.login(username, password);
  }
});

var Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  text:{
    color: 'red',
    fontSize:18,
  },

  button:{
    borderWidth: 1,
    borderColor: 'blue',
  },
});


AppRegistry.registerComponent('AwsoneProject', () => sess);
