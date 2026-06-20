import SecondHeader from "../Common/SecondHeader";
import Button from "@/components/controls/Button";
import Text from "@/skeleton/Text";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Dimensions, StyleSheet, View } from "react-native";
import { z } from "zod";
import FormInput from "@/components/controls/DynamicInput";

const { width, height } = Dimensions.get("window");

const formSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  newpassword: z.string().min(6, "Password must be same"),
});

type FormData = z.infer<typeof formSchema>;

const Forgetpassword = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Reset password data:", data);
    router.push("/auth/SignIn");
  };

  const handleNextStep = () => {
    const { email } = getValues();

    if (!email) {
      console.log("Email is required.");
      return;
    }

    setCurrentStep(2);
  };

  return (
    <>
      {currentStep == 2 && (
        <View className="flex-1 relative bg-[#EFF1F3] justify-center items-center">
          <View className="bg-white w-[90%] h-[90%] rounded-[20px] mt-7">
            {/* Header */}
            <SecondHeader />

            {/* Form */}
            <View className="gap-1 flex-1 justify-center mx-4">
              <View className="justify-center items-center mb-5">
                <Text variant="semibold" className="text-[32px] items-center">
                  Reset password
                </Text>
                <Text className="text-[15px]">
                  We’ll help you set a new one
                </Text>
              </View>

              <View className="mb-2 mt-5">
                <FormInput
                  control={control}
                  name="password"
                  placeholder="Create your new password"
                  type="password"
                  error={errors.password}
                />
                <FormInput
                  control={control}
                  name="confirmPassword"
                  placeholder="Confirm your new password"
                  type="password"
                  error={errors.newpassword}
                />
              </View>

              <Button variant="primary" onPress={handleSubmit(onSubmit)}>
                <Text variant="medium" className="text-[16px]">
                  Confirm
                </Text>
              </Button>
            </View>
          </View>
        </View>
      )}
      {currentStep == 1 && (
        <View className="flex-1 relative bg-[#EFF1F3] justify-center items-center">
          <View className="bg-white w-[90%] h-[90%] rounded-[20px] mt-7">
            {/* Header */}

            <SecondHeader />

            {/* Text & Form */}
            <View className="gap-1 flex-1 justify-center mx-4">
              <View className="justify-center items-center mb-10">
                <Text
                  variant="semibold"
                  className="text-[32px] tracking-tight items-center"
                >
                  Forgot password?
                </Text>
                <Text className="text-[15px] tracking-tight items-center">
                  We’ll send you instructions to restore access
                </Text>
              </View>

              <View className="mb-2 mt-5">
                <FormInput
                  control={control}
                  name="email"
                  placeholder="Email"
                  type="text"
                  error={errors.email}
                />
              </View>

              <Button variant="primary" onPress={handleNextStep}>
                <Text variant="medium" className="text-[16px]">
                  Send
                </Text>
              </Button>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: height > 850 ? height * 0.9 : height * 0.97,
    width: width * 0.9,
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: 20,
  },
});

export default Forgetpassword;
