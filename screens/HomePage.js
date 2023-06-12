import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import { supabase as supabaseCostumer } from "../supabase/costumer";
import CardOrder from "./components/CardOrder";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Spinner, VStack, Center, Text, View, Button } from "native-base";
import { useFocusEffect } from "@react-navigation/native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  screen: {
    flex: 1,
  },
});

const LoadingView = () => (
  <View style={styles.screen}>
    <Center flex={1}>
      <Spinner color="#0ea5e9" size="lg" />
    </Center>
  </View>
);

const EmptyView = ({ onRefresh }) => (
  <View style={styles.screen}>
    <Center flex={1}>
      <Text fontSize="lg" color="gray.600">
        No orders at the moment.
      </Text>
      <Button
        className="bg-sky-500 mt-4"
        _text={{ fontWeight: "semibold" }}
        onPress={onRefresh}
      >
        Refresh
      </Button>
    </Center>
  </View>
);

export default function HomePage() {
  const [ordersData, setOrdersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const online = useSelector((state) => state.appSlice.isActive);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabaseCostumer.from("orders").select("*");
      if (error) throw error;

      setOrdersData(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrdersData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [fetchOrders])
  );

  const handleRefresh = () => {
    fetchOrders();
  };

  const incompleteOrders = ordersData.filter((order) => !order.is_complete);

  return (
    <SafeAreaView style={styles.safeArea}>
      <VStack space={4} className="h-full justify-center">
        {online ? (
          isLoading ? (
            <LoadingView />
          ) : incompleteOrders.length > 0 ? (
            <FlatList
              data={incompleteOrders}
              renderItem={({ item }) => <CardOrder {...item} />}
              keyExtractor={(item) => item.id}
              refreshing={isLoading}
              onRefresh={handleRefresh}
            />
          ) : (
            <EmptyView onRefresh={handleRefresh} />
          )
        ) : (
          <View className="h-screen items-center justify-center">
            <Center flex={1}>
              <VStack
                alignItems="center"
                space={2}
                bg="yellow.400"
                py={4}
                px={8}
                borderRadius="lg"
              >
                <Ionicons name="power" size={32} />
                <Text fontSize="lg" fontWeight="bold">
                  You are offline !
                </Text>
                <Text fontSize="sm" color="gray.800" fontWeight="bold">
                  Go online to start accepting orders.
                </Text>
              </VStack>
            </Center>
          </View>
        )}
      </VStack>
    </SafeAreaView>
  );
}
