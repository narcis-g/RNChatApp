import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { useState } from "react";
import { db } from "../firebase";



const CustomListItem = ({id, chatName, enterChat}) => {

    const[chatMessages, setChatMessages]=useState([]);

    useEffect(() =>{
        const unsubscribe =db.collection('chats').doc(id).collection('messages').
        //try asc instead of desc
        orderBy('timestamp', 'asc').onSnapshot(snapshot => 
            setChatMessages(snapshot.docs.map(doc=>doc.data()))
        );
        return unsubscribe;
    })

    return(
        <ListItem key={id} onPress={() => enterChat(id, chatName)}  bottomDivider>

            <Avatar
               rounded
               source = {{
                uri: chatMessages?.[0]?.photoURL ||
                "https://t3.ftcdn.net/jpg/02/09/37/00/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR.jpg",
               }}>

            </Avatar>

            <ListItem.Content>
                <ListItem.Title style={{fontWeight: "800"}}>

                    {chatName}

                </ListItem.Title>

                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessages?.[0]?.displayName} {chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>

        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})