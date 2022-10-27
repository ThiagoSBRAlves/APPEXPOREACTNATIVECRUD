import React, { createContext, useReducer, Math } from "react";
import { Text, View, FlatList, Alert} from 'react-native'

import users from "../data/users";


const initialState = {users}
const UserContext = createContext({})



export const UsersProvider = props => {
    
    function reducer(state, action){
        if(action.type === 'deleteUser'){
            const user = action.payload
            return {
                //...state,
                users: state.users.filter(u => u.id !== user.id),
            }
        }
        if(action.type === 'createUser'){
            const user = action.payload
            user.id = users.length + 1
            user.avatarUrl = 'https://gkbzmcahsvowlfjslvnm.supabase.in/storage/v1/object/public/characters/Anko_Mitarashi.webp'
            Alert.alert("Novo usuario cadastrado!")
            return {
                ...state,
                users: [...state.users, user]
            }
        }
        if(action.type === 'updateUser'){
            const update = action.payload
            Alert.alert("Usuario atualizado com sucesso")
            return{
                ...state,
                users: state.users.map(u => u.id === update.id ? update : u)
            }

        }       
        return state
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    return(
        <UserContext.Provider value={{
           state, dispatch
        }}>

            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext