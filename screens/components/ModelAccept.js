import { Button, Center, Modal, useNativeBase } from "native-base";
import { useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../supabase/costumer";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const ModelAccept = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  const id = useSelector((state) => state.appSlice.id);

  const OrderComplete = async (isAccept) => {
    const { data, error } = await supabase
      .from("orders")
      .update({ driver_accept: isAccept, waiting: false })
      .eq("id", id);

    if (error) {
      console.log("Error: ", error);
    } else {
      console.log("Successfully");
    }
  };

  clickHandler = () => {
    OrderComplete(true);
    setShowModal(false);
    navigation.navigate("Home");
  };

  return (
    <Center>
      <Button
        onPress={() => setShowModal(true)}
        className="bg-sky-500 mt-4"
        _text={{ fontWeight: 700 }}
        w="100%"
      >
        Order Complete
      </Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
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
      </Modal>
    </Center>
  );
};

export default ModelAccept;
