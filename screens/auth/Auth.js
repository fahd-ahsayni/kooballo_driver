import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { supabase as supabaseDriver } from "../../supabase/driver";
import { Stack, Input, Button, Box, FormControl } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [signInError, setSignInError] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabaseDriver.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) setSignInError(true);
    setLoading(false);
  }

  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  return (
    <SafeAreaView className="relative justify-center flex-1 px-4">
      <View className="w-full px-4 mb-8">
        <View className="flex flex-row items-center space-x-2">
        <Text className="text-3xl font-bold">KOOBALLO</Text>
        <Text className="text-xl font-bold text-sky-500">Driver</Text>
        </View>
        <Text className="text-gray-600">
          Please login with registered account
        </Text>
      </View>
      <Box alignItems="center">
        <Box w="100%">
          <FormControl isRequired>
            <Stack mx="4">
              <View>
                <FormControl.Label>Email</FormControl.Label>

                <Input
                  type="text"
                  placeholder="Enter your email address"
                  autoCapitalize="none"
                  borderColor={signInError ? "danger.600" : "muted.400"}
                  InputLeftElement={
                    <Button
                      size="xs"
                      rounded="none"
                      h="full"
                      className="bg-transparent -mr-2.5"
                    >
                      <Icon
                        name="mail"
                        size={18}
                        color="#64748b"
                        className="h-full"
                      />
                    </Button>
                  }
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                />
                
              </View>

              <View className="mt-4">
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  borderColor={signInError ? "danger.600" : "muted.400"}
                  InputLeftElement={
                    <Button
                      size="xs"
                      rounded="none"
                      h="full"
                      className="bg-transparent -mr-2.5"
                    >
                      <Icon
                        name="key"
                        size={18}
                        color="#64748b"
                        className="h-full"
                      />
                    </Button>
                  }
                  InputRightElement={
                    <Button
                      size="xs"
                      rounded="none"
                      w="1/6"
                      h="full"
                      className="bg-transparent py-2.5"
                      onPress={handleClick}
                    >
                      <Icon
                        name={show ? "eye-outline" : "eye-off-outline"}
                        size={18}
                        color="#64748b"
                        className="h-full"
                      />
                    </Button>
                  }
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                />
                <FormControl.HelperText>
                  Must be atleast 6 characters.
                </FormControl.HelperText>
              </View>
            </Stack>
          </FormControl>
        </Box>

        <View className="flex w-full px-4 mt-8 space-y-4">
          <Button
            onPress={signInWithEmail}
            isLoading={loading}
            className="bg-sky-500"
            _text={{ fontWeight: 700 }}
          >
            Sign In
          </Button>
        </View>

        <View className="flex flex-row items-center justify-center mt-4">
          <Text className="font-semibold text-gray-800">
            Don't have an account?
          </Text>
          <Text
            onPress={() => {}}
            className="px-2 text-base font-bold text-sky-500"
          >
            Contact us
          </Text>
        </View>
      </Box>
    </SafeAreaView>
  );
}
