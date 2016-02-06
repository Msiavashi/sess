var { StyleSheet, PixelRatio } = require('react-native')
var deviceScreen = require('Dimensions').get('window')

module.exports = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  loginViewContainer:{
    flex : 1,
    alignItems: 'stretch',
    backgroundColor: '#e3e3e3',
  },
  loginViewHeader:{
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginViewFooter:{
    flex : 1,
  },
  controlPanelHeader:{
    flex: 1,
    backgroundColor: 'blue',
  },
  controlPanelFooter:{
    flex: 2,
    alignItems: 'flex-start',
  },
  selfServiceContainer:{
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  selfServiceWeekDays:{
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#00bfff',
    alignItems: 'center',
  },
  selfServiceWeekDayName:{
    fontSize:18,
    fontWeight: 'bold',
    color: 'white',
  },
  selfServiceHeaderTitle:{
    textAlign: 'center',
    fontSize:16,
    color: 'white',
  },
  selfServiceHeader:{
    flex : 1,
    backgroundColor: '#b4b4b4',
  },
  selfServiceFooter:{
    flex: 5,
    backgroundColor: '#333333',
  },
  scrollView: {
    backgroundColor: '#B99BC4',
  },
  container: {
    flex: 1,
    backgroundColor: '#C5B9C9',
  },
  controlPanel: {
    flex: 1,
    backgroundColor:'#A9A9A9',
  },
  controlPanelText: {
    color:'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 25,
  },
  controlPanelWelcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 25,
    color:'white',
    fontWeight:'bold',
  },
  categoryLabel: {
    fontSize: 15,
    textAlign: 'left',
    left: 10,
    padding:10,
    fontWeight:'bold',
  },
  row: {
    flexDirection: 'row',
    backgroundColor:'white',
    borderRadius: 0,
    borderWidth: 0,
    padding:0,
    borderTopWidth: 1 / PixelRatio.get(),
    borderColor: '#d6d7da',
    padding:10,
    alignItems: 'center'
  },
  lastRow: {
    flexDirection: 'row',
    backgroundColor:'white',
    borderRadius: 0,
    borderWidth: 0,
    padding:0,
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#d6d7da',
    padding:10,
    alignItems: 'center'
  },
  rowLabel: {
    left:10,
    fontSize:15,
    flex:1,
  },
  rowInput: {
    right:10,
  },
  sliderMetric: {
    right:10,
    width:30,
  },
  slider: {
    width: 150,
    height: 10,
    margin: 10,
  },
  picker: {
    backgroundColor:'white',
    borderRadius: 0,
    borderWidth: 0,
    padding:0,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderTopWidth: 1 / PixelRatio.get(),
    borderColor: '#d6d7da',
  },
  label: {
    fontSize: 20,
    textAlign: 'left',
    margin: 0,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {

    padding: 5,
    fontSize: 20,
    color: 'blue',
    marginRight:20,
    marginLeft:20,
    alignSelf: 'center',
  },
});
