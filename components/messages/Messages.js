import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	Image,
  ScrollView
} from 'react-native'
import React, {  useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db, firebase } from '../../firebase'
// Components


const Messages = ({combinedId}) => {
  // need chat id
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const subscribe = onSnapshot(doc(db, 'chats', combinedId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      subscribe
    }
  }, [combinedId])

  // no messages yet **add condition to see if there are any messages add styling for no messages yet****
  // console.log(messages)


  return (
    <ScrollView style={styles.container}>
      <Text>Messages</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '80%',
  }
})

export default Messages