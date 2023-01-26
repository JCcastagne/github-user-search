import { FlatList, ScrollView } from 'react-native'
import { useTheme } from '../../ThemeContext'

import UserCard from '../UserCard'

export default function UserList ({ data, navigation }) {
  const styleVariables = useTheme()
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <UserCard user={item} navigation={navigation} />
      )}
      style={{
        backgroundColor: styleVariables.colors.surfaceVariant,
        borderRadius: 16,
        paddingHorizontal: 16
      }}
    />
  )
}
