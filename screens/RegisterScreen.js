import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, View  } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { auth } from '../firebase'
const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [passsword, setPassword] = useState('')
    const [imgUrl, setImgUrl] = useState('')

useLayoutEffect(() => {
    navigation.setOptions({
        headerBackTitle:'Login',
    })
}, [navigation])

    const register = ()=>{
        auth.createUserWithEmailAndPassword(email,passsword)
        .then(authUser =>{
            authUser.user.updateProfile({
                displayName:name,
                photoURL:imgUrl!==''?imgUrl:'https://raw.githubusercontent.com/danildany/Wiki-API/main/assets/default.png'
            })
        }).catch(err=>err.message)
    }
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light'/>
            <Text h3 style={{marginBottom:50}}>
                Create a signal account
            </Text>
            <View style={styles.inputContainer}>
                <Input inputContainerStyle={{borderBottomWidth:0}}  style={styles.input} placeholder='Full name'  type='text' value={name} onChangeText={text=>setName(text)}/>
                <Input inputContainerStyle={{borderBottomWidth:0}}  style={styles.input} placeholder='Email'  type='text' value={email} onChangeText={text=>setEmail(text)}/>
                <Input inputContainerStyle={{borderBottomWidth:0}}  style={styles.input} placeholder='Password'  type='text' secureTextEntry value={passsword} onChangeText={text=>setPassword(text)}/>
                <Input inputContainerStyle={{borderBottomWidth:0}}  style={styles.input} placeholder='Profile picture url (Optional)'  type='text' value={imgUrl} onChangeText={text=>setImgUrl(text)} onSubmitEditing={register}/>
            </View>
            <Button containerStyle={styles.button} raised onPress={register} title='Register'/>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'#fff'
    },
    inputContainer:{
        width:300
    },
    button: {
        width:200,
        marginTop:10
    },
    input:{
        backgroundColor:'lightgray',
        borderRadius:50,
        paddingLeft:10,
    }
})