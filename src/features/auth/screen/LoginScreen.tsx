import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import SafeArea from "../../../components/layout/SafeArea";
import Logo from "../../../components/display/Logo";
import Form from "../../../components/form/Form";
import { LoginSchema } from "../schema";
import { FormSubmitButton, FormTextInput } from "../../../components/input";
import LinkedText from "../widgets/LinkedText";
import { login } from "../api";
import UserContext from "../../../lib/context/user";
import { AuthRoutNames } from "../navigation/route";

const LoginScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const userContext = useContext(UserContext);
  const handleLogin = async (
    values: any,
    { setFieldError }: { setFieldError: any }
  ) => {
    setLoading(true);
    const response = await login(values);

    setLoading(false);
    if (!response.ok) {
      if (response.problem === "CLIENT_ERROR") {
        for (const key in response.data as any) {
          const element = (response.data as any)[key];
          setFieldError(key, element);
        }
        return console.log("LoginScreen: ", response.problem, response.data);
      }
    } else {
      userContext?.setToken?.((response.data as any).token);
    }
  };
  return (
    <SafeArea>
      <View style={styles.container}>
        <View style={{ flex: 1 }} />
        <Logo />
        <View style={styles.form}>
          <Form
            validationSchema={LoginSchema}
            initialValue={{ username: "", password: "" }}
            onSubmit={handleLogin}
          >
            <FormTextInput
              name="username"
              label="Username"
              prefixIcon="account"
            />
            <FormTextInput
              name="password"
              label="Password"
              prefixIcon="lock"
              password
            />
            <View style={{ marginTop: 20 }}>
              <FormSubmitButton title="Login" loading={loading} />
            </View>
            <LinkedText
              unlinked="Dont have an account? "
              linkedText="Sign up"
              onPress={() => navigation.navigate(AuthRoutNames.REGISTER_SCREEN)}
            />
          </Form>
        </View>
        <View style={{ flex: 1 }} />
      </View>
    </SafeArea>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  form: {
    padding: 20,
    width: "100%",
  },
});
