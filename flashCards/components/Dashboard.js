import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { gray, lightGray } from '../utils/colors'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions/index'
import { fetchDecks } from '../utils/api'
import DeckItem from './DeckItem'
import { AppLoading} from 'expo'



class Dashboard extends Component {
    state = {
        ready: false,
      }
   
    componentDidMount(){
    const {dispatch} = this.props;

      fetchDecks()
      .then((decks)=> {
        console.log(decks);  
        dispatch(receiveDecks(decks))})

    .then(() => this.setState(() => ({ready: true})))
       
    }

    render(){
        console.log('propsDash', this.props.decks)

        const {decks} = this.props;
        const { ready } = this.state

        if (ready === false) {
          return <AppLoading />
        }
        return (
            <View style={styles.container}>
                 <Text  style={styles.title}>Your Decks</Text>
                <ScrollView>
                    {decks.map((deck)=>{
                       return (
                        <TouchableOpacity key={deck.title} style={styles.card}
                        onPress={() => this.props.navigation.navigate(
                          'DeckDetail',
                          {actualDeck: deck}
                        )}>
                       <DeckItem deck={deck}/>
                       </TouchableOpacity>
                       )
                    })}
                </ScrollView>
            </View>
        )
    }
}
function mapStateToProps (state) {
    const decks = Object.values(state)
    console.log('Dashboard', decks);
    return {
        decks
    }
  }

  const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10
    }, 
    title:{
      color:gray,
      fontSize:20,
      margin:20,
      justifyContent: 'center',
    },
    card:{
        padding:10,
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#000000',
        margin:10
    }
  })
export default connect(mapStateToProps)(Dashboard)


