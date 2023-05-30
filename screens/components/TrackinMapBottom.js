import { View, Text, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import ModelAccept from "./ModelAccept";
import ModelCancel from "./ModelCancel";
import { Divider } from "native-base";

export default function TrackinMapBottom() {
  const costumer_id = useSelector((state) => state.appSlice.costumer_id);
  const name = useSelector((state) => state.appSlice.name);
  const created_at = useSelector((state) => state.appSlice.created_at);
  const adress = useSelector((state) => state.appSlice.adress);
  const city = useSelector((state) => state.appSlice.city);
  const litres = useSelector((state) => state.appSlice.litres);

  return (
    <View className="px-6 py-8 rounded-3xl w-full bg-white">
      <View className="mt-1.5">
        <View className="flex flex-row">
          <Image
            source={{
              uri: `https://xnhwcsmrleizinqhdbdy.supabase.co/storage/v1/object/public/avatars/${costumer_id}/${name}`,
            }}
            className="w-20 h-20 rounded mr-4"
          />

          <View className="flex flex-row">
            <View>
              <View className="p-1 h-4 w-4 border-2 mr-1.5 border-[#00B2EB] rounded-full items-center justify-center">
                <View className="h-2.5 w-2.5 rounded-full bg-[#00B2EB]" />
              </View>
            </View>
            <View className="flex items-start justify-start">
              <Text className="text-[12px] text-gray-600">{created_at}</Text>
              <View>
                <Text className="mr-4 font-bold text-base">{name}</Text>
                <Text className="font-bold">
                  {adress} - {city}
                </Text>
                <Text className="text-gray-500">{litres} L</Text>
              </View>
            </View>
          </View>
        </View>
        <ModelAccept />
      </View>
    </View>
  );
}
