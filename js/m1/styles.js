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
  cardItem: {paddingLeft: 2, paddingRight: 2, paddingTop: 2, paddingBottom: 2},
  picker: { borderColor: "#3276b1", borderRadius: 4, borderWidth: 0.5, margin:1, paddingLeft: 5, paddingRight: 5, height:40},
  pickerHeader: { backgroundColor: "#3276b1" },
  textDefault : { color: "#fff" },
  headerReport:{height:110},
  listItemHeader: {fontSize:12, fontWeight:"bold", color:"#3276b1"},
  listItem: {fontSize:10, color:"#3276b1"},
};
