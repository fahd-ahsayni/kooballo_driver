import { View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import * as Linking from "expo-linking";

export default function Support() {

  return (
    <View className="flex-1 bg-white px-8 justify-start pt-12 items-center">
      <Text className="mb-8 text-center text-gray-800 text-lg font-semibold">
        For any information or reclamation please contact the Kooballo customer
        relations center at.
      </Text>
      <Icon name="alarm-outline" color="#00B2EB" size={76} />
      <View className="border mt-8 rounded-xl border-[#00B2EB] py-2.5 w-full">
        <Text className="font-semibold text-xl text-center mb-2.5">
          Monday - saturday
        </Text>
        <Text className="font-semibold text-center text-3xl mb-2.5">
          10:00 - 19:00
        </Text>
      </View>
      <TouchableOpacity
        onPress={()=>{Linking.openURL('tel:0808657569');}}
        className="py-4 mt-12 flex flex-row items-center space-x-2 justify-center bg-[#00B2EB] w-full rounded-xl"
      >
        <Icon name="call" color="#fff" size={20} />
        <Text className="text-white text-center font-bold uppercase">Call Us</Text>
      </TouchableOpacity>
      <TouchableOpacity
         onPress={()=>{Linking.openURL('https://wa.me/212808657569');}}
        className="py-4 mt-4 flex flex-row items-center space-x-2 justify-center bg-green-500 w-full rounded-xl"
      >
        <Icon name="logo-whatsapp" color="#fff" size={20} />
        <Text className="text-white text-center font-bold uppercase">Whatsapp</Text>
      </TouchableOpacity>
    </View>
  );
}
