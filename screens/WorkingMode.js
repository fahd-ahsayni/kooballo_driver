import React from "react";
import { Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import SwitchMode from "./components/SwitchMode";
import { View } from "moti";
import one from "../assets/mood.png";
import tow from "../assets/dormir.png";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function WorkingMode() {
  const isActive = useSelector((state) => state.appSlice.isActive);
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex items-center px-8 justify-start h-full bg-white">
      <Text className="my-6 bg-gray-100 py-4 px-8 font-semibold text-center capitalize">
        Ready to accept orders ?
      </Text>
      <Text className="font-semibold leading-6 text-gray-600 mb-20">
        To clarify, means that your entire
        selling process is in place and ready to function smoothly. This
        includes not only listing your products or services for customers to
        see.
      </Text>
      {isActive ? (
        <Image
          className="w-44 h-44 mb-8"
          source={one}
          style={{ resizeMode: "contain" }}
        />
      ) : (
        <Image
          className="w-44 h-44 mb-8"
          source={tow}
          style={{ resizeMode: "contain" }}
        />
      )}

      <View className="flex flex-row items-center justify-center w-full">
        <SwitchMode size={60} />
        <Text
          className={`text-5xl w-1/2 font-bold transition-all tracking-wide ml-8 ${
            isActive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isActive ? "N" : "FF"}
        </Text>
      </View>
      <View className="w-full mt-20">
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="w-full py-3 rounded bg-sky-500"
        >
          <Text className="font-semibold tracking-wide text-center text-white">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
