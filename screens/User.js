import { useEffect, useState } from 'react'
import { View, Text, Image, SafeAreaView, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { useTheme } from '../ThemeContext'

export default function User ({ route, navigation }) {
  const styleVariables = useTheme()
  const { userId } = route.params
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState(null)

  function handleErrors (error) {
    console.log('User ERROR: ', error)
  }

  async function fetchUserData () {
    setIsLoading(true)
    console.log('userId: ', userId)

    const url = `https://api.github.com/user/${userId}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw Error(response.status)
      }

      const data = await response.json()
      // console.log(data)

      setIsLoading(false)
      if (data.message === 'Not found' || !data.id) {
        console.log('no data found')
      } else {
        setUserData(data)
      }
    } catch (err) {
      setIsLoading(false)
      handleErrors(err)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [userId])

  if (!userData) {
    return <Text>No user</Text>
  }

  return (
    <SafeAreaView
      style={
        (Platform.OS === 'android' ? { paddingTop: 38 } : '',
        {
          backgroundColor: styleVariables.colors.background
        })
      }
    >
      <View>
        <Image
          id='avatar'
          source={{
            uri: userData['avatar_url']
          }}
          style={{ width: 100, height: 100 }}
        />
        <Text>{`Name ${userData?.name}`}</Text>
        <Text>{`Username ${userData?.login}`}</Text>
      </View>
      <Text>{`Bio ${userData?.bio || 'None'}`}</Text>

      <Pressable
        id='following'
        onPress={() => {
          navigation.push('Users', {
            login: userData?.login,
            list: 'following'
          })
        }}
      >
        <Text>{`Following ${userData?.following}`}</Text>
        <MaterialCommunityIcons name='chevron-right' size={24} color='black' />
      </Pressable>

      <Pressable
        id='followers'
        onPress={() => {
          navigation.push('Users', {
            login: userData?.login,
            list: 'followers'
          })
        }}
      >
        <Text>{`Followers ${userData?.followers}`}</Text>
        <MaterialCommunityIcons name='chevron-right' size={24} color='black' />
      </Pressable>
    </SafeAreaView>
  )
}
