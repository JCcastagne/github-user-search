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
  ActivityIndicator,
  Platform,
  Pressable
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { useTheme } from '../ThemeContext'
import UserList from '../components/UserList'

export default function Home ({ navigation }) {
  const styleVariables = useTheme()
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
      // console.log(data.items[0])

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
    <SafeAreaView
      style={{
        backgroundColor: styleVariables.colors.background
      }}
    >
      <StatusBar />

      <View
        id='search'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          // height: '100%',
          padding: 17,
          paddingBottom: 0
        }}
      >
        <TextInput
          onChangeText={setSearchInput}
          onSubmitEditing={handleSearch}
          value={searchInput}
          placeholder={'Search users'}
          enterKeyHint={'search'}
          returnKeyType={'search'}
          blurOnSubmit={true}
          placeholderTextColor={styleVariables.colors.outline}
          style={{
            width: '100%',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: styleVariables.colors.outlineLight,
            paddingHorizontal: 22,
            paddingVertical: 16,
            marginBottom: 16,
            color: styleVariables.colors.onBackground
            // ...styleVariables.fontSizes.bodyLarge
          }}
        />

        <Pressable
          onPress={handleSearch}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            backgroundColor: styleVariables.colors.tertiaryContainer,
            padding: 17,
            ...styleVariables.fontSizes.bodyLarge
          }}
        >
          <MaterialCommunityIcons
            name='magnify'
            size={24}
            color={styleVariables.onTertiaryContainer}
          />
        </Pressable>
      </View>

      {isLoading && <ActivityIndicator size={'large'} />}

      {searchResults?.length > 0 && (
        <View style={{ padding: 17, paddingTop: 0 }}>
          <Text
            style={{
              marginBottom: 18,
              color: styleVariables.colors.onBackground,
              ...styleVariables.fontSizes.headlineSmall
            }}
          >{`${searchResults.length} results`}</Text>

          <UserList data={searchResults} navigation={navigation} />
        </View>
      )}
    </SafeAreaView>
  )
}
