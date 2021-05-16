import UsersContext from '../context/UsersContext';
import React, { useCallback, useContext, useState } from 'react';
import { View, FlatList, Alert, RefreshControl } from 'react-native';
import { ListItem, Avatar, Button, Icon } from 'react-native-elements';

export default props => {
    const { state, dispatch } = useContext(UsersContext);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch({
            type: 'refreshUser',
        })
        setRefreshing(false);
    }, []);

    function confirmUserDeletion(user) {
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: user,
                    })
                }
            },
            {
                text: 'Não'
            },
        ])
    }

    function getUserItem({ item: user }) {
        return (
            <ListItem
                key={user.id}
                bottomDivider
                onPress={() => props.navigation.navigate('UserForm', user)}>
                <Avatar source={{ uri: user.avatarUrl }} />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                <Button
                    type='clear'
                    onPress={() => props.navigation.navigate('UserForm', user)}
                    icon={<Icon name='edit' size={25} color='orange' />} />
                <Button
                    type='clear'
                    onPress={() => confirmUserDeletion(user)}
                    icon={<Icon name='delete' size={25} color='red' />} />
            </ListItem>
        )
    }

    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                renderItem={getUserItem}
                data={state.users}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View>
    )
}