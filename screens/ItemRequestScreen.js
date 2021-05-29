import React,{Component} from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native';

import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class ItemRequestScreen extends Component{
    constructor(){
        super()
        this.state={
            userid: firebase.auth().currentUser.email,
            itemName: '',
            reasonToRequest:''
        }
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7)
    }

    addRequest=(itemName, reasonToRequest)=>{
        var userid = this.state.userid
        var randomRequestId = this.createUniqueId()
        db.collection('requested_items').add({
            'user_id': userid,
            'item_Name': itemName,
            'reason_to_request': reasonToRequest,
            'request_id': randomRequestId
        })
        this.setState({
            itemName: '',
            reasonToRequest: ''
        })
        return alert('Item Requested Successfully')
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <MyHeader title = 'Request Items'/>
                <KeyboardAvoidingView style={styles.keyBoardStyle}>
                    <TextInput
                    style={styles.formTextInput}
                    placeholder= 'Enter item name'
                    onChangeText= {(text)=>{this.setState({itemName: text})}}
                    value={this.state.itemName}
                    />

                    <TextInput
                    style={[styles.formTextInput, {height: 300}]}
                    placeholder= 'Enter reason'
                    multiline
                    numberOfLines={8}
                    onChangeText= {(text)=>{this.setState({reasonToRequest: text})}}
                    value={this.state.reasonToRequest}
                    />

                    <TouchableOpacity 
                    style={styles.button} 
                    onPress={()=>{this.addRequest(this.state.itemName, this.state.reasonToRequest)}}
                    >
                        <Text>Request</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
     keyBoardStyle : { flex:1, alignItems:'center', justifyContent:'center' }, 
     formTextInput:{ width:"75%", height:35, alignSelf:'center', borderColor:'#ffab91', borderRadius:10, borderWidth:1, marginTop:20, padding:10, }, 
     button:{ width:"75%", height:50, justifyContent:'center', alignItems:'center', borderRadius:10, backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, marginTop:20 }, } )

