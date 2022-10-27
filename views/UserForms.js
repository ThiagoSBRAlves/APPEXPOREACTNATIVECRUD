import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, Image, Button, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { ListItem, Avatar  } from "@rneui/themed";
import UserContext from '../context/UserContext';

export default ({route, navigation}) => {
    const [user, setUser] = useState(route.params ? route.params : {})
    const {dispatch} = useContext(UserContext)
    return (
        
        <View style={{padding:12}}>
            

            <Image 
            style={{width: '50%', height: '50%', marginLeft:100, borderRadius:50}}
            source={{uri:user.avatarUrl}}/>
            <Text>Nome</Text>
           
            <TextInput
                style={{ 
                    height: 40,
                    color: 'black',
                    borderWidth:1,
                    marginBottom: 10,
                    paddingLeft: 5
                }}
                onChangeText={name => setUser({...user, name})}
                placeholder="Informe o Nome"
                value={user.name}
            />

        <Text>Email</Text>
            <TextInput
                style={{ 
                    height: 40,
                    color: 'black',
                    borderWidth:1,
                    marginBottom: 10,
                    paddingLeft: 5
                }}
                onChangeText={email => setUser({...user, email})}
                placeholder="Informe o Email"
                value={user.email}
            />

            <Button
                title='Salvar'
                onPress={()=>{
                    dispatch({
                        type: user.id ? 'updateUser' : 'createUser',
                        payload:user, 
                    })
                   
                    navigation.goBack()

                    if(dispatch.type === 'update'){
                        Alert.alert("Usuario atualizado com sucesso")
                    }
                    if(dispatch.type === 'createUser'){
                        Alert.alert("Novo usuario cadastrado!")
                    }


                }}  
            ></Button>
        </View>

        
    )
}
