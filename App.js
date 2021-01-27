import React, {useEffect, useState} from 'react';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {SafeAreaView} from "react-native";
import DeviceBox from "./DeviceBox";
import {TouchableOpacity} from "react-native";
import {Input} from 'react-native-elements';

var deviceList = [];

const saveDevices = async () => {
    try {
        await AsyncStorage.setItem('devices', JSON.stringify(deviceList));
    } catch (e) {
        console.log("error: devicelist", id);
    }
}
const readDevices = async () => {
    try {
        let value = await AsyncStorage.getItem('devices');
        if (value !== null) {
            return value;
        }
    } catch (error) {
        return null;
    }
}

function HomeScreen() {
    const [device, setDevice] = useState([]);
    useEffect(() => {
        readDevices().then((value) => {
            var t = JSON.parse(value);
            setDevice(t);
            deviceList = t;
        })

    });
    return (
       <SafeAreaView>
           <Text style={styles.titleText}>Devices</Text>
           {device.map((item, id) =>
               <DeviceBox title={item.title} position={item.position} command={item.command}></DeviceBox>
           )}
       </SafeAreaView>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

function AddDevice() {
    const [name,setName] = useState("");
    const [place,setPlace] = useState("");
    const [btcommand,setCommand] = useState("");

    function addDevice(){
        let device = {title:name,position:place,command:btcommand};
        deviceList.push(device);
        saveDevices();
        console.log(device);
        console.log(deviceList);
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Input
                placeholder="Device"
                style={styles}
                onChangeText={value => setName(value)}
            />
            <Input
                placeholder="Place"
                style={styles}
                onChangeText={value => setPlace(value)}
            />
            <Input
                placeholder="Command"
                style={styles}
                onChangeText={value => setCommand(value)}
            />
            <TouchableOpacity style={styles.addButton} onPress={addDevice}>
                <Text>Add device</Text>
            </TouchableOpacity>
        </View>
    );
}


const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Devices" component={HomeScreen} />
                <Tab.Screen name="Add Device" component={AddDevice} />
                <Tab.Screen name="Connections" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText:{
      textAlign: 'center',
      marginTop: 30,
      fontSize: 20,
  },
  addButton:{
      borderWidth: 1,
      marginLeft:100,
      marginRight:100,
      marginBottom:20,
      marginTop: 20,
      padding: 10,
      backgroundColor: "#c0c0c0",
  },
  center:{
      textAlign: 'center',
  }
});
