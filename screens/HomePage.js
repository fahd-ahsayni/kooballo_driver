import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { supabase as supabaseCostumer } from "../supabase/costumer";
import CardOrder from "./components/CardOrder";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { setIsAlreadyAccepted } from "../config/app-slice";
import CardUi from "./components/CardUi";

export default function HomePage() {
  const [ordersData, setOrdersData] = useState();
  const online = useSelector((state) => state.appSlice.isActive);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabaseCostumer.from("orders").select("*");
      if (error) throw error;

      setOrdersData(data);
    } catch (error) {
      console.log("Error fetching orders:", error);
      setOrdersData(null);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRefresh = () => {
    fetchOrders();
  };

  return (
    <SafeAreaView className="px-6 pt-8 flex-1 justify-start -mt-12 items-start bg-white">
      <View className="pt-16 pb-2 flex flex-row items-center justify-between w-full">
        <Text className="font-semibold text-lg">New Orders :</Text>
        <TouchableOpacity
          onPress={() => handleRefresh()}
          className="flex flex-row justify-center bg-sky-500 items-center space-x-2 px-3 py-1.5 rounded"
        >
          <Icon name="reload-circle-outline" size={24} color="#fff" />
          <Text className="font-semibold text-white">
            Click here to refresh
          </Text>
        </TouchableOpacity>
      </View>
      {online ? (
        <ScrollView className="w-full">
          {ordersData?.filter(order => !order.is_complete).map((order, key) => (
            <CardOrder {...order} key={key} />
          ))}
        </ScrollView>
      ) : (
        <View className="w-full h-full justify-center items-center">
          <View className="bg-yellow-400 -mt-52 flex flex-row items-center px-8 w-full py-4 rounded">
            <View className="mr-4">
              <Icon name="power" size={32} />
            </View>
            <View>
              <Text className="text-lg font-semibold">You are offline !</Text>
              <Text className="pb-2 text-gray-800 font-semibold">
                Go online to start accepting orders.
              </Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
