import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login'
import Attendance from './components/Attendance'

export default function App() {
  const [employee, setEmployee] = useState("")

  return (
    <View style={styles.container}>
      {employee === "" && <Login onLogin={setEmployee} />}
      {employee !== "" && <Attendance onLogout={setEmployee}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
