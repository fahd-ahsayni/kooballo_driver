import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, TouchableOpacity, ImageBackground } from "react-native";
import { format } from "date-fns";
import { Badge, Spinner, Text } from "native-base";
import { useDispatch } from "react-redux";
import { setChateauDetails } from "../../config/app-slice";
import Icon from "react-native-vector-icons/Ionicons";
import { getDistance } from "../utils";
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
  price,
  driver_accept,
  order_key,
  avatar_url,
}) => {
  const [location, setLocation] = useState(null);
  const [decorationCard, setDecorationCard] = useState("bg-green-500");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleClick = useCallback(() => {
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
        price: price,
        photo: avatar_url,
        created_at: format(new Date(created_at), "h:mm aa"),
        adress: `${chateau_street} N°: ${chateau_house}, ${chateau_quarter}`,
      })
    );
    navigation.navigate("MapScreen");
  }, [
    dispatch,
    navigation,
    order_key,
    driver_accept,
    costumer_id,
    id,
    chateau_city,
    chateau_name,
    chateau_litres,
    chateau_latitude,
    chateau_longitude,
    price,
    created_at,
    chateau_street,
    chateau_house,
    chateau_quarter,
    avatar_url,
  ]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        Alert.alert("Error getting location", error.message);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const { distanceMeters, distance } = useMemo(() => {
    if (location && chateau_latitude && chateau_longitude) {
      var lat1 = location?.coords.latitude;
      var lon1 = location?.coords.longitude;
      var lat2 = chateau_latitude;
      var lon2 = chateau_longitude;
      let distanceCalc = getDistance(lat1, lon1, lat2, lon2);
      return {
        distanceMeters: distanceCalc * 1000,
        distance: distanceCalc,
      };
    }
    return { distanceMeters: null, distance: null };
  }, [location, chateau_latitude, chateau_longitude]);

  useMemo(() => {
    if (distanceMeters) {
      let decoration;
      if (distanceMeters < 3000) {
        decoration = "bg-green-500";
      } else if (distanceMeters < 6000) {
        decoration = "bg-yellow-600";
      } else if (distanceMeters < 9000) {
        decoration = "bg-orange-500";
      } else {
        decoration = "bg-red-500";
      }
      setDecorationCard(decoration);
    }
  }, [distanceMeters]);

  return (
    <>
      <View className="rounded mb-8 overflow-hidden w-full">
        <ImageBackground
          source={{
            uri: avatar_url,
          }}
          className="w-full h-48"
        >
          <View className="absolute w-full h-full inset-0 bg-gray-800/70" />
          <View className="w-full flex-row justify-between items-center p-4">
            <Badge
              className={`${decorationCard} py-2 mb-2 px-4 rounded`}
              alignSelf="center"
              variant="outline"
            >
              <View className="flex-row">
                <Icon
                  name="chevron-forward-circle-outline"
                  size={20}
                  color="#fff"
                />
                {!distance ? (
                  <Spinner color="white" px={4} /> // Spinner from NativeBase
                ) : (
                  <Text className="font-semibold ml-2.5 text-white ">
                    {distance?.toFixed(2)} Km
                  </Text>
                )}
              </View>
            </Badge>
          </View>
          <View className="absolute w-full  inset-x-0 bottom-0 flex items-start justify-between p-4">
            <View>
              <Text className="text-xl text-white font-bold">
                {chateau_name}
              </Text>
              <Text className="text-white font-semibold text-sm">
                {chateau_litres} L
              </Text>
              <Text className="text-white text-sm">
                {`${chateau_street} ${chateau_quarter} N°${chateau_house} • ${chateau_city}`}
              </Text>
              <View className="w-full flex-row justify-between mt-4">
                <Badge className="bg-white rounded">
                  <Text className="px-4 text-sky-600 font-semibold">
                    {" "}
                    {price - price * 0.07} DH
                  </Text>
                </Badge>
                <Text className="text-white mt-4 text-xs text-end">
                  {format(new Date(created_at), "d MMM, yyyy h:mm aa")}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        <TouchableOpacity
          onPress={handleClick}
          className="w-full bg-sky-500 py-2.5 rounded-b"
        >
          <Text className="text-white font-semibold text-center">
            View Order Details
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CardOrder;
