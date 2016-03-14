var { StyleSheet, PixelRatio } = require('react-native')
var deviceScreen = require('Dimensions').get('window')

module.exports = StyleSheet.create({
  loginViewContainer:{
    flex : 1,
    alignItems: 'stretch',
    backgroundColor: '#444444',

  },
  loginViewHeader:{
    flex : 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  logoView:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginViewFooter:{
    flex : 1.5,
  },
  ButtonsSection:{
    flex: 1,
    alignItems: 'center',
  },
  loginButtonView:{
    marginBottom: 10,
  },
  loginButtonText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  loginButton:{
    flex:1,
    backgroundColor: '#4099FF',
    height:50,
    width: 250,

  },
  controlPanelHeader:{
    flex: 1,
    alignItems: 'center',
  },
  controlPanelFooter:{
    flex: 2,
    backgroundColor: '#444444',
    alignItems: 'flex-end',
    padding: 5
  },
  selfServiceContainer:{
    flex: 1,
    backgroundColor: '#444444',
  },
  selfServiceWeekDays:{
    paddingTop: 5,
    paddingBottom: 5,
    height: 50,
    borderColor: '#444444',
    borderWidth: 1,
    borderRadius:5,
    backgroundColor: '#666666',
    alignItems: 'center',
    justifyContent: 'center',

  },
  selfServiceWeekDayName:{
    fontSize:18,
    fontWeight: 'bold',
    color: 'white',
  },
  backButton:{
    flex:1,
    borderWidth:1,
    borderRadius:5,
    justifyContent: 'center',
    backgroundColor: '#444444',
    paddingLeft: 30,
    paddingRight:30,
    margin:5
  },
  underHeader:{
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  selfServiceHeaderTitle:{
    flex:1,
    textAlign: 'center',
    fontSize:22,
    color: 'white',
    fontWeight: 'bold',
  },
  selfServiceHeader:{
    flex : 1,
    backgroundColor: '#4099FF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selfServiceCreditView:{
    alignItems: "center",
    flex: 1,
    borderRadius: 100,
    backgroundColor: 'rgba(113,113,198,0.4)',
    marginLeft: 10,
  },
  creditText:{
    fontSize: 20,
    fontWeight: 'bold',
    margin:5,
    color: '#ADFF2F',
  },
  backButtonView:{
    flex: 1,
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: 'white',
    alignItems: 'flex-end',
    justifyContent: "center",
  },
  selfServiceFooter:{
    flex: 9,
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
  controlPanelOption:{
    color: 'white',
    fontSize: 18,
    flex:1,
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

  wrapper: {
    paddingTop: 50,
    flex: 1
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalView: {
    padding: 10,
    alignItems: 'stretch',
    height: 350,
    width: 350,
    backgroundColor: '#FFFAF0',
  },
  sendButtonView: {
    backgroundColor: 'red',
    alignSelf: 'flex-end',

  },
  daysHeader:{
    flex : 1,
    backgroundColor: '#FF6600',
    justifyContent: 'center',
  },
  daysContainer:{
    flex: 1,
    backgroundColor: '#444444',
  },
  daysFooter:{
    flex: 6,
  },
  mealButton:{
    backgroundColor: '#DEDEDE',
    justifyContent: 'center'
    // borderWidth: 1,
    // borderColor: '#A2A9AF',
  },
  weekDayName:{
     marginRight: 5,
     color: 'white',
     fontSize: 24,
     fontWeight: 'bold',
  },
  singleDayContainer:{
    flex: 1,
  },
  mealText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  mealModalView:{
    alignItems: 'stretch',
    height: 350,
    width: 350,
    backgroundColor: '#FFFAF0',
  },
});
