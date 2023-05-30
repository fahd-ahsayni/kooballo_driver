import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HStack, Heading, Spinner, useNativeBase } from "native-base";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import TankImage from "../assets/tank.png";
import TruckImage from "../assets/truck.png";
import TrackinMapBottom from "./components/TrackinMapBottom";
import { getRoute, decode } from "./utils";
import { useCallback } from "react";
import { setIsAlreadyAccepted } from "../config/app-slice";
import { useNavigation } from "@react-navigation/native";

const LOCATION_GRANTED = "granted";
const MAP_TYPE = "roadmap";

const MapScreen = () => {

  const navigation = useNavigation();

  const [location, setLocation] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [anotherLocation, setAnotherLocation] = useState({});

  const chateau_name = useSelector((state) => state.appSlice.name);
  const chateau_latitude = useSelector((state) => state.appSlice.latitude);
  const chateau_longitude = useSelector((state) => state.appSlice.longitude);


  const fetchLocation = useCallback(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== LOCATION_GRANTED) {
      console.error("Location permission not granted");
      return;
    }

    try {
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      fetchLocation();
    }, 500);
    return () => clearInterval(timer);
  }, [fetchLocation]);

  useEffect(() => {
    setAnotherLocation({
      latitude: parseFloat(chateau_latitude),
      longitude: parseFloat(chateau_longitude),
    });
  }, [chateau_latitude, chateau_longitude]);

  useEffect(() => {
    if (location && anotherLocation) {
      getRoute(location.coords, anotherLocation)
        .then((route) => setCoordinates(route))
        .catch((err) => console.error(err));
    }
  }, [location, anotherLocation]);

  return (
    <View style={{ flex: 1 }}>
      {location ? (
        <>
          <MapView
          className="-mb-12"
            style={{ flex: 1 }}
            mapType={MAP_TYPE}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Thats You !"
            >
              <Image source={TruckImage} style={{ width: 35, height: 35 }} />
            </Marker>

            <Marker coordinate={anotherLocation} title={chateau_name}>
              <Image source={TankImage} style={{ width: 35, height: 35 }} />
            </Marker>

            {coordinates.length > 0 && (
              <Polyline
                coordinates={coordinates}
                strokeWidth={7}
                strokeColor="#0ea5e9"
              />
            )}
          </MapView>
          <TrackinMapBottom />
        </>
      ) : (
        <HStack
          space={2}
          className="flex-1 bg-white"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner size="lg" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      )}
    </View>
  );
};

export default MapScreen;
