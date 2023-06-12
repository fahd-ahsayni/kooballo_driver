import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./Profile";
import HomePage from "./HomePage";
import Icon from "react-native-vector-icons/Ionicons";
import {View } from "react-native";
import Support from "./Support";

const Tab = createBottomTabNavigator();

export default function Home() {

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Orders"
        component={HomePage}
        options={{
          tabBarLabel: () => <></>,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className={`${focused && "bg-gray-100"} rounded-md items-center justify-center px-4 py-2`}>
              <Icon name="home" color={focused ? "#0ea5e9" : "#A9A9A9"} size={20} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: () => <></>,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className={`${focused && "bg-gray-100"} rounded-md items-center justify-center px-4 py-2`}>
              <Icon name="person" color={focused ? "#0ea5e9" : "#A9A9A9"} size={20} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Support"
        component={Support}
        options={{
          tabBarLabel: () => <></>,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className={`${focused && "bg-gray-100"} rounded-md items-center justify-center px-4 py-2`}>
              <Icon name="alert-circle-outline" color={focused ? "#0ea5e9" : "#A9A9A9"} size={20} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
