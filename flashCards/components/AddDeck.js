import React, { Component } from 'react'
import { Text,TextInput, StyleSheet, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native'
import { gray, purple, white, lightGray } from '../utils/colors'
import { submitDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions/index'

class AddDeck extends Component {
  state = {
    text: ''
  }
  handleSubmit = () =>{
    const key = this.state.text;
    const entry = {
      title:this.state.text,
      questions:[]
    }

    this.props.dispatch(addDeck({
      
      [key]:entry
    }))
    submitDeck({key, entry})
    

    this.setState(()=>({
      text:''
    }))

    this.props.navigation.navigate(
      'DeckDetail',
      {actualDeck: entry})
  }

  handleChangeText =(input)=>{
    console.log(input)
    this.setState(()=>({
      text:input
    }))
    
  }
 render(){
   const {text} = this.state
   console.log('state', this.state);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add the form to add a new deck</Text>
      <KeyboardAvoidingView style={styles.form} behavior="padding" enabled>
        <Text style={styles.label}>Title of your Deck</Text>
        <TextInput 
          value={text}
          style={styles.input}
          onChangeText={this.handleChangeText}/>
        <TouchableOpacity 
          onPress={this.handleSubmit} 
          disabled={text === ''}
          style={text ==='' ? styles.disableButton : styles.button}
        >
          <Text style={styles.textButton}>Create Deck</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
    </View>
       
  )
 }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    alignItems: 'stretch',
    justifyContent: 'center',

}, 
  title:{
    color:gray,
    fontSize:20,
    margin:20,
    justifyContent: 'center',
  },
  form:{
    padding:20,
    justifyContent: 'center',
    flex:1,

  },
  label:{
    color:gray,
    fontSize:18,
    marginBottom:5,
   
  },
  input:{
  
    height:44,
    padding:8,
    borderWidth:1,
    borderColor:gray,
    marginBottom:20,
    borderRadius: 4,
  },
  button:{
    padding:10,
    backgroundColor:purple,
    height:40,
    borderRadius: 4,
    alignItems: 'center',
  },
  disableButton:{
    backgroundColor:lightGray,
    padding:10,
    height:40,
    borderRadius: 4,
    alignItems: 'center',
  },
  textButton:{
    color:white,
    alignItems: 'center',
    fontSize:18,
    justifyContent: 'center',
  }
})

function mapStateToProps (state) {
  console.log('addDeck', state);

  return {
    state
  }
}

export default connect( mapStateToProps)(AddDeck)