import React, { useContext, useState } from 'react';
import { View, Text, SafeAreaView, Alert, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { color, globalStyle } from '../../utility';
import { Logo, InputField, RoundCornerButton } from "../../component";
import { LOADING_START, LOADING_STOP } from '../../context/actions/type';
import { Store } from '../../context/store';
import { setAsyncStorage, keys } from "../../asyncStorage";
import {
  setUniqueValue,
  keyboardVerticalOffset,
} from "../../utility/constants";
import { LoginRequest } from "../../network";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Login = ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const { email, password } = credentials;

  onLoginPress = () => {

    if (!email) {
      alert("Email is required");
    } else if (!password) {
      alert("Password is required");
    } else {
      dispatchLoaderAction({
        type: LOADING_START,
      });
      LoginRequest(email, password)
        .then((res) => {
          if (!res.additionalUserInfo) {
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
            alert(res);
            return;
          }
          setAsyncStorage(keys.uuid, res.user.uid);
          setUniqueValue(res.user.uid);
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          //setInitialState();
          navigation.replace("Dashboard");
        })
        .catch((err) => {
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert(err);
        });
    }

  }

  const handleOnChange = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value
    });
  };
  return (
    <SafeAreaView style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}>
      <View style={[globalStyle.containerCentered]}>
        <Logo />

      </View>
      <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
        <InputField
          placeholder="Enter email"
          value={email}
          onChangeText={(text) => handleOnChange("email", text)}
        //   onFocus={() => handleFocus()}
        //   onBlur={() => handleBlur()}
        />
        <InputField
          placeholder="Enter password"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => handleOnChange("password", text)}
        //   onFocus={() => handleFocus()}
        //   onBlur={() => handleBlur()}
        />

        <RoundCornerButton title="Login" onPress={() => onLoginPress()} />
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: color.LIGHT_GREEN,
          }}
          onPress={() => {
            //setInitialState();
            navigation.navigate("SignUp");
          }}
        >
          Sign Up
            </Text>
      </View>
    </SafeAreaView>

  );
};

export default Login;