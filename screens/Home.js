import React from 'react'
import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator
} from 'react-native'

import UserList from '../components/UserList'

export default function Home ({ navigation }) {
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  function handleErrors (error) {
    console.log('ERROR: ', error)
  }

  async function handleSearch () {
    setIsLoading(true)
    console.log('searchInput: ', searchInput)

    const url = `https://api.github.com/search/users?q=${searchInput}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw Error(response.status)
      }

      const data = await response.json()
      console.log(`Results for ${data.items.length} users`)
      console.log(data.items[0])

      setIsLoading(false)
      if (data['total_count'] === 0) {
        console.log('no data found')
      } else {
        setSearchResults(data.items)
      }
    } catch (err) {
      setIsLoading(false)
      handleErrors(err)
    }
  }

  return (
    <SafeAreaView>
      <View id='search'>
        <StatusBar />

        <Text>Home</Text>

        <TextInput
          onChangeText={setSearchInput}
          value={searchInput}
          placeholder={'Search users'}
          enterKeyHint={'search'}
          multiline={'false'}
          style={styles.input}
        />

        <Button title='Search' onPress={handleSearch} />
      </View>

      {isLoading && <ActivityIndicator size={'large'} />}

      {searchResults?.length > 0 && (
        <View>
          <Text>{`${searchResults.length} results`}</Text>
          <UserList data={searchResults} navigation={navigation} />
        </View>
      )}
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
