import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { auth } from "../firebase";
import { ScrollView } from "react-native";

const LoginScreen = ({navigation}) =>{

    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');

    useEffect(() => {
      const unsubscribe=  auth.onAuthStateChanged((authUser) => {
            //console.log(authUser)
            if(authUser){
                navigation.replace("Home");
            }
        });

        return unsubscribe;
    }, []);

    const signIn = () => {

        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error));

    }
   

    return (
        <View behavior='padding' style={styles.container}>
        
            <StatusBar style="light"/>
            <Image source={{
                uri:
                "https://play-lh.googleusercontent.com/9AZOTXU_CpreTFAXUPAmJNkm8VGCb1C90fjJ9pHGcVmpGMDSTq3cUbaQJdBT9Tdp9A"
            }}
            style={{width: 200, height: 200}}></Image>

            <View style={styles.inputContainer}>
                <Input placeholder="Email" 
                       autoFocus type="email" 
                       value={email} 
                       onChangeText={text => setEmail(text)}/>

                <Input placeholder="Password" 
                       secureTextEntry type ="password"
                       value={password} 
                       onChangeText={text => setPassword(text)}
                       onSubmitEditing={signIn} />
                       
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="Login"></Button>
            
            <Button containerStyle={styles.button} 
               onPress={() => navigation.navigate('Register')} 
               type="outline" title="Register">
               </Button>

            <View style={{height:100}}></View>
           
        </View>
    )
}

export default LoginScreen;

const styles =StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: { 
        width:300,
    },
    button:{
        width: 200,
        marginTop: 10,
    }
});