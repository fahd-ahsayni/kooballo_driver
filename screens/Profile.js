import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { supabase } from "../supabase/driver";
import { Alert } from "native-base";

const Line = ({ title, value, edit = false }) => {
  return (
    <Pressable className="border-b w-full flex-row items-center justify-between border-gray-100 py-4">
      <View className="flex flex-row items-center justify-center">
        <Text className="font-semibold text-gray-800">{title}</Text>
      </View>

      <Text className="text-gray-300">{value}</Text>
    </Pressable>
  );
};

export default function Profile() {
  const [profileData, setProfileData] = useState();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      //   setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`*`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setProfileData(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      //   setLoading(false);
    }
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="flex items-center justify-center mt-4">
          <Image
            style={{ resizeMode: "cover" }}
            className="w-32 h-32 rounded-full"
            source={{ uri: profileData?.avatar_url }}
          />
          <Text className="text-lg text-gray-800 font-semibold mt-4">
            {profileData?.full_name}
          </Text>
          <Text className="text-lg text-gray-500 font-semibold mb-8 mt-0.5">
            Driver
          </Text>

          <View className="bg-sky-500 w-full py-4 px-4">
            <Text className="text-base font-bold text-white">
              Personal Information
            </Text>
          </View>

          <View className="w-full px-4">
            <Line title="Full Name" value={profileData?.full_name} />
            <Line title="Mobile" value={profileData?.mobile}  />
            <Line title="Email" value={profileData?.email} />
            <Line title="Gender" value={profileData?.gender} />
            <Line title="CIN" value={profileData?.cin} />
            <Line title="Birthday" value={profileData?.birthday} />
          </View>
        </View>

        <View className="bg-sky-500 w-full py-4 px-4">
          <Text className="text-base font-bold text-white">
            Kooba Information
          </Text>
        </View>

        <View className="w-full px-4">
          <Line title="Model" value={profileData?.model}  />
          <Line title="Year" value={profileData?.year} />
          <Line title="Licence plate" value={profileData?.licenece_plate}  />
        </View>
      </ScrollView>
    </SafeAreaView> 
  );
}
