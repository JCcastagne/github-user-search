import { View, Text, FlatList } from 'react-native'
import UserCard from '../components/UserCard'

export default function Users ({ searchResults }) {
  return (
    <FlatList
      data={searchResults}
      renderItem={({ item }) => <UserCard user={item} />}
    />
  )
}
