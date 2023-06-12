import { Box, Button, Input, Text, VStack } from "native-base";
import { useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../supabase/costumer";
import { supabase as supabaseDriver } from "../../supabase/driver";
import { useNavigation } from "@react-navigation/native";
import { Vibration, KeyboardAvoidingView, Platform } from "react-native";
import { useEffect } from "react";

const ModelAccept = () => {
  const navigation = useNavigation();
  const [accepted, setAccepted] = useState(false);
  const [orderCode, setOrderCode] = useState("");
  const [isError, setIsError] = useState(false);

  const id = useSelector((state) => state.appSlice.id);
  const orderKey = useSelector((state) => state.appSlice.orderKey);
  const price = useSelector((state) => state.appSlice.price);

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabaseDriver.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabaseDriver.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

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

      // calculate new solde
      let newSolde = price - price * 0.07;

      // Fetch current solde from profile table
      let { data: profile, error: profileError } = await supabaseDriver
        .from("profiles")
        .select("solde")
        .eq("id", session?.user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      let currentSolde = profile.solde;

      // update solde in profile table
      await supabaseDriver
        .from("profiles")
        .update({ solde: currentSolde + newSolde }) // increment the existing solde by the newSolde
        .eq("id", session?.user.id);
    } catch (error) {
      console.log("Error updating order or profile:", error);
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <VStack space={2} mt={4} w="100%" alignSelf="center">
        {accepted ? (
          <>
            <Text fontSize="sm" bold color="primary.600">
              Please enter the order code: {price}
            </Text>
            <Input
              value={orderCode}
              onChangeText={setOrderCode}
              borderColor={isError ? "red.500" : "gray.300"}
              fontSize="md"
              fontWeight="bold"
              color={isError ? "red.500" : "gray.800"}
              variant="filled"
              placeholder="AbC###"
              _placeholder={{ color: "gray.400" }}
            />
            {isError && (
              <Box bg="red.500" p={1} rounded="md" my={2}>
                <Text color="white">Invalid order code</Text>
              </Box>
            )}
            <Button
              onPress={handleOrderComplete}
              className="bg-sky-500"
              _text={{ fontWeight: "bold", color: "white" }}
              w="100%"
              rounded="xs"
            >
              Order Complete
            </Button>
          </>
        ) : (
          <Button
            onPress={handleAccept}
            className="bg-sky-500"
            _text={{ fontWeight: "bold", color: "white" }}
            w="100%"
            rounded="xs"
          >
            Accept This Order
          </Button>
        )}
      </VStack>
    </KeyboardAvoidingView>
  );
};

export default ModelAccept;
