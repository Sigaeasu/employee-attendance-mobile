import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';

export default function Login(props) {
    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [formValidity, setFormValidity] = useState(false)
    const [loginStatus, setLoginStatus] = useState(false)

    const isEmpty = value => value.trim() === ''

    const submitLogin = (event) => {
        event.preventDefault();

        setFormValidity(false)
        setLoginStatus(false)

        const enteredUsernameIsValid = !isEmpty(usernameInput)
        const enteredPasswordIsValid = !isEmpty(passwordInput)

        if (!enteredUsernameIsValid || !enteredPasswordIsValid) {
            setFormValidity(true)
            return
        }

        const loginData = {
            username: usernameInput,
            password: passwordInput
        }

        fetch('http://localhost:5000/api/employees/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then((response) => response.json())
        .then((json) => {
            if (json.error === true) {
                setLoginStatus(true)
            } else {
                props.onLogin(json.data.id)
            }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>LOGIN</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={text => setUsernameInput(text)}
            />
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder="Password"
                onChangeText={text => setPasswordInput(text)}
            />
            <Button
                title="Submit"
                color="#4281f5"
                onPress={submitLogin}
            />
            {formValidity && <Text style={styles.warning}>Please fill all required field !</Text>}
            {loginStatus && <Text style={styles.warning}>Wrong username/password !</Text>}
        </View>
    );
  }
  
const styles = StyleSheet.create({
    container: {
        padding: 30,
        borderRadius: 30,
        borderColor: "#cccccc"
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        marginTop: 10,
        marginBottom: 10,
        width: 200,
    },
    title: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    },
    warning: {
        color: "#ff2a00",
        textAlign: "center"
    }
});