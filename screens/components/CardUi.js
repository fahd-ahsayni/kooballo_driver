import React from "react";
import { View, Text, Image } from "react-native";
import Test from "../../assets/test.jpg";

export default function CardUi() {
  return (
    <View classNam="mt-4">
      <Image
        className="w-full h-52 rounded-lg shadow-md"
        source={Test}
        alt="random image"
      />
      <View className="relative px-4 mb-8 -mt-16">
        <View
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
          }}
          className="bg-white p-6 rounded-lg"
        >
          <View className="flex items-baseline">
            <Text className="bg-teal-200 text-teal-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
              New
            </Text>
            <Text className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
              2 baths • 3 rooms
            </Text>
          </View>
          <Text className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
            A random Title
          </Text>
          <View className="mt-1">
            <Text>
              $1800
              <Text className="text-gray-600 text-sm">/wk</Text>
            </Text>
          </View>
          <View className="mt-4">
            <Text className="text-teal-600 text-md font-semibold">
              4/5 ratings
            </Text>
            <Text className="text-sm text-gray-600">
              (based on 234 ratings)
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
