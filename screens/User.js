import { View, Text } from 'react-native'

export default function User ({ route, navigation }) {
  const params = route.params
  console.log(params)
  return (
    <View>
      <Text>User</Text>
    </View>
  )
}
