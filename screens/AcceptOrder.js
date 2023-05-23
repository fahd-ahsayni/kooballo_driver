import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function AcceptOrder() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white justify-center items-center px-6">
      <Text className="font-semibold text-base">
        Do you want to continue accepting orders?
      </Text>
      <View className="w-full">
        <TouchableOpacity
          className="w-full rounded mt-8 bg-sky-500"
          onPress={() => navigation.navigate("MapScreen")}
        >
          <Text className="text-center font-semibold text-white py-3">
            Click to confirm
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full rounded mt-4 bg-gray-100"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-center font-semibold text-gray-500 py-3">
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
