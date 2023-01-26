import { View, Text, FlatList } from 'react-native'
import UserCard from '../components/UserCard'

export default function Users ({ navigation, searchResults }) {
  return (
    <View>
      <Text>{`${searchResults.length} results`}</Text>
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <UserCard user={item} navigation={navigation} />
        )}
      />
    </View>
  )
}
