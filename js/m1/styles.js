const React = require("react-native");

const { StyleSheet } = React;

export default {
  container: {
    backgroundColor: "#FFF"
  },
  text: {
    alignSelf: "center",
    marginBottom: 7
  },
  mb: {
    marginBottom: 0
  },
  cardItem: {paddingLeft: 0, paddingRight: 0, paddingTop: 2, paddingBottom: 2},
  cardHeader: {paddingLeft: 5, paddingRight: 0, paddingTop: 2, paddingBottom: 5, backgroundColor:"#0b0744"},
  picker: {borderColor: "#3276b1", borderRadius: 4, borderWidth: 0.5, margin:1, paddingLeft: 5, paddingRight: 5, height:35},
  pickerHeader: { backgroundColor: "#3276b1" },
  textDefault : { color: "#fff" },
  headerParam:{height:100},
  liTextHeader: {fontWeight:"bold", color:"#3276b1"},
  liText: {fontSize:14, color:"#3276b1", paddingRight:2},
  liHeader: {marginLeft: 5},
  liOdd: {backgroundColor:"#fff", marginLeft: 5, paddingTop:10, paddingBottom: 10},
  liEven: {backgroundColor:"#f4f5f7", marginLeft: 5, paddingTop:10, paddingBottom: 10},
  paramText:{color:"#3276b1",marginLeft:5},
};
