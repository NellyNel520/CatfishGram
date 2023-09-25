import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'



const ModalHeader = ({modalVisible, setModalVisible}) => (
  <View style={{marginTop: 10,}}>
    <View style={{ justifyContent: 'center', alignItems: 'center',}}>
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <Image
          source={{
            uri: 'https://img.icons8.com/sf-black/128/horizontal-line.png',
          }}
          style={{ width: 80, height: 40 }}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>Comments</Text>
    </View>
  </View> 
)

const styles = StyleSheet.create({
  headerText: {
		color: 'white',
		fontWeight: 700,
		fontSize: 25,
		marginTop: 10,
	},
})

export default ModalHeader