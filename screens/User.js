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
          height: '100%',
          backgroundColor: styleVariables.colors.background
        })
      }
    >
      <View style={{ paddingHorizontal: 17 }}>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 8,
            color: styleVariables.colors.onBackground,
            ...styleVariables.fontSizes.displayMedium
          }}
        >
          {userData?.login || 'Username not available'}
        </Text>
        <Image
          id='avatar'
          source={{
            uri: userData['avatar_url']
          }}
          style={{
            width: styleVariables.windowWidth - 34,
            height: styleVariables.windowWidth - 34,
            borderRadius: 57,
            marginBottom: 16
          }}
        />
        <Text
          style={{ marginBottom: 4, ...styleVariables.fontSizes.headlineSmall }}
        >{`${userData?.name || 'No name available'}`}</Text>
      </View>

      <Text
        style={{
          paddingHorizontal: 17,
          marginBottom: 16,
          color: styleVariables.colors.onBackground
        }}
      >
        {userData?.bio || 'No bio available'}
      </Text>

      <View
        id='lists'
        style={{ display: 'flex', flexDirection: 'row', paddingHorizontal: 17 }}
      >
        <Pressable
          id='following'
          onPress={() => {
            navigation.push('Users', {
              login: userData?.login,
              list: 'following'
            })
          }}
          style={{
            borderRadius: 12,
            padding: 12,
            marginRight: 16,
            backgroundColor: styleVariables.colors.tertiaryContainer
          }}
        >
          <MaterialCommunityIcons
            name='account-group'
            size={24}
            color={styleVariables.colors.onTertiaryContainer}
            style={{ marginBottom: 24 }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}
          >
            <Text
              style={{
                color: styleVariables.colors.onTertiaryContainer,
                marginBottom: 4,
                ...styleVariables.fontSizes.titleSmall
              }}
            >
              {`Following ${userData?.following || 'none'}`}
            </Text>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              <Text
                style={{
                  color: styleVariables.colors.onTertiaryContainer,
                  ...styleVariables.fontSizes.bodySmall
                }}
              >
                View
              </Text>
              <MaterialCommunityIcons
                name='chevron-right'
                size={16}
                color={styleVariables.colors.onTertiaryContainer}
              />
            </View>
          </View>
        </Pressable>

        <Pressable
          id='followers'
          onPress={() => {
            navigation.push('Users', {
              login: userData?.login,
              list: 'followers'
            })
          }}
          style={{
            borderRadius: 12,
            padding: 12,
            marginRight: 16,
            backgroundColor: styleVariables.colors.tertiaryContainer
          }}
        >
          <MaterialCommunityIcons
            name='tooltip-account'
            size={24}
            color={styleVariables.colors.onTertiaryContainer}
            style={{ marginBottom: 24 }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}
          >
            <Text
              style={{
                color: styleVariables.colors.onTertiaryContainer,
                marginBottom: 4,
                ...styleVariables.fontSizes.titleSmall
              }}
            >
              {`Followers ${userData?.followers || 'none'}`}
            </Text>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              <Text
                style={{
                  color: styleVariables.colors.onTertiaryContainer,
                  ...styleVariables.fontSizes.bodySmall
                }}
              >
                View
              </Text>
              <MaterialCommunityIcons
                name='chevron-right'
                size={16}
                color={styleVariables.colors.onTertiaryContainer}
              />
            </View>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
