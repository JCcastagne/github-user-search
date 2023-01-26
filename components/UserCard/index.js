import { View, Text, Image, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { useTheme } from '../../ThemeContext'

export default function UserCard ({ navigation, user }) {
  const styleVariables = useTheme()
  return (
    <Pressable
      onPress={() => {
        navigation.push('User', { userId: user.id })
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: styleVariables.colors.outlineLight,
        paddingVertical: 16
      }}
    >
      <Image
        id='avatar'
        source={{
          uri: user['avatar_url']
        }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 12
        }}
      />
      <View
        style={{
          justifyContent: 'center',
          paddingHorizontal: 16,
          flex: 1
        }}
      >
        <Text
          id='username'
          style={{
            paddingBottom: 4,
            color: styleVariables.colors.onSurfaceVariant,
            ...styleVariables.fontSizes.titleMedium
          }}
        >
          {user.login}
        </Text>
        <Text
          id='username'
          style={{
            color: styleVariables.colors.onSurfaceVariant,
            ...styleVariables.fontSizes.bodySmall
          }}
        >
          {user.id}
        </Text>
      </View>

      <View>
        <MaterialCommunityIcons
          name='chevron-right'
          size={24}
          color={styleVariables.colors.onSurfaceVariant}
        />
      </View>
    </Pressable>
  )
}
