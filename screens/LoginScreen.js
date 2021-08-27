import React, { useState,useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Text } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { KeyboardAvoidingView } from 'react-native'
import { auth } from '../firebase'
const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                navigation.replace('Home');
            }else{

            }
        })
        return unsubscribe;
    }, [])
    const signIn = () =>{
        auth.signInWithEmailAndPassword(email,password)
        .catch(err=>alert(err))
    }
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light'/>
            <Image source={{
                uri:'https://raw.githubusercontent.com/danildany/Wiki-API/main/assets/signal-logo.png',
            }}
            style={{width:200,height:200}}
            />
            <View style={styles.inputContainer}>
                <Input inputContainerStyle={{borderBottomWidth:0}}  style={styles.input} placeholder='Email'  type='email' value={email} onChangeText={text=>setEmail(text)}/>
                <Input inputContainerStyle={{borderBottomWidth:0}} style={styles.input} placeholder='Password' secureTextEntry type='password' value={password} onChangeText={text=>setPassword(text)} onSubmitEditing={signIn}/>
            </View>
            <Button containerStyle={styles.btns} onPress={signIn} title='Login' />
            <Button onPress={()=>navigation.navigate('Register')} containerStyle={styles.btns} title='Register' type='outline'/>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
    },
    inputContainer: {
      width:300,
    },
    btns: {
        width:200,
        marginTop:10,
    },
    input:{
        backgroundColor:'lightgray',
        borderRadius:50,
        paddingLeft:10,
    }
  });