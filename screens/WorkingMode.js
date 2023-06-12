import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button, VStack, View } from "native-base";
import { Image } from "react-native";
import one from "../assets/mood.png";
import tow from "../assets/dormir.png";
import SwitchMode from "./components/SwitchMode";

export default function WorkingMode() {
  const isActive = useSelector((state) => state.appSlice.isActive);
  const navigation = useNavigation();

  return (
    <SafeAreaView className="h-full flex-1 bg-white p-4 items-center justify-center">
      <VStack space={6} alignItems="center">
        <Text fontSize="xl" fontWeight="semibold">
          Ready to accept orders ?
        </Text>
        <Text fontSize="sm" color="gray.500" textAlign="center">
          To clarify, means that your entire selling process is in place and
          ready to function smoothly. This includes not only listing your
          products or services for customers to see.
        </Text>
        <Image
          alt="Mood Image"
          source={isActive ? one : tow}
          className="h-40"
          style={{ resizeMode: "contain" }}
        />
        <View className="flex flex-row items-center justify-center w-full">
          <SwitchMode size={50} />
          <Text
            className={`text-5xl w-1/2 font-bold mt-2.5 transition-all tracking-wide ml-6 ${
              isActive ? "text-green-500" : "text-red-500"
            }`}
          >
            {isActive ? "N" : "FF"}
          </Text>
        </View>
        <Button
          onPress={() => navigation.navigate("Home")}
          mt={6}
          justifyContent="center"
          alignItems="center"
          className="bg-sky-500"
        >
          <Text color="white" fontWeight="semibold" className="px-12" >
            Let's Go
          </Text>
        </Button>
      </VStack>
    </SafeAreaView>
  );
}
