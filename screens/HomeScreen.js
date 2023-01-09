import React, { useEffect, useLayoutEffect,useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import CustomListItem from "../components/CustomListItem";
import { auth,db } from "../firebase";
import { ListItem, Avatar } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import {AntDesign  , SimpleLineIcons} from "@expo/vector-icons";

const HomeScreen = ({navigation}) => {

    const [chats,setChats] = useState([]);

    useEffect(()=>{
        const unsubscribe=db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc =>({
                id:doc.id,
                data:doc.data()
            })))
        ))

        return unsubscribe;
    },[]);

    const signOutUser = () =>{
        auth.signOut().then(() => {
            navigation.replace('Login');
        })
    };

    useLayoutEffect (() => {
        navigation.setOptions({
            title:"Chatty",
            headerStyle:{backgroundColor :"#2C6BED"},//blue
            headerTitleStyle:{color: "black"},
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{marginLeft:2}}>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                      <Avatar rounded source={{uri: auth?.currentUser?.photoURL}} ></Avatar>
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    width: 80,
                    marginRight: 2,
                }}>
                    
                   <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={24} color="black"></AntDesign>
                   </TouchableOpacity>

                   <TouchableOpacity 
                        onPress={() => navigation.navigate("AddChat")} 
                        activeOpacity={0.5}>
                        <SimpleLineIcons name="pencil" size={24} color="black"></SimpleLineIcons>
                   </TouchableOpacity>

                </View>
           )
        });
    }, [navigation]);

    function enterChat(id, chatName) {
        navigation.navigate('Chat', {
            id,
            chatName,
        }); 
    }


    return(
        <SafeAreaView>
            <ScrollView style={styles.container}>
              {chats.map(({id, data: {chatName}})=> (
                <CustomListItem key={id} id={id} 
                    chatName={chatName} 
                    enterChat={enterChat}></CustomListItem>
              ))}
              

            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        height:"100%",
    },
});