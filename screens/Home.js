import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./Profile";
import HomePage from "./HomePage";
import Icon from "react-native-vector-icons/Ionicons";
import { Text, View } from "react-native";
import Support from "./Support";

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen
  
        name="Orders"
        options={{
          tabBarLabel: () => <></>,
          headerShown: false,
          tabBarIcon: () => (
            <View className="bg-gray-100 rounded-md items-center justify-center px-4 py-2">
              <Icon name="home" color="#0ea5e9" size={20} />
            </View>
          ),
        }}
        component={HomePage}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: () => <></>,
          headerShown: false,
          tabBarIcon: () => (
            <View className="bg-gray-100 rounded-md items-center justify-center px-4 py-2">
              <Icon name="person" color="#0ea5e9" size={20} />
            </View>
          ),
        }}
        component={Profile}
      />
      <Tab.Screen
        name="support"
        options={{
          tabBarLabel: () => <></>,
          headerShown: false,
          tabBarIcon: () => (
            <View className="bg-gray-100 rounded-md items-center justify-center px-4 py-2">
              <Icon name="alert-circle-outline" color="#0ea5e9" size={20} />
            </View>
          ),
        }}
        component={Support}
      />
    </Tab.Navigator>
  );
}
