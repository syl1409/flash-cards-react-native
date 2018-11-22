import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { lightGray, gray} from '../utils/colors'

export default function DeckItem ({ deck }) {
    const numberCards = deck.questions.length;
  return (
    <View style={{ alignItems: 'center'}}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.subTitle}>cards: {numberCards}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title:{
    color:gray,
    fontSize:20,
    alignItems: 'center',
    fontWeight:'bold'
  },
  subTitle:{
    color:lightGray,
    fontSize:15,
    alignItems: 'center',
  }
})
