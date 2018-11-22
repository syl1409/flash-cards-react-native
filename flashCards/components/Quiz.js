import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import { gray, red, green, purple, white, lightGray } from '../utils/colors'
import { Entypo } from '@expo/vector-icons'
import {
    clearLocalNotification,
    setLocalNotification
  } from '../utils/helpers'

export default class Quiz extends Component{
  state = {
      currentcard: 0,
      view: 'question',
      score:0,
      finishQuiz:false
  }
  toggleAnswer=()=>{
      if(this.state.view === 'question'){
          this.setState(()=>({
              view:'answer'
          }))
      }else{
        this.setState(()=>({
            view:'question'
        }))
      }
  }
  changeQuestion = () =>{
    const {deck} = this.props.navigation.state.params
    console.log('check', this.state.currentcard, deck.questions.length- 1 )
      if(this.state.currentcard < (deck.questions.length- 1)){
        this.setState((oldState)=>({
            currentcard: oldState.currentcard+1,
            view:'question'
          }))
      }else{
          this.setState(()=>({
            finishQuiz:true
          }))
          clearLocalNotification()
          .then(setLocalNotification)
      
      }
      

  }
  addPoint = () => {
    this.setState((oldState)=>({
            score: oldState.score+1
          }))
    this.changeQuestion()      
  }
  reset = () =>{
      this.setState(()=>({
        currentcard: 0,
        view: 'question',
        score:0,
        finishQuiz:false
      }))

  }
  toDashboard=()=>{
    this.props.navigation.navigate('home')
  }

  toDetails=()=>{
    const {deck} = this.props.navigation.state.params
    this.props.navigation.navigate(
        'DeckDetail',
        {actualDeck: deck})
  }
    render(){
    const {deck} = this.props.navigation.state.params
    const {currentcard, view, finishQuiz} = this.state
        if((deck.questions.length > 0) && !finishQuiz){
            return(
                <View style={styles.container}>
                    <View >
                        <Text style={styles.title}>{currentcard}/{deck.questions.length}</Text>
                    </View>
                    {view === 'question' ? 
                    <View>
                        <View style={styles.card}>
                            <Text style={styles.cardText}>{deck.questions[currentcard].question}</Text>
                        </View>
                        <TouchableOpacity 
                        style={styles.button}
                        onPress={this.toggleAnswer}>
                            <Text style={styles.textButton}>Show answer</Text>
                        </TouchableOpacity>
                    </View>
                    
                    :
                    <View>
                        <View style={styles.card}>
                            <Text style={styles.cardText}>{deck.questions[currentcard].answer}</Text>
                        </View>
                        <TouchableOpacity 
                         style={styles.button}
                        onPress={this.toggleAnswer}>
                            <Text  style={styles.textButton}>Show Question</Text>
                        </TouchableOpacity>
                    </View>
            
                }
                <TouchableOpacity 
                    style={styles.correctButton}
                    onPress={this.addPoint}>
                            <Text  style={styles.textButton}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                     style={styles.inCorrectButton}
                    onPress={this.changeQuestion}>
                            <Text  style={styles.textButton}>Incorrect</Text>
                </TouchableOpacity>
                
                </View>
                
                
            )
        }
        if(finishQuiz){
            const {score}=this.state;
            return(
                <View style={styles.container}>
                    <Text style={styles.title}>Your results!</Text>
                    <Text style={styles.score}>Score: {score}/{deck.questions.length}</Text>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={this.reset}>
                                <Text style={styles.textButton}>Try the test again</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={this.toDetails}>
                                <Text style={styles.textButton}>Go to deck details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={this.toDashboard}>
                                <Text style={styles.textButton}>Go to dashboard</Text>
                    </TouchableOpacity>
                </View>
            )

        }

        return(
            
            <View style={styles.containerSad}>
                <Entypo
                    style={styles.icon}
                    name='emoji-sad'
                    color={lightGray} />
                <Text style={styles.noCards}> Not cards, sorry!</Text>
                <TouchableOpacity  
                style={styles.button}
                onPress={() => this.props.navigation.navigate(
                          'AddCard',
                          {deck: deck}
                        )}>
                    <Text style={styles.textButton}>Add a card</Text>
                </TouchableOpacity>
                
            </View>
        )
       
    }   

    
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10
    }, 
    containerSad:{
        justifyContent: 'center',
        padding:10,
        alignItems: 'center',
        flex:1,
    },
    icon:{ 
        alignItems: 'center',
        fontSize:40,
        marginBottom:10,
        justifyContent: 'center',
    },
    noCards:{
        alignItems: 'center',
        fontSize:20,
        justifyContent: 'center',
        color:gray,
        marginBottom:10
    },
    title:{
      color:gray,
      fontSize:20,
      marginTop:20,
      marginBottom:20,
      alignItems: 'flex-start',
      fontWeight:'bold'
    },
    score:{
        color:gray,
        fontSize:20,
        marginTop:20,
        marginBottom:20,
        alignItems: 'center',
        fontWeight:'bold',
        fontSize:30
      },
    card:{
        paddingTop:50,
        paddingBottom:50,
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: lightGray,
        margin:30,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
       
    },
    cardText:{
        fontSize:40,
        fontWeight:'bold'
    },
    button:{
        padding:10,
        backgroundColor:purple,
        height:40,
        borderRadius: 4,
        alignItems: 'center',
        marginBottom:10
      },
      correctButton:{
        backgroundColor:green,
        padding:10,
        height:40,
        borderRadius: 4,
        alignItems: 'center',
        marginBottom:10
      },
      inCorrectButton:{
        backgroundColor:red,
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

  