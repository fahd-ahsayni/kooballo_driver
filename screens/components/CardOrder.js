import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { Text } from "native-base";
import { useDispatch } from "react-redux";
import { setChateauDetails } from "../../config/app-slice";

const CardOrder = ({
  chateau_id,
  chateau_name,
  chateau_litres,
  chateau_city,
  chateau_house,
  chateau_quarter,
  chateau_street,
  costumer_id,
  created_at,
  chateau_latitude,
  chateau_longitude,
}) => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const URLImage = `https://ddyfjmyqfdmblkhyinby.supabase.co/storage/v1/object/public/avatars/${costumer_id}/${chateau_name}`;

  const handleClick = () => {
    dispatch(
      setChateauDetails({
        id: chateau_id,
        name: chateau_name,
        latitude: chateau_latitude,
        longitude: chateau_longitude,
      })
    );
    navigation.navigate("MapScreen");
  };

  return (
    <View className="w-full justify-center items-center px-4 py-2 space-y-1.5 mt-4 rounded border border-gray-100">
      <Text className="absolute top-3 left-4 bg-gray-800 rounded text-white px-2 py-1">
        {format(new Date(created_at), "h:mm aa")}
      </Text>
      <Image source={{ uri: URLImage }} className="w-24 h-24 rounded-full" />
      <Text fontSize="lg" bold>
        {chateau_name}
      </Text>
      <Text fontSize="sm" bold>
        {chateau_litres} L
      </Text>
      <Text fontSize="sm" color="gray.500">
        {`${chateau_street} ${chateau_quarter} N°${chateau_house}, ${chateau_city} `}
      </Text>
      <View className="flex-row justify-between w-full pt-4">
        <TouchableOpacity
          className="w-full py-3 bg-sky-500 rounded"
          onPress={handleClick}
        >
          <Text className="text-center text-white font-bold">
            Accept this order
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardOrder;
