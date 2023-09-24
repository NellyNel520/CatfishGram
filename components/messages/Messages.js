import { 
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	Image,
  ScrollView
} from 'react-native'
// import {
//   wrapScrollView,
//   useScrollIntoView,
// } from 'react-native-scroll-into-view';
import React, {  useEffect, useState, } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db, firebase } from '../../firebase'

// Components
import Message from './Message'

// const CustomScrollView = wrapScrollView(ScrollView);


const Messages = ({combinedId, user, currentUser}) => {
  // need chat id
  const [messages, setMessages] = useState([])
 

  useEffect(() => {
    const subscribe = onSnapshot(doc(db, 'chats', combinedId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    // console.log(messages)

    return () => { 
      subscribe
    }
  
  }, [combinedId])

  // no messages yet **add condition to see if there are any messages add styling for no messages yet****
  console.log(messages)


  return (
    <ScrollView style={styles.container}>
      {messages.map((message) => (
				<Message  message={message} key={message.id}  user={user} currentUser={currentUser}/>
			))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '80%',
    padding: 10
  }
})

export default Messages