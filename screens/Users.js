import { useState, useEffect } from 'react'
import {
  SafeAreaView,
  Platform,
  View,
  Text,
  ActivityIndicator
} from 'react-native'

import { useTheme } from '../ThemeContext'

import UserList from '../components/UserList'

export default function Users ({ route, navigation }) {
  const styleVariables = useTheme()
  const { login, list } = route.params
  const [isLoading, setIsLoading] = useState(false)
  const [followList, setFollowList] = useState(null)

  function handleErrors (error) {
    console.log('Users ERROR: ', error)
  }

  async function fetchFollowList () {
    setIsLoading(true)
    console.log('login: ', login)
    console.log('list: ', list)

    const url = `https://api.github.com/users/${login}/${list}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw Error(response.status)
      }

      const data = await response.json()
      console.log(data)

      setIsLoading(false)
      if (data.message === 'Not found') {
        console.log('no data found')
      } else {
        setFollowList(data)
      }
    } catch (err) {
      setIsLoading(false)
      handleErrors(err)
    }
  }

  useEffect(() => {
    fetchFollowList()
  }, [login])

  return (
    <SafeAreaView
      style={
        (Platform.OS === 'android' ? { paddingTop: 38 } : '',
        { backgroundColor: styleVariables.colors.background })
      }
    >
      {isLoading && <ActivityIndicator size={'large'} />}
      {followList?.length > 0 && (
        <View>
          <Text>{`${followList.length} results`}</Text>
          <UserList data={followList} navigation={navigation} />
        </View>
      )}
    </SafeAreaView>
  )
}
