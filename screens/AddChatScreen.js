import React from "react";
import { useLayoutEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import  Icon  from "react-native-elements";
import { db } from "../firebase";

const AddChatScreen = ({navigation}) => {

    const [input, setInput] = useState("");

    useLayoutEffect(() =>{
        navigation.setOptions({
            title:"Add a new Chat",
            headerBackTitle: "Chats",
        })
    }, [navigation])

    const createChat = async () =>{
        await db.collection('chats').add({
            chatName: input,
        }).then(() => {
            navigation.goBack();
        }).catch((error) => alert(error))
    };

    return(
        <View style={styles.container}>
            <Input 
                placeholder="Enter a chat name" 
                value={input} 
                onChangeText={(text) =>setInput(text)}
                onSubmitEditing={createChat}
                /* coulnd't figure out
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color="black"></Icon>
                }*/></Input>
                <Button disabled={!input} onPress={createChat} title="Create new Chat"></Button>
        </View>
    )
}

export default AddChatScreen;

const styles=StyleSheet.create({
    container:{
        backgroundColor: 'white',
        height:"100%",
        padding: 30,

    },
})