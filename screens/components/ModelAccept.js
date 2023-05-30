import { Button, Center, Input, Modal, Text, View, useNativeBase } from "native-base";
import { useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../supabase/costumer";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const ModelAccept = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  const id = useSelector((state) => state.appSlice.id);

  const handleOrderComplete = async () => {
    try {
      await supabase
        .from("orders")
        .update({ driver_accept: true })
        .eq("id", id);
    } catch (error) {
      console.log("Error updating order:", error);
    }
  };

  clickHandler = () => {
    handleOrderComplete();
    navigation.navigate("Home");
  };

  return (
    <View className="mt-4">
      <Text fontSize="sm" bold color="primary.600">Please enter the order code :</Text>
      <Input className="text-xl text-center" variant="filled" placeholder="1b5C44**" borderColor="primary.600" />
      <Button
        onPress={() => setShowModal(true)}
        className="bg-sky-500 mt-4"
        _text={{ fontWeight: 700 }}
        w="100%"
      >
        Order Complete
      </Button>
      {/* <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="350" maxH="212">
          <Modal.CloseButton />
          <Modal.Header>Confirm Order</Modal.Header>
          <Modal.Body>Are you sure you want to Complete this order?</Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                bg="green.600"
                onPress={() => {
                  clickHandler();
                }}
              >
                Complete
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal> */}
    </View>
  );
};

export default ModelAccept;
