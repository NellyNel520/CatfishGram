import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { firebase, db } from '../../firebase'

const Message = ({ message, user, currentUser }) => {
	const [isOwner, setIsOwner] = useState(false)

	//
	useEffect(() => {
		// const checkSender = () => {
		// 	if (message.senderId === firebase.auth().currentUser.email) {
		// 		setIsOwner(true)
		// 	} else {
		// 		setIsOwner(false)
		// 	}
		// }
		// checkSender()

		if (message.senderId === currentUser.email) {
			setIsOwner(true)
		} else {
			setIsOwner(false)
		}
	}, [message])

	const Message = () => (
		<View style={styles.message}>
			<View style={{ marginHorizontal: 10, display: 'flex' }}>
				<Image
					source={{ uri: user.profile_picture }}
					style={{ width: 40, height: 40, borderRadius: 50 }}
				/>
				{/* replace with time stamp (time ago?) */}
				<Text style={{ color: 'white', fontWeight: 300 }}>Just now</Text>
			</View>

			{/* message content */}
			<View style={styles.messageContainer}>
				<Text style={styles.messageText}>{message.text}</Text>
				{/* if image  */}
				{message.image && (
					<Image source={{ uri: message.image }} style={styles.image} />
				)}
			</View>
		</View>
	)

	const OwnerMessage = () => (
		<View style={styles.owner}>
			{/* message info */}
			<View style={{ marginHorizontal: 10, display: 'flex' }}>
				<Image
					source={{ uri: currentUser.profile_picture }}
					style={{ width: 40, height: 40, borderRadius: 50 }}
				/>
				{/* replace with time stamp (time ago?) */}
				<Text style={{ color: 'white', fontWeight: 300 }}>Just now</Text>
			</View>

			{/* message content */}
			<View style={styles.ownerMessageContainer}>
				<Text style={styles.messageText}>{message.text}</Text>
				{/* if image  */}
				{message.image && (
					<Image source={{ uri: message.image }} style={styles.image} />
				)}
			</View>
		</View>
	)

	return (
		<View>
			{isOwner  ? <OwnerMessage /> : <Message />}
		</View>
	)
}

const styles = StyleSheet.create({
	message: {
		display: 'flex',
		gap: 20,
		marginBottom: 20,
		flexDirection: 'row',
	},
	owner: {
		flexDirection: 'row-reverse',
		display: 'flex',
		gap: 20,
		marginBottom: 20,
	},

	messageText: {
		paddingHorizontal: 10,
		paddingVertical: 20,
	},
	messageContainer: {
		borderWidth: 2,
		backgroundColor: 'white',
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		borderTopLeftRadius: 20,
	},
	ownerMessageContainer: {
		borderWidth: 2,
		backgroundColor: '#8da4f1',
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		borderTopLeftRadius: 20,
	},
	image: {
		width: '50%',
	},
})

export default Message
