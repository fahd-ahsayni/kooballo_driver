import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { supabase as supabaseCostumer } from "../supabase/costumer";
import CardOrder from "./components/CardOrder";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import Profile from "./Profile";


export default function HomePage() {
  const [ordersData, setOrdersData] = useState();

  const online = useSelector((state) => state.appSlice.isActive);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabaseCostumer
          .from("orders")
          .select("*");
        if (error) throw error;

        setOrdersData(data);
      } catch (error) {
        console.log("Error fetching chateaus:", error);
        setOrdersData(null);
      }
    };

    fetchOrders();
  }, [online]);

  return (
    <SafeAreaView className="px-6 pt-8 flex-1 justify-start -mt-12 items-start bg-white">
      <Text className="pt-16 pb-2 font-semibold text-lg">New Orders :</Text>
      {online ? (
        <ScrollView>
          {ordersData?.map((order, key) => (
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
