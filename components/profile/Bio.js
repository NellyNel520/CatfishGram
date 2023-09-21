import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase, db } from '../../firebase'

const Bio = ({ user }) => {
	const bio = user.bio

	return (
		<View style={{ marginTop: 10, marginHorizontal: 10 }}>
			{/* Name */}
			<Text style={{ color: 'white', fontSize: 20, fontWeight: 600 }}>
				{user.name}
			</Text>
			{/* Bio / about section max character limit 150 copy from caption section in post upload to update/ add bio form field*/}
			{bio ? (
				<Text
					style={{
						color: 'white',
						marginTop: 5,
						fontSize: 16,
						fontWeight: 500,
					}}
				>
					{bio}
				</Text>
			) : null}
		</View>
	)
}

export default Bio
