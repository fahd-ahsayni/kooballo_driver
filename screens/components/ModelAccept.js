import { Button, Input, Text, View, useToast } from "native-base";
import { useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../supabase/costumer";
import { useNavigation } from "@react-navigation/native";
import { Vibration } from "react-native";

const ModelAccept = () => {
  const navigation = useNavigation();
  const [accepted, setAccepted] = useState(false);
  const [orderCode, setOrderCode] = useState("");
  const [isError, setIsError] = useState(false);

  const id = useSelector((state) => state.appSlice.id);
  const orderKey = useSelector((state) => state.appSlice.orderKey);
  const toast = useToast();

  const handleAccept = async () => {
    try {
      await supabase
        .from("orders")
        .update({ driver_accept: true })
        .eq("id", id);
    } catch (error) {
      console.log("Error updating order:", error);
    }
    setAccepted(true);
  };

  const handleComplet = async () => {
    try {
      await supabase.from("orders").update({ is_complete: true }).eq("id", id);
    } catch (error) {
      console.log("Error updating order:", error);
    }
  };

  const handleOrderComplete = () => {
    if (orderCode !== orderKey) {
      setIsError(true);
      Vibration.vibrate();
    } else {
      handleComplet();
      setIsError(false);
      navigation.navigate("Home");
    }
  };

  return (
    <View className="mt-4">
      {accepted ? (
        <>
          <Text fontSize="sm" bold color="primary.600">
            Please enter the order code :
          </Text>
          <Input
            value={orderCode}
            onChangeText={(text) => setOrderCode(text)}
            className={`${
              isError ? "text-red-500" : "text-gray-800"
            } text-xl font-bold text-center`}
            variant="filled"
            placeholder="1b5C44**"
          />
          <Button
            onPress={handleOrderComplete}
            className="bg-sky-500 mt-4 capitalize"
            _text={{ fontWeight: 700 }}
            w="100%"
          >
            Order Complete
          </Button>
        </>
      ) : (
        <Button
          onPress={handleAccept}
          className="bg-sky-500 mt-4"
          _text={{ fontWeight: 700 }}
          w="100%"
        >
          Accept This Order
        </Button>
      )}
    </View>
  );
};

export default ModelAccept;
