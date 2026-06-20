import Text from "@/skeleton/Text";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";
import Button from "@/components/controls/Button";
import FormInput from "@/components/controls/DynamicInput";

// validation schema - format safe checks added
const formSchema = z.object({
  email: z.string().email("Enter a valid email address"), // fix string format check
  phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

//TypeScript type from schema
type FormData = z.infer<typeof formSchema>;

const { width } = Dimensions.get("window");

const SignUp = () => {
  const router = useRouter();
  const [loader, setloader] = useState(false);
  
  // resolver
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      phone: "",
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setloader(true);
    try {
      console.log("SignUp data:", data);
      reset();
      router.push("/auth/Verification");
    } catch (error: any) {
      console.log("Email Error:-", error);
      setError("email", {
        type: "manual",
        message: "Unable to register. Please try again.",
      });
    } finally {
      setloader(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -40}
      style={styles.keyboardView}
    >
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          
          {/* Zwigato Logo Box */}
          <View style={styles.logoWrapper}>
            <Image
              source={require("../../assets/zwigato.jpg")}
              style={styles.logo}
            />
          </View>

          <View style={styles.formContent}>
            <View style={styles.mainWrapper}>
              
              {/* ScrollView Wrapper for New Architecture Stability */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.innerLayout}>
                  
                  {/* Header Text Section */}
                  <View style={styles.headerBlock}>
                    <Text variant="semibold" style={styles.titleText}>
                      Welcome to Zwigato
                    </Text>
                    <Text style={styles.subtitleText}>
                      Your ultimate fashion & shopping destination
                    </Text>
                  </View>

                  {/* Inputs Section */}
                  <View style={styles.inputsBlock}>
                    <View style={styles.inputStack}>
                      <FormInput
                        control={control}
                        placeholder="Enter email"
                        name="email"
                        type="text"
                        error={errors.email}
                      />
                      <FormInput
                        control={control}
                        placeholder="Phone Number"
                        name="phone"
                        type="phone"
                        error={errors.phone}
                      />
                      <FormInput
                        control={control}
                        name="password"
                        placeholder="Password"
                        type="password"
                        error={errors.password}
                      />

                      {/* Terms Checkbox Wrap */}
                      <View style={styles.checkboxWrapper}>
                        <FormInput
                          control={control}
                          name="agreeTerms"
                          label="I agree to the terms and service and privacy policy"
                          type="checkbox"
                          error={errors.agreeTerms}
                        />
                      </View>
                    </View>

                    {/* Primary SignUp Button */}
                    <View style={styles.mainActionBlock}>
                      <Button
                        loading={loader}
                        variant="primary"
                        onPress={handleSubmit(onSubmit)}
                      >
                        <Text variant="semibold" style={styles.btnTextPrimary}>
                          Sign Up
                        </Text>
                      </Button>
                    </View>

                    {/* Social SignUp Divider & Buttons */}
                    <View style={styles.socialActionBlock}>
                      <Text style={styles.dividerText}>
                        Or sign up with
                      </Text>
                      <View style={styles.socialButtonsRow}>
                        <View style={styles.socialBtnWrap}>
                          <Button
                            variant="secondary"
                            onPress={() => Alert.alert("Google Sign Up clicked")}
                          >
                             Google
                          </Button>
                        </View>
                        <View style={styles.socialBtnWrap}>
                          <Button
                            variant="secondary"
                            onPress={() => Alert.alert("Apple Sign Up clicked")}
                          >
                             Apple
                          </Button>
                        </View>
                      </View>
                    </View>
                    
                  </View>
                </View>
              </ScrollView>

              {/* Footer Login Link (Fixed Bottom) */}
              <View style={styles.footerRow}>
                <Text style={styles.footerText}>
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={() => router.push("/auth/SignIn")}>
                  <Text style={styles.loginLink}> Login</Text>
                </TouchableOpacity>
              </View>
              
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#EFF1F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 16, // using standard gap prop supported in newer RN versions
    marginTop: 28,
    height: '90%',
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  logoWrapper: {
    paddingLeft: 8,
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 12,
  },
  formContent: {
    paddingHorizontal: 12,
    flex: 1,
  },
  mainWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  scrollContent: {
    flexGrow: 1,
  },
  innerLayout: {
    gap: 32, // gap between header and input stack
  },
  headerBlock: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 26,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  subtitleText: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 4,
    textAlign: 'center',
  },
  inputsBlock: {
    // gap: 20, // using Gap for consistent spacing between inputs and blocks
  },
  inputStack: {
    gap: 12,
  },
  checkboxWrapper: {
    marginLeft: 12,
  },
  mainActionBlock: {
    marginTop: 22,
    marginBottom: 22,
  },
  btnTextPrimary: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
  socialActionBlock: {
    alignItems: 'center',
    gap: 20,
    marginBottom: 16,
  },
  dividerText: {
    fontSize: 12,
    color: '#4B5563',
  },
  socialButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 2,
  },
  socialBtnWrap: {
    flex: 1, // equal width distribution
  },
  footerRow: {
    justifyContent: 'center',
    paddingTop: 8,
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6', // light separator
  },
  footerText: {
    fontSize: 12,
    color: '#4B5563',
  },
  loginLink: {
    fontSize: 12,
    textDecorationLine: 'underline',
    fontWeight: '600',
    color: '#000000',
  },
});

export default SignUp;