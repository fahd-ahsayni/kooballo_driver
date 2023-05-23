import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { useSelector } from "react-redux";
import { HStack, Heading, Spinner } from "native-base";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import TankImage from "../assets/tank.png";
import TruckImage from "../assets/truck.png";
import TrackinMapBottom from "./components/TrackinMapBottom";

function decode(polyline) {
  let index = 0,
    len = polyline.length;
  let lat = 0,
    lng = 0;
  let coordinates = [];
  let shift = 0,
    result = 0,
    byte = null,
    latitude_change,
    longitude_change;
  let factor = Math.pow(10, 5);

  while (index < len) {
    byte = null;
    shift = 0;
    result = 0;
    do {
      byte = polyline.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    latitude_change = result & 1 ? ~(result >> 1) : result >> 1;
    shift = result = 0;

    do {
      byte = polyline.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    longitude_change = result & 1 ? ~(result >> 1) : result >> 1;

    lat += latitude_change;
    lng += longitude_change;

    coordinates.push({ latitude: lat / factor, longitude: lng / factor });
  }
  return coordinates;
}

const getRoute = async (origin, destination) => {
  const GOOGLE_API_KEY = "AIzaSyA8M1SPxF0jSKATM2nh3intjBFqhNVgz-8";
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_API_KEY}`
  );

  const data = await response.json();

  if (data.routes.length) {
    return decode(data.routes[0].overview_polyline.points);
  }
  return null;
};

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [anotherLocation, setAnotherLocation] = useState({});

  const chateau_name = useSelector((state) => state.appSlice.name);
  const chateau_id = useSelector((state) => state.appSlice.id);
  const chateau_latitude = useSelector((state) => state.appSlice.latitude);
  const chateau_longitude = useSelector((state) => state.appSlice.longitude);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Location permission not granted");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

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

  const [ordersData, setOrdersData] = useState();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabaseCostumer
          .from("chateau")
          .select("*")
          .eq("id", chateau_id)
          .single();
        if (error) throw error;

        setOrdersData(data);
      } catch (error) {
        console.log("Error fetching chateaus:", error);
        setOrdersData(null);
      }
    };

    fetchOrders();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {location ? (
        <>
          <MapView
            style={{ flex: 1 }}
            mapType="roadmap"
            pitchEnabled={true}
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
          <TrackinMapBottom costumer_id={ordersData?.costumer_id} chateau_name={ordersData?.name}/>
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
