import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import { useLayoutEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import { ScrollView, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { auth, db } from "../firebase";
import firebase from "firebase/compat/app";

const ChatScreen = ({navigation, route}) =>{
    const [input, setInput]= useState("");
    const [messages, setMessages] =useState([]);
    

    useLayoutEffect(() =>{
        navigation.setOptions({
            title:"Chat",
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
            headerTitle: () =>(
                <View style={{
                    alignItems:"center",
                    flexDirection:"row",
                }}>
                    <Avatar 
                       rounded 
                       source={{uri:messages[0]?.[0]?.data.photoURL ||
                               "https://t3.ftcdn.net/jpg/02/09/37/00/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR.jpg"}}></Avatar>
                    <Text
                    style={{
                        color:"white",
                        marginLeft: 10,
                        fontWeight: "700",
                    }}>{route.params.chatName}</Text>
                </View>
            ),
            
            //code for back arrow(optional)
            headerLeft: () => (
                <TouchableOpacity style={{marginLeft: 10}}
                    onPress={navigation.goBack}>
                    {/*<AntDesign name="arrowleft" size={24} color="white"></AntDesign>*/}
                </TouchableOpacity>
            ),
            
            headerRight: () => (
                <View style={{
                    width: 80,
                    marginRight: 1,
                    flexDirection:"row",
                    justifyContent: "space-between",
                }}>
                    {/*de adaugat cellphone icon*/}
                    <TouchableOpacity /*style={{
                         width: 80,
                         marginRight: 2,
                         flexDirection:"row",
                         justifyContent: "space-between",
                }}*/>

                        <FontAwesome name="video-camera" size={24} color="white"></FontAwesome>
                        
                        
                    </TouchableOpacity>

                    <TouchableOpacity /*style={{
                         width: 80,
                         marginRight: 2,
                         flexDirection:"row",
                         justifyContent: "space-between",
                }}*/>

                        
                        <FontAwesome name="phone" size={24} color="white"></FontAwesome>
                        
                    </TouchableOpacity>


                </View>
            )
        });
    },[navigation, messages])

    const sendMessage = () => {
        Keyboard.dismiss();

        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })
        setInput('')

    };

    useLayoutEffect(() => {
        const unsubscribe=db.collection('chats').doc(route.params.id)
           .collection('messages')
           .orderBy('timestamp', 'asc')
           .onSnapshot((snapshot) =>
            setMessages(
                snapshot.docs.map(doc => ({
                    id:doc.id,
                    data: doc.data()
                }))
            ));
            return unsubscribe;
    },[route]);

   //console.log("test1");
   //console.log(messages[0]?.data.email);
    

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <StatusBar style="light"></StatusBar>
        <View
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
          keyboardVerticalOffset={90}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <ScrollView
                contentContainerStyle={{
                  paddingTop: 15,
                }}
              >
                {Array.from(messages).map(({ id, data }) =>
                  data.email === auth.currentUser.email ? (
                    <View key={id} style={styles.rec}>
                      <Avatar
                        position="absolute"
                        bottom={-15}
                        right={-5}
                        rounded
                        //For web
                        containerStyle={{
                          position: "absolute",
                          bottom: -15,
                          right: -5,
                        }}
                        size={30}
                        source={{
                          uri: data.photoURL,
                        }}
                      ></Avatar>
                      <Text style={styles.recText}>{data.message}</Text>
                    </View>
                  ) : (
                    <View style={styles.sender}>
                      <Avatar
                        position="absolute"
                        bottom={-15}
                        left={-5}
                        rounded
                        //For web
                        containerStyle={{
                          position: "absolute",
                          bottom: -15,
                          left: -5,
                        }}
                        size={30}
                        source={{
                          uri: data.photoURL,
                        }}
                      ></Avatar>
                      <Text style={styles.senderText}>{data.displayName}:</Text>
                      <Text style={styles.senderText}>{data.message}</Text>
                      
                    </View>
                  )
                )}
              </ScrollView>
              <View style={styles.footer}>
                <TextInput
                  value={input}
                  onChangeText={(text) => setInput(text)}
                  onSubmitEditing={sendMessage}
                  placeholder="Send Message"
                  style={styles.textInput}
                ></TextInput>

                <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                  <Ionicons name="send" size={24} color="#2B68E6"></Ionicons>
                </TouchableOpacity>
              </View>
            </>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    );
}

export default ChatScreen

const styles=StyleSheet.create({
    container: {
        flex: 1,


    },
    footer:{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,

    },
    textInput:{
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: 'grey',
        borderRadius: 30,

    },
    recText: {
        color:"black",
        fontWeight: "500",
        marginLeft: 10,

    },
    rec: {//reciever style
        padding: 15,
        backgroundColor: "#ECECEC",//GREY
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },

    sender: {//sender style
        padding: 15,
        backgroundColor: "#2B68E6",//BLUE
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative",

    },

    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color: "white",
    },

    senderText:{
        color:"white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    }

})