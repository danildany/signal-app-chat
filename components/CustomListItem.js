import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { ListItem } from 'react-native-elements'
import { db } from '../firebase'
const CustomListItem = ({id, chatName , enterChat}) => {
    const [chatMessages, setChatMessages] = useState([])
    useEffect(() => {
       const unsubscribe = db.collection('chats').doc(id).collection('messages')
       .orderBy('timestamp','desc').onSnapshot(snapshot =>{
            setChatMessages(snapshot.docs.map(doc => doc.data()))
       })
       return unsubscribe
    }, [])
    return (
        <ListItem key={id} onPress={()=>{enterChat(id, chatName)}} key={id} bottomDivider>
            <Avatar 
            rounded
            source={{
                uri: chatMessages?.[0]?.photoURL || 'https://raw.githubusercontent.com/danildany/Wiki-API/main/assets/default.png',
            }}
            />
        <ListItem.Content>
            <ListItem.Title style={{fontWeight:'900'}}>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
            </ListItem.Subtitle>
        </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
