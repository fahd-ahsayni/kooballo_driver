import { View, SafeAreaView, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { supabase } from "../supabase/driver";
import {
  Alert,
  Box,
  Spinner,
  Center,
  AspectRatio,
  Heading,
  Text,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const Line = ({ title, value }) => {
  return (
    <View className="w-full flex-row mt-4 px-4 justify-between">
      <Box>
        <Heading size="xs" color="coolGray.800">
          {title}
        </Heading>
      </Box>
      <Heading size="xs" color="coolGray.400" fontWeight="medium">
        {value}
      </Heading>
    </View>
  );
};

export default function Profile() {
  const [profileData, setProfileData] = useState();
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const getProfile = useCallback(async () => {
    setIsLoading(true);
    if (!session?.user) {
      Alert.alert("No user on the session!");
      setIsLoading(false);
      return;
    }

    let { data, error, status } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session?.user.id)
      .single();

    if (error && status !== 406) {
      Alert.alert(error.message);
    }

    if (data) {
      setProfileData(data);
    }

    setIsLoading(false);
  }, [session]);

  useEffect(() => {
    if (session) {
      getProfile();
    }
  }, [session, getProfile]);

  useFocusEffect(
    useCallback(() => {
      getProfile();
    }, [getProfile])
  );
  return (
    <SafeAreaView className="bg-white flex-1">
      {isLoading ? (
        <Center flex={1}>
          <Spinner size="lg" color="#0ea5e9" />
        </Center>
      ) : (
        <ScrollView>
          <View className="flex-1 justify-center items-center mb-4">
            <AspectRatio ratio={1} width={100}>
              <Image
                source={{ uri: profileData?.avatar_url }}
                style={{ resizeMode: "contain" }}
                alt="Profile Avatar"
                className="rounded-full"
              />
            </AspectRatio>
            <Heading size="md" color="coolGray.800" mt={4}>
              {profileData?.full_name}
            </Heading>
            <Text fontSize="lg" color="coolGray.500">
              Driver
            </Text>
            <View className="w-full mt-4 items-center px-16">
              <TouchableOpacity
                className="border-2 rounded border-sky-500 w-full"
                onPress={() => supabase.auth.signOut()}
              >
                <Text className="text-center font-semibold capitalize py-2.5 text-sky-500">
                  Sing Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="w-full bg-white flex py-4 rounded-md flex-row items-center justify-between px-4">
            <View className="h-12 w-12 bg-sky-400 flex items-center justify-center rounded-full">
              <Icon name="wallet-outline" size={24} color="#fff" />
            </View>
            <Heading size="md">Your solde : {profileData?.solde} DH</Heading>
            <Icon name="chevron-forward" size={24} color="#0ea5e9" />
          </View>

          <Box bg="#0ea5e9" p={4} mt={4}>
            <Heading size="md" color="white">
              Personnel Information
            </Heading>
          </Box>

          <Box>
            <Line title="Full Name" value={profileData?.full_name} />
            <Line title="Mobile" value={profileData?.mobile} />
            <Line title="Email" value={profileData?.email} />
            <Line title="Gender" value={profileData?.gender} />
            <Line title="CIN" value={profileData?.cin} />
            <Line title="Birthday" value={profileData?.birthday} />
          </Box>

          <Box bg="#0ea5e9" p={4} mt={4}>
            <Heading size="md" color="white">
              Kooba Information
            </Heading>
          </Box>

          <View className="mb-6">
            <Line title="Model" value={profileData?.model} />
            <Line title="Year" value={profileData?.year} />
            <Line title="Licence plate" value={profileData?.licenece_plate} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
