import { View, Text, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Box, Button } from "native-base";
import ModelAccept from "./ModelAccept";
import ModelCancel from "./ModelCancel";

export default function TrackinMapBottom() {
  const costumer_id = useSelector((state) => state.appSlice.costumer_id);
  const name = useSelector((state) => state.appSlice.name);
  const created_at = useSelector((state) => state.appSlice.created_at);
  const adress = useSelector((state) => state.appSlice.adress);
  const city = useSelector((state) => state.appSlice.city);
  const litres = useSelector((state) => state.appSlice.litres);

  return (
    <View className="px-6 py-8 rounded-3xl w-full bg-white">
      <View className="flex flex-row items-center justify-between">
        <View className="mb-4 rounded-md border-gray-100 flex flex-row items-center">
          <Image
            source={{
              uri: `https://xnhwcsmrleizinqhdbdy.supabase.co/storage/v1/object/public/avatars/${costumer_id}/${name}`,
            }}
            className="w-16 h-16 rounded-full mr-4"
          />
          <View>
            <Text className="mr-4 font-bold text-base">{name}</Text>
            <Text className="text-base font-semibold text-gray-500">
              {litres} L
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
            <Text className="text-[12px] text-gray-600">{created_at}</Text>
            <View>
              <Text className="text-base font-bold">{adress}</Text>
              <Text className="text-gray-500">{city}</Text>
            </View>
          </View>
        </View>

        <ModelAccept />
        <ModelCancel />
      </View>
    </View>
  );
}
