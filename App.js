import { StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack';
import UserList from './views/UserList.js';
import UserForm from './views/UserForms.js';
import {Button, Icon} from 'react-native-elements';
import { UsersProvider } from './context/UserContext.js';

const Stack = createStackNavigator();
export default function App() {
  return (

      <UsersProvider>
      <NavigationContainer>
        <Stack.Navigator
            initialRouteName="UserList"
            screenOptions={screenOptions}>
            <Stack.Screen
                name="UserList"
                component={UserList}
                options={({navigation}) => {
                    return{
                        title: "Lista de Usuarios",
                        headerRight: () => (
                            <Button
                                onPress={() => navigation.navigate("UserForm")}
                                title=""
                                icon={<Icon name="add" size={25} color="white"/>}
                                >
                            </Button>
                        )
                    }
                }}
            />

            <Stack.Screen
                name="UserForm"
                component={UserForm}
                options={{
                    title:"Formulario de Usuario"
                }}
            />
        </Stack.Navigator>
      </NavigationContainer>
      </UsersProvider>
  );
}

const screenOptions = {
    headerStyle:{backgroundColor: '#46b855'},
    headerTintColor: '#fff'
}


