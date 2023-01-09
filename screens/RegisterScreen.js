import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { auth } from "../firebase";
import { ScrollView } from "react-native";

const RegisterScreen = ({navigation}) => {
    const [name, setName] =useState('');
    const [email, setEmail] =useState('');
    const [password, setPassword] =useState('');
    const [imageUrl, setImageUrl] =useState('');


    //back to login page if you already have an account
    useLayoutEffect(() => {
       navigation.setOptions({
          headerBackTitle:"Login",
       });
    }, [navigation]);

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
           authUser.user.updateProfile({
            displayName: name,
            photoURL: imageUrl || "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"
           })
        })
           .catch((error) => alert(error.message));
    };

     return(
        <View behavior="padding" style={styles.container}>
        
            
            <StatusBar style="light"></StatusBar>
            
            <Text h3 style={{marginBottom: 50}}>Create an account</Text>

           <View style={styles.inputContainer}>
        
           <Input placeholder="Full Name" 
                  autofocus type='text' value={name}
                  onChangeText={(text) => setName(text)}></Input>

           <Input placeholder="Email" 
                   type='email' value={email}
                   onChangeText={(text) => setEmail(text)}></Input>

           <Input placeholder="Password" 
                   type='password' value={password}
                   secureTextEntry
                   onChangeText={(text) => setPassword(text)}></Input>

           <Input placeholder="Profile Picture Url(Optional)" 
                   type='text' value={imageUrl}
                   onChangeText={(text) => setImageUrl(text)}
                   onSubmitEditing={register}>
        
                  </Input>

                  
        </View>
        <Button
           containerStyle={styles.button}  
           raised 
           onPress={register} 
           title="Register"></Button>
        
        <View style={{height:100}}></View>
        
        </View>


     )
}

export default RegisterScreen;

const styles=StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",


    },

    button:{
        width: 200,
        marginTop: 10,
    },

    inputContainer: { 
        width:300,
    },
})