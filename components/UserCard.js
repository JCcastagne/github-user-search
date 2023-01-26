import { View, Text, Image, Pressable } from 'react-native'

export default function UserCard ({ navigation, user }) {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('User')
      }}
    >
      <Image
        id='avatar'
        source={{
          uri: user['avatar_url']
        }}
        style={{ width: 100, height: 100 }}
      />
      <View>
        <Text id='username'>{user.login}</Text>
        <Text id='username'>{user.id}</Text>
      </View>
    </Pressable>
  )
}

// Avatar
// Username
// Name
// Description
// Follower count, i.e. X followers
// Following count, i.e. X following
