import { NavigationContainer, CommonActions } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { ThemeProvider } from './ThemeContext'
import Home from './screens/Home'
import User from './screens/User'
import Users from './screens/Users'

const Stack = createNativeStackNavigator()

function CustomHeader ({ navigation, route }) {
  console.log(route)
  return (
    <View style={{ paddingTop: 44, minHeight: 48, backgroundColor: '#1999' }}>
      {route.name === 'Home' ? (
        <Text>Github user search</Text>
      ) : (
        <MaterialCommunityIcons
          name='arrow-left'
          onPress={() => navigation.dispatch(CommonActions.goBack())}
          size={24}
          color='black'
          style={{ padding: 17 }}
        />
      )}
    </View>
  )
}

export default function App () {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={Home}
            options={{
              headerShadowVisible: false,
              header: props => <CustomHeader {...props} />
            }}
          />
          <Stack.Screen
            name='User'
            component={User}
            options={{
              headerShadowVisible: false,
              header: props => <CustomHeader {...props} />
            }}
          />
          <Stack.Screen
            name='Users'
            component={Users}
            options={{
              headerShadowVisible: false,
              header: props => <CustomHeader {...props} />
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}
