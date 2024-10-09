import { useState, useContext } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import { AuthContext } from '../../context/authContext';



const LoginScreen = () => {

  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = () => {
    if(email == '' || password == ''){
      setMessage('Please complete all fields');
      setTimeout(()=> setMessage(''), 2000)
    }else{
      login(email, password);
    }
  }

  return (
   <View style={ styles.wrapper}>
      <View
        style={{
          flex: 0,
          backgroundColor: 'transparent',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontWeight: 800,
            fontSize: 42
          }}
        >Remo</Text>
        <Text
          style={{
            fontSize: 14
          }}
        >Remote Worker Handbook</Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: 12
          }}
        >Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}

        />
      </View>
      <View>
        <Text
          style={{
            fontSize: 12
          }}
        >Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
      </View>
      {
        message && <View
          style={{
            marginBottom: 15
          }}
        >
        <Text>{message}</Text>
      </View>
      }
      <TouchableOpacity
        style={styles.myButton}
        onPress={onSubmit}
      >
          <Text style={{
            color: '#fff'
          }}>
            Login
          </Text>
      </TouchableOpacity>
   </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200
  },
  myButton: {
    width: 200,
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  }
})

export default LoginScreen