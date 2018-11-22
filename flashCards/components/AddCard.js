import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions/index'
import { addCardDeck } from '../utils/api'
import { gray, purple, lightGray, white } from '../utils/colors'


class AddCard extends Component{

state = {
    question:'',
    answer:'',
}

handleChangeTextQuestion=(input)=>{
    this.setState(()=>({
      question:input
    }))

}
handleChangeTextAnswer=(input)=>{
    this.setState(()=>({
      answer:input
    }))
}

handleSubmit=()=>{

    const {deck} = this.props.navigation.state.params
    this.props.dispatch(addCard(deck.title, this.state))

    deck.questions = deck.questions.concat(this.state)
    console.log('update', deck);
    addCardDeck(deck.title, deck)

    this.props.navigation.navigate(
        'DeckDetail',
        {actualDeck: deck})
    
}
    
 render(){
    const {question, answer} = this.state
    return (
        <View style={styles.container}>
           <KeyboardAvoidingView style={styles.form} keyboardVerticalOffset={65} behavior={"padding"}>           
                <View>
                    <Text style={styles.label}>Question</Text>
                    <TextInput 
                        value={question}
                        style={styles.input}
                        onChangeText={this.handleChangeTextQuestion}/>
                </View>
                <View>
                    <Text style={styles.label}>Answer</Text>
                     <TextInput 
                        value={answer}
                        style={styles.input}
                        onChangeText={this.handleChangeTextAnswer}/>
                </View>
                
                    <TouchableOpacity 
                    style={answer ==='' || question === '' ? styles.disableButton : styles.button}
                    onPress={this.handleSubmit}>
                        <Text style={styles.textButton}>Add card</Text>
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

    form:{
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
  

export default connect ()(AddCard)
