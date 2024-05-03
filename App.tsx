import {View, Text, Button, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import socket from './untils/socket';

const App = (): React.JSX.Element => {
  const [first, setfirst] = useState();
  useEffect(() => {
    const socket = io('http://192.168.2.3:3000');

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('message', data => {
      setfirst(data);
      console.log('Received message:', data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TextInput
        value={first}
        style={{width: 100, height: 100, backgroundColor: 'red'}}
        onChangeText={txt => {
          socket.emit('message', txt);
        }}
      />
      <Button color={'red'} title="click" onPress={() => {}} />
      <Text>{first}</Text>
    </View>
  );
};

export default App;
