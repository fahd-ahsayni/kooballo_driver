import { View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function TrackinMapBottom() {
  return (
    <View className="px-6 py-8 rounded-3xl w-full bg-white">
      <View className="flex flex-row items-center justify-between">
        <View className="mb-4 rounded-md border-gray-100 flex flex-row items-center">
          <Image
            source={{
              uri: "https://xwhkyhdybumciizixiih.supabase.co/storage/v1/object/public/avatars/a6d70a9d-100d-4d25-9eb3-f0b33be5a6d6.jpg",
            }}
            className="w-12 h-12 rounded-full mr-4"
          />
          <View>
            <Text className="mr-4 font-semibold text-gray-800">
              Issa Jeremy Vectore
            </Text>
            <Text className="text-[11px] text-gray-500">
              Total Jobs | 20 orders
            </Text>
          </View>
        </View>
      </View>

      <View className="mt-6">
        {/* First item */}
        <View className="flex flex-row">
          <View>
            <View className="p-1 h-6 w-6 border-2 mr-2.5 border-[#00B2EB] rounded-full items-center justify-center">
              <View className="h-4 w-4 rounded-full bg-[#00B2EB]" />
            </View>
          </View>
          <View className="flex items-start justify-start">
            <Text className="text-[12px] text-gray-600">12:00 AM</Text>
            <View>
              <Text className="text-gray-800 text-base font-bold">
                Street mekka quarter ......
              </Text>
              <Text className="text-gray-500">Laayoune City</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity className="py-3 mt-6 w-full bg-sky-500 rounded">
          <Text className="text-center font-semibold text-white">Order Completed ?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
