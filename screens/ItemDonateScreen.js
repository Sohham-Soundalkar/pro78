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
    FlatList,
    ScrollView} from 'react-native';

import db from '../config';
import firebase from 'firebase';
import {ListItem} from 'react-native-elements';
import MyHeader from '../components/MyHeader';

export default class ItemDonateScreen extends Component{
    constructor(){
        super()
        this.state={
            requestedItemsList: []
        }
        this.requestRef = null
    }
    getRequestedItemList=()=>{
        this.requestRef = db.collection('requested_items')
        .onSnapshot((snapshot)=>{
            var requestedItemList = snapshot.docs.map(document=>document.data())
            this.setState({
                requestedItemList: requestedItemList
            })
        })
    }
    componentDidMount(){
        this.getRequestedItemList()
    }
    componentWillUnmount(){
        this.requestRef()
    }
    keyExtractor=(item, index)=>index.toString()
    renderItem=({item,i})=>{
        return(
            <ListItem
            key={i}
            title={item.item_Name}
            subtitle={item.reason_to_request}
            titleStyle={{color:'black', fontWeight: 'bold'}}
            rightElement={
                <TouchableOpacity style={styles.button}>
                    <Text style={{color: 'white'}}>View</Text>
                </TouchableOpacity>
            }
            bottomDivider
            />
        )
    }
    render(){
        return(
            <View style={{flex: 1}}>
                <MyHeader title = 'Donate Items'/>
                 <View style={{flex: 1}}>
                     {
                         this.state.requestedItemList.length===0
                         ?(
                             <View style={styles.subContainer}>
                                 <Text style={{fontSize: 20}}>
                                     List of All Requested Items
                                 </Text>
                             </View>    
                         )
                         :(
                             <FlatList
                             data={this.state.requestedItemList}
                             keyExtractor={this.keyExtractor}
                             renderItem={this.renderItem}
                             />
                         )
                     }
                 </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({ 
    subContainer:{ flex:1, fontSize: 20, justifyContent:'center', alignItems:'center' }, 
    button:{ width:100, height:30, justifyContent:'center', alignItems:'center', backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8 } } })
