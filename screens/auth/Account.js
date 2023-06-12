import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WorkingMode from "../WorkingMode";
import Home from "../Home";
import MapScreen from "../MapScreen";

import Icon from "react-native-vector-icons/Ionicons";
import SwitchMode from "../components/SwitchMode";
import { Text, View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import AcceptOrder from "../AcceptOrder";
import { Image } from "native-base";
import Logo from "../../assets/adaptive-icon.png";

const Stack = createNativeStackNavigator();

export default function Acoount() {
  const online = useSelector((state) => state.appSlice.isActive);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="WorkingMode"
          options={() => ({
            headerShown: false,
          })}
          component={WorkingMode}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerShadowVisible: false,
            headerTitle: "",
            headerLeft: () => (
              <Image source={Logo} alt="Kooballo" className="w-32 h-12" />
            ),

            headerRight: () => (
              <View className="flex-row justify-around">
                <SwitchMode size={24} />
                <Text
                  className={`${
                    online ? "text-[#22c55e]" : "text-[#ef4444]"
                  } font-bold text-base`}
                >
                  {online ? "ON" : "OFF"}
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="AcceptOrder"
          component={AcceptOrder}
          options={({ navigation }) => ({
            headerShadowVisible: false,
            headerTitle: "",
            headerLeft: () => (
              <View className="flex-1 justify-center items-center mr-5">
                <Text className="text-gray-800 text-lg font-semibold">
                  Are you ready ?
                </Text>
              </View>
            ),
            headerRight: () => (
              <View className="flex-1 justify-center items-start ml-5">
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  className="px-4 py-2 rounded"
                >
                  <Icon name="chevron-back-outline" size={24} color="#00B2EB" />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={({ navigation }) => ({
            headerShadowVisible: false,
            headerTitle: "",
            headerLeft: () => (
              <View className="flex-1 justify-center items-center mr-5">
                <Text className="text-gray-800 text-lg font-semibold">
                  Tracking Your Order
                </Text>
              </View>
            ),
            headerRight: () => <></>,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
