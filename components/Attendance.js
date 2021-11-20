import React, { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, Button, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

export default function Attendance(props) {
    const [singleFile, setSingleFile] = useState(null);

    const selectFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            setSingleFile(res);
        } catch (err) {
            setSingleFile(null);
            
            if (DocumentPicker.isCancel(err)) {
                alert('Canceled');
            } else {
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    const uploadImage = async () => {
        
        if (singleFile != null) {
            
            const fileToUpload = singleFile;
            const data = new FormData();
            data.append('image', fileToUpload);

            let res = await fetch(
                `http://localhost:5000/api/attendances/employee/${props.onAttend}`,
                {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Content-Type': 'multipart/form-data; ',
                    },
                }
            );
                let responseJson = await res.json();
                if (responseJson.message === 'File uploaded successfully.') {
                    alert('Upload successful');
                }
        } else {
            alert('Please select image first');
        }
    };

    const logoutHandler = () => {
        props.onLogout("")
    }

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>Attendance</Text>
                {singleFile != null ? (
                    <Text>
                        File Name: {singleFile.name ? singleFile.name : ''}
                        {'\n'}
                        Type: {singleFile.type ? singleFile.type : ''}
                        {'\n'}
                        File Size: {singleFile.size ? singleFile.size : ''}
                        {'\n'}
                        URI: {singleFile.uri ? singleFile.uri : ''}
                        {'\n'}
                    </Text>
                ) : null}
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={selectFile}>
                    <Text style={styles.buttonTextStyle}>Select File</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={uploadImage}>
                    <Text style={styles.buttonTextStyle}>Upload File</Text>
                </TouchableOpacity>
            </View>
            <Text onPress={logoutHandler} style={styles.logout}>Logout</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        borderRadius: 30,
        borderColor: "#cccccc"
    },
    title: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        width: 200,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    logout: {
        textAlign: "center",
        marginTop: 10,
        textDecorationLine: 'underline'
    },
});