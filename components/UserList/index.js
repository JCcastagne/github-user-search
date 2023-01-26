import { FlatList } from 'react-native'

import UserCard from '../UserCard'

export default function UserList ({ data, navigation }) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <UserCard user={item} navigation={navigation} />
      )}
    />
  )
}
