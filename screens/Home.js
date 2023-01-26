import React from 'react'
import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native'

export default function Home () {
  const [searchInput, setSearchInput] = useState('Search for a user')

  return (
    <SafeAreaView>
      <StatusBar />
      <Text>Home</Text>

      <TextInput
        onChangeText={setSearchInput}
        value={searchInput}
        enterKeyHint={'search'}
        multiline={'false'}
        style={styles.input}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
})
