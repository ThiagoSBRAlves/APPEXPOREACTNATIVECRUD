import React, { useContext } from 'react'
import { Text, View, FlatList, Alert } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import users from "../data/users"
import { Button, Icon } from 'react-native-elements'
import { ListItem, Avatar } from "@rneui/themed";
import UserContext from '../context/UserContext'


export default props => {

    const {state, dispatch} = useContext(UserContext)
    function getActions(user){
        <>
            <Button
                onPress={()=> props.navigation.navigate('UserForm', user)}
            />
        </>
    }

    function confirmUserDelete(user){
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
            {
                text:'Sim',
                onPress(){
                    dispatch({
                        type:'deleteUser', 
                        payload: user
                    }),
                    Alert.alert("Usuario: " + user.name + " deletado com sucesso!")

                }
                
            },
            {
                text: 'Não'
            }
        ])
        
    }

    function getUserItem({ item: user}){
        return (

            <ListItem key={user.id} bottomDivider style={{borderColor:'black'}}>
                    <Avatar  source={{uri: user.avatarUrl}}/>
                    <ListItem.Content>
                    
                    <ListItem.Title style={{color: 'black', fontSize:25}}>{user.name}</ListItem.Title>
                    <ListItem.Subtitle style={{color: 'black' , fontSize:16}}>{user.email}</ListItem.Subtitle>
                    
                    <ListItem.ButtonGroup 
                    onPress={()=> confirmUserDelete(user)}
                    buttons={[<Icon name="delete" size={25} color="black"/>]}
                    containerStyle={{ width:30 , marginLeft:280, marginTop: -50  }}
                    ></ListItem.ButtonGroup>   

                    <ListItem.ButtonGroup 
                    onPress={()=> props.navigation.navigate('UserForm' , user)}
                    buttons={[<Icon name="edit" size={25} color="black"/>]}
                    containerStyle={{ width:30 , marginLeft:240, marginTop: -40  }}
                    ></ListItem.ButtonGroup>  

                    </ListItem.Content>
                </ListItem>
   
        )
        
    }

    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
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
            
        
        </View>

    )

}

const screenOptions = {
    headerStyle:{backgroundColor: 'red'},
    headerTintColor: 'red'
}

