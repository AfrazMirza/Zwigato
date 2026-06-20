import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const SecondHeader = () => {
  const router = useRouter();
  return (
    <View className="flex-row justify-between mx-2 mt-2 mb-4 ">
      <Image
        source={require("../../assets/zwigato.jpg")}
        className="w-13 h-13"
      />

      <TouchableOpacity
        className="bg-[#EFF1F3] border border-[#EBEBEB] w-[88px] h-[52px] rounded-2xl items-center justify-center"
        onPress={() => router.back()}
      >
        <Text className="text-[16px]">Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SecondHeader;
