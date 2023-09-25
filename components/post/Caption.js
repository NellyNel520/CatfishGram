import { View, Text } from 'react-native'
import React from 'react'

const Caption = ({ post }) => {
  return (
    <View style={{ marginTop: 5 }}>
    <Text style={{ color: 'white' }}>
      <Text style={{ fontWeight: '800' }}>{post.user} </Text>
      <Text>{post.caption}</Text>
    </Text>
  </View>
  )
}

export default Caption 