import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, SafeAreaView} from 'react-native';

class DeviceBox extends Component {
    render() {
        const{title, position, color, command} = this.props;
        return(
            <TouchableOpacity style={[styles.quizBox, {backgroundColor: color}]}>
                <Text style={styles.titleStile}>{title}</Text>
                <Text style={styles.positionStyle}>{position}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    quizBox: {
        borderWidth: 1,
        marginLeft:20,
        marginRight:20,
        marginBottom:5,
        marginTop: 20,
        padding: 10,
    },
    titleStile: {
        fontSize: 25,
        textAlign: 'center',
    },
    positionStyle:{
        textAlign: 'center',
    }


});

export default DeviceBox;
