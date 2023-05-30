import { Button, Center, Modal, useNativeBase } from "native-base";
import { useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../supabase/costumer";
import { useNavigation } from "@react-navigation/native";

const ModelCancel = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  const id = useSelector((state) => state.appSlice.id);

  const handleOrderComplete = async () => {
    try {
      await supabase
        .from("orders")
        .update({ driver_accept: false, waiting: false })
        .eq("id", id);
    } catch (error) {
      console.log("Error updating order:", error);
    }
  };


  clickHandler = () => {
    handleOrderComplete();
    setShowModal(false);
    navigation.navigate("Home");
  };

  return (
    <Center>
      <Button
        borderColor="red.500"
        onPress={() => setShowModal(true)}
        className="border bg-white mt-4"
        _text={{ fontWeight: 700, color: "red.600" }}
        w="100%"
      >
        Cancel
      </Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="350" maxH="212">
          <Modal.CloseButton />
          <Modal.Header>Cancel Order</Modal.Header>
          <Modal.Body>
            Are you sure you want to cancel this order? Please confirm your
            decision.
          </Modal.Body>
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
                bg="red.600"
                onPress={() => {
                  clickHandler();
                }}
              >
                Cancel
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default ModelCancel;
