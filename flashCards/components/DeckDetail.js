import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import DeckItem from './DeckItem'
import { connect } from 'react-redux'
import { deleteDeck } from '../actions/index'
import { removeDeck } from '../utils/api'
import { red, purple, white } from '../utils/colors';


class DeckDetail extends Component{
    static navigationOptions = ({ navigation }) => {
        const { actualDeck } = navigation.state.params
    
       
        return {
          title: actualDeck.title
        }
      }
     delete = () =>{
        const { title } = this.props.navigation.state.params.actualDeck;
        let newState = this.props.state;
        delete newState[title]; 
        this.props.dispatch(deleteDeck(newState))
        removeDeck(title)
        this.props.navigation.navigate(
        'home'
         )
     }
 render(){
   
    const {actualDeck} = this.props.navigation.state.params
    return (
        <View style={styles.container}>
            <View style={{marginBottom:20}}>
                <DeckItem deck={actualDeck} />  
            </View>
            <TouchableOpacity  
            style={styles.button}
            onPress={() => this.props.navigation.navigate(
                          'AddCard',
                          {deck: actualDeck}
                        )}>
                <Text style={styles.textButton}>Add card</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => this.props.navigation.navigate(
                          'Quiz',
                          {deck: actualDeck}
                        )}>
                <Text style={styles.textButton}>Start Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.buttonDelete}
            onPress={this.delete}>
                <Text style={styles.textButton}>Delete Deck</Text>
            </TouchableOpacity>
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
 
 
    button:{
      padding:10,
      backgroundColor:purple,
      height:40,
      borderRadius: 4,
      alignItems: 'center',
      marginBottom:20,
     
    },
    buttonDelete:{
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
  

function mapStateToProps (state) {
    return {
        state
    }
  }

export default connect(mapStateToProps)(DeckDetail)

