import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import SafeArea from "../../../components/layout/SafeArea";
import { IconButton, Searchbar, Text } from "react-native-paper";
import UserContext from "../../../lib/context/user";
import { User } from "../../../lib/entities";
import { viewProfile } from "../../auth/api";
import LoanCard from "../../../components/display/LoanCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  const userContext = useContext(UserContext);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    (async () => {
      const response = await viewProfile(userContext!.token);
      if (response.ok) setUser(response.data as User);
    })();
  });
  return (
    <SafeArea>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 10,
            alignItems: "center",
          }}
        >
          <IconButton icon={"menu"} />
          <Text variant="headlineSmall" style={{ flex: 1 }}>
            Welcome {user?.username} 👋
          </Text>
          <View style={{ flexDirection: "row" }}>
            <IconButton icon={"bell"} />
            <IconButton icon={"account"} />
          </View>
        </View>
        <Text variant="headlineLarge" style={{ padding: 10 }}>
          Get Loans in seconds !
        </Text>
        <LoanCard
          amount="Ksh.20,000"
          type="Monetary loan"
          image={require("./../../../../assets/loan.png")}
        />
        <LoanCard
          amount="Ksh.10,000"
          type="Feeds loan"
          image={require("./../../../../assets/chicken.png")}
        />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            backgroundColor: "indigo",
            position: "absolute",
            padding: 20,
            justifyContent: "center",
            alignItems: "center",
            bottom: 10,
            right: 0,
          }}
        >
          <MaterialCommunityIcons name="plus" size={24} color="white" />
          <Text variant="headlineMedium" style={{ color: "white" }}>
            Apply now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
