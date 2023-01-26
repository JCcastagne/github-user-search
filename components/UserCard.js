import { View, Text } from 'react-native'

export default function UserCard ({ user }) {
  return (
    <View>
      <Text>{user.login}</Text>
    </View>
  )
}
