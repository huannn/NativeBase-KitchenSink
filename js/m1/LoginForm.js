//import liraries
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button ,StyleSheet ,StatusBar, AsyncStorage} from 'react-native';
import * as MyConst from './const.js';

// create a component
class LoginForm extends Component {
    static navigationOptions = {
      title: 'Welcome',
    };
    constructor(props) {
      super(props);
      this.state = {};
    }

    onButtonPress(){

      if(!this.state.userName || !this.state.password) {
        Alert.alert('Bạn hãy nhập tên đăng nhập và mật khẩu!');
        return;
      }

      let url = MyConst.WS_URL + 'common/login?userName=' + this.state.userName + '&password=' + this.state.password;
      fetch(url)
        .then(res => res.json())
        .then(responseJson => {
          if(parseInt(responseJson.userId) > 0) {

            try {
                AsyncStorage.setItem(MyConst.AS_UID, responseJson.userId, () => {
                  AsyncStorage.setItem(MyConst.AS_TOKEN, responseJson.token);
                });                 
            } catch (error) {
            }

              this.props.loginProps.navigation.navigate("Drawer");
          } else {
              Alert.alert('Tên đăng nhập hoặc mật khẩu không đúng!');
          }
        })
        .catch(error => {
          console.log("WS: " + url);
          console.log(error);
          Alert.alert('Không kết nối được tới máy chủ!');
        });
    };

    render() {

        // console.log('========LOGIN FORM======');
        // console.log(this.props);

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <TextInput style = {styles.input} 
                            autoCapitalize="none" 
                            onSubmitEditing={() => this.passwordInput.focus()} 
                            autoCorrect={false} 
                            keyboardType='email-address' 
                            returnKeyType="next" 
                            placeholder='Tên đăng nhập' 
                            placeholderTextColor='rgba(225,225,225,0.7)'
                            onChangeText={(text) => this.setState({'userName': text})}/>

                <TextInput style = {styles.input}   
                           returnKeyType="go" ref={(input)=> this.passwordInput = input} 
                           placeholder='Mật khẩu' 
                           placeholderTextColor='rgba(225,225,225,0.7)' 
                           secureTextEntry
                           onChangeText={(text) => this.setState({'password': text})}/>

                 {/*   <Button onPress={onButtonPress} title = 'Login' style={styles.loginButton} /> */}
                <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress.bind(this)}>
                    <Text  style={styles.buttonText}>ĐĂNG NHẬP</Text>
                </TouchableOpacity> 
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
     padding: 20
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }, 
    loginButton:{
      backgroundColor:  '#2980b6',
       color: '#fff'
    }
   
});

//make this component available to the app
export default LoginForm;
