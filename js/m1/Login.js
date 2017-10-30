//import liraries
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet,KeyboardAvoidingView, AsyncStorage, Alert} from 'react-native';
import * as MyConst from './const.js';
import LoginForm from './LoginForm';
import EmptyPage from './empty';
import Home from "../components/home/";

// create a component
class Login extends Component {

    static navigationOptions = {
      title: 'Welcome',
    };
    constructor(props) {
      super(props);
      this.state = {
        storeChecking: true,
        loginChecking: false
      };

      //AsyncStorage.clear();
      AsyncStorage.getItem(MyConst.AS_UID, (err, uid) => {
        AsyncStorage.getItem(MyConst.AS_TOKEN, (err2, token) => {


            if(uid && token) {
                this.setState({
                    storeChecking: false,
                    loginChecking: true,
                });

                // Kiem tra de tu dong dang nhap
                let url = MyConst.WS_URL + 'common/autologin?uid=' + uid + '&token=' + token;
                      fetch(url)
                        .then(res => res.json())
                        .then(responseJson => {
                          if("1" == responseJson) {
                            this.props.navigation.navigate("Drawer");  
                          } else {
                            this.setState({
                                storeChecking: false,
                                loginChecking: false,
                            });
                          }                          
                        })
                        .catch(error => {
                          console.log("WS: " + url);
                          console.log(error);
                          Alert.alert('Không kết nối được tới máy chủ!');

                          this.setState({
                                storeChecking: false,
                                loginChecking: false,
                            });
                        });
            } else {
                this.setState({
                    storeChecking: false,
                    loginChecking: false,
                });
            } 
          });
      });
    }

    render() {
        
        // Neu dang kiem tra login da luu thi chi hien thi man hinh loading
        if(this.state.storeChecking || this.state.loginChecking) {
            return (<EmptyPage />);
        }

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
               <View style={styles.formContainer}>
                   <LoginForm loginProps={this.props}/>
               </View>         
            </KeyboardAvoidingView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
        justifyContent: 'center',
    },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },
    title:{
        color: "#FFF",
        marginTop: 120,
        width: 180,
        textAlign: 'center',
        opacity: 0.9
    }
});

//make this component available to the app
export default Login;
