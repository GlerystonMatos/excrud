import UsersContext from '../context/UsersContext';
import React, { useContext, useState } from 'react';
import { Input, Button } from 'react-native-elements';
import { View, StyleSheet, Alert } from 'react-native';

export default ({ route, navigation }) => {
    const [user, setUser] = useState(route.params ? route.params : {})
    const { dispatch } = useContext(UsersContext);

    function confirmCancel() {
        Alert.alert('Cancelar', 'Deseja realmente cancelar?', [
            {
                text: 'Sim',
                onPress() {
                    navigation.goBack();
                }
            },
            {
                text: 'Não'
            },
        ])
    }

    return (
        <View style={style.form}>
            <Input
                label='Nome'
                onChangeText={name => setUser({ ...user, name })}
                placeholder='Informe o Nome'
                value={user.name} />
            <Input
                label='Email'
                onChangeText={email => setUser({ ...user, email })}
                placeholder='Informe o Email'
                value={user.email}
                style={style.input} />
            <Input
                label='URL do Avatar'
                onChangeText={avatarUrl => setUser({ ...user, avatarUrl })}
                placeholder='Informe a URL do Avatar'
                value={user.avatarUrl}
                style={style.input} />
            <Button
                title='Salvar'
                buttonStyle={style.buttonSalvar}
                onPress={() => {
                    dispatch({
                        type: user.id ? 'updateUser' : 'createUser',
                        payload: user,
                    });
                    navigation.goBack();
                }} />
            <Button
                title='Cancelar'
                buttonStyle={style.buttonCancelar}
                onPress={() => confirmCancel()} />
        </View>
    )
}

const style = StyleSheet.create({
    form: {
        padding: 10,
    },
    buttonSalvar: {
        backgroundColor: '#F4511E'
    },
    buttonCancelar: {
        marginTop: 5,
        backgroundColor: '#F4511E'
    }
})