import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { supabase as supabaseCostumer } from "../supabase/costumer";
import CardOrder from "./components/CardOrder";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function HomePage() {
  const [ordersData, setOrdersData] = useState();
  const online = useSelector((state) => state.appSlice.isActive);
  const id = useSelector((state) => state.appSlice.id);
  const navigation = useNavigation();
  
  const fetchOrders = async () => {
    try {
      const { data, error } = await supabaseCostumer
        .from("orders")
        .select("*");
      if (error) throw error;

      setOrdersData(data);
    } catch (error) {
      console.log("Error fetching orders:", error);
      setOrdersData(null);
    }
  };

  useEffect(() => {

    const setOrderWaiting = async () => {
      const { data, error } = await supabaseCostumer
        .from("orders")
        .update({ waiting: false })
        .eq("id", id);

      if (error) {
        console.log("Error: ", error);
      } else {
        console.log("Successfully set order to waiting");
      }
    };

    // Fetch orders immediately
    fetchOrders();
    setOrderWaiting();
  }, [id]);

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
          <Text className="font-semibold text-white">Reload</Text>
        </TouchableOpacity>
      </View>
      {online ? (
        <ScrollView>
          {ordersData
            ?.filter(
              (order) =>
                order.waiting === false && order.driver_accept === false
            )
            .map((order, key) => (
              <CardOrder {...order} key={key} />
            ))}
        </ScrollView>
      ) : (
        <View>
          <Text className="pt-16 pb-2 font-semibold">You are offline !</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
