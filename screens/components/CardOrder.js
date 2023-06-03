import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { Text } from "native-base";
import { useDispatch } from "react-redux";
import { setChateauDetails } from "../../config/app-slice";

import { getDistance } from "../utils";
import { useEffect } from "react";

import * as Location from "expo-location";

const CardOrder = ({
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
  id,
  driver_accept,
  order_key
}) => {
  const [location, setLocation] = useState(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const URLImage = `https://xnhwcsmrleizinqhdbdy.supabase.co/storage/v1/object/public/avatars/${costumer_id}/${chateau_name}`;

  const handleClick = () => {
    dispatch(
      setChateauDetails({
        orderKey: order_key,
        isAlreadyAccepted: driver_accept,
        costumer_id: costumer_id,
        id: id,
        city: chateau_city,
        name: chateau_name,
        litres: chateau_litres,
        latitude: chateau_latitude,
        longitude: chateau_longitude,
        created_at: format(new Date(created_at), "h:mm aa"),
        adress: `${chateau_street} N°: ${chateau_house}, ${chateau_quarter}`,
      })
    );
    navigation.navigate("MapScreen");
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (location) {
    var lat1 = location?.coords.latitude;
    var lon1 = location?.coords.longitude;

    // Marker location
    var lat2 = chateau_latitude;
    var lon2 = chateau_longitude;

    // Calculate the distance
    var distance = getDistance(lat1, lon1, lat2, lon2);
    var distanceMeters = distance * 1000;
  }

  const decorationCard =
    distanceMeters < 3000
      ? "bg-green-500"
      : distanceMeters < 6000
      ? "bg-yellow-600"
      : distanceMeters < 6000
      ? "bg-orange-500"
      : "bg-red-500";

  return (
    <View className="mt-4">
      <Image className="w-full h-52 rounded-lg" source={{ uri: URLImage }} />
      <View className="relative px-4 mb-8 -mt-32">
        <View className="w-full justify-center items-center">
          <Text
            className={`${decorationCard} mb-2 w-1/3 py-1 text-center font-bold text-white rounded`}
          >
            {distance?.toFixed(2)} Km
          </Text>
        </View>
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
          className="bg-white px-4 py-3 rounded-lg"
        >
          <View className="flex">
            <Text className="text-gray-600 uppercase text-[12px] font-semibold tracking-wider">
              {`${chateau_street} ${chateau_quarter} N°${chateau_house} • ${chateau_city}`}
            </Text>
          </View>
          <Text className="mt-1 font-semibold uppercase leading-tight truncate">
            {chateau_name}
          </Text>
          <View className="mt-1">
            <Text>
              {chateau_litres}
              <Text className="text-gray-600 text-sm"> L</Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleClick}
            className="w-full bg-sky-500 py-2.5 rounded mt-3"
          >
            <Text className="text-white font-semibold text-center">
              View Order Details
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CardOrder;
