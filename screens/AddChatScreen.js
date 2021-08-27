import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase'
const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState()
    useLayoutEffect(() => {
       navigation.setOptions({
           title:'Add a new chat',
           headerBackTitle:'Chats',
       });
    }, [navigation])

    const createChat = async () =>{
       await db.collection('chats').add({
           chatName: input
       }).then(()=>{
           navigation.goBack()
       }).catch(err => alert(err))
    }
    return (
        <View style={styles.container}>
            <Input inputContainerStyle={{borderBottomWidth:0}}  style={styles.input} placeholder='Enter a chat name' value={input} onChangeText={text => setInput(text)} leftIcon={<Icon name='wechat' size={24} color='black'/>} onSubmitEditing={createChat}/>
            <Button containerStyle={styles.btns} onPress={createChat} title='Create new chat'/>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        padding:30,
        height:'100%'
    },  
    inputContainer: {
        width:300,
    },
    input:{
        backgroundColor:'lightgray',
        borderRadius:50,
        paddingLeft:10,
    }
})
