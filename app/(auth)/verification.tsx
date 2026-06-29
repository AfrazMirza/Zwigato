import Text from "@/skeleton/Text";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, View, StyleSheet, Dimensions } from "react-native";
import { z } from "zod";
import Button from "@/components/controls/Button";
import FormInput from "@/components/controls/DynamicInput";

const formSchema = z.object({
  otpEmail: z.string().min(6, "Enter 6-digit OTP").optional(),
  otpPhone: z.string().min(6, "Enter 6-digit OTP").optional(),
});

type FormData = z.infer<typeof formSchema>;

const Verification = () => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loader, setloader] = useState(false);

  const {
    control,
    getValues,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otpEmail: "",
      otpPhone: "",
    },
  });

  const verifyEmail = () => {
    const { otpEmail } = getValues();
    if (!otpEmail) {
      setError("otpEmail", {
        type: "manual",
        message: "Enter the 6-digit code",
      });
      return;
    }
    setStep(2);
  };

  const verifyPhone = () => {
    const { otpPhone } = getValues();
    if (!otpPhone) {
      setError("otpPhone", {
        type: "manual",
        message: "Enter the 6-digit code",
      });
      return;
    }
    setStep(3);
  };

  // Helper to get step bar color safely without dynamic Tailwind string crashes
  const getStepBarColor = (currentBarStep: number) => {
    return step >= currentBarStep ? '#ff3f6c' : '#E5E7EB'; // amber-200 : gray-200
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        
        {/* Header Block */}
        <View style={styles.headerBlock}>
          <Image
            source={require("../../assets/zwigato.jpg")}
            style={styles.logo}
          />

          {/* Progress Indicator Bars */}
          <View style={styles.progressRow}>
            <View style={[styles.progressBar, { backgroundColor: getStepBarColor(1) }]} />
            <View style={[styles.progressBar, { backgroundColor: getStepBarColor(2) }]} />
            <View style={[styles.progressBar, { backgroundColor: getStepBarColor(3) }]} />
          </View>
        </View>

        {/* Step 1: Email Verification */}
        {step === 1 && (
          <View style={styles.flexOne}>
            <View style={styles.centerWrapper}>
              <View style={styles.formGroup}>
                <View style={styles.textCenterBlock}>
                  <Text variant="semibold" style={styles.titleText}>
                    Email Verification
                  </Text>
                  <Text style={styles.subtitleText}>
                    We’ve sent a 6-digit code to your email
                  </Text>
                </View>
                
                <View style={styles.inputActionStack}>
                  <FormInput control={control} name="otpEmail" type="otp" />
                  
                  <View style={styles.metaControlStack}>
                    <Text style={styles.infoText}>
                      The OTP will expire in{" "}
                      <Text variant="medium" style={styles.infoText}>
                        0:59 sec
                      </Text>
                    </Text>
                    
                    <Button loading={loader} variant="primary" onPress={verifyEmail}>
                      <Text variant="semibold" style={styles.btnTextPrimary}>Verify Email</Text>
                    </Button>
                    
                    <Text style={styles.infoText}>
                      Didn’t receive the code?
                      <Text style={styles.underlineLink}> Resend</Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Step 2: Phone Verification */}
        {step === 2 && (
          <View style={styles.flexOne}>
            <View style={styles.centerWrapper}>
              <View style={styles.formGroup}>
                <View style={styles.textCenterBlock}>
                  <Text variant="semibold" style={styles.titleText}>
                    Phone Verification
                  </Text>
                  <Text style={styles.subtitleText}>
                    We’ve sent a 6-digit code to your phone number:
                  </Text>
                </View>
                
                <View style={styles.inputActionStack}>
                  <FormInput control={control} name="otpPhone" type="otp" />
                  
                  <View style={styles.metaControlStack}>
                    <Text style={styles.infoText}>
                      The OTP will expire in{" "}
                      <Text variant="medium" style={styles.infoText}>
                        0:59 sec
                      </Text>
                    </Text>
                    
                    <Button
                      loading={loader}
                      variant="primary"
                      onPress={() => {
                        setloader(true);
                        verifyPhone();
                        setloader(false);
                      }}
                    >
                      <Text variant="semibold" style={styles.btnTextPrimary}>Verify Phone</Text>
                    </Button>
                    
                    <Text style={styles.infoText}>
                      Didn’t receive the code?
                      <Text style={styles.underlineLink}> Resend</Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Step 3: Success Screen */}
        {step === 3 && (
          <View style={styles.successContainer}>
            <View style={styles.successGroup}>
              <View style={styles.textCenterBlock}>
                <Text variant="semibold" style={styles.titleText}>
                  Account Verified
                </Text>
                <Text style={styles.subtitleText}>
                  Your account has been verified successfully
                </Text>
              </View>
              <View style={styles.successBtnWrap}>
                <Button
                  variant="primary"
                  onPress={() => router.push("/personalDetails")}
                >
                  <Text variant="semibold" style={styles.btnTextPrimary}>Continue</Text>
                </Button>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF1F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 16,
    height: '90%',
    width: '90%',
    marginTop: 28,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  headerBlock: {
    width: '100%',
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 12,
  },
  progressRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 8,
    marginTop: 20,
    marginBottom: 10,
  },
  progressBar: {
    flex: 1,
    height: 3,
    borderRadius: 4,
  },
  flexOne: {
    flex: 1,
  },
  centerWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  formGroup: {
    gap: 40,
    width: '100%',
  },
  textCenterBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  titleText: {
    fontSize: 32,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  subtitleText: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 8,
  },
  inputActionStack: {
    width: '100%',
    gap: 24,
  },
  metaControlStack: {
    gap: 24,
  },
  infoText: {
    fontSize: 12,
    color: '#4B5563',
    textAlign: 'center',
  },
  underlineLink: {
    fontSize: 12,
    textDecorationLine: 'underline',
    color: '#000000',
  },
  btnTextPrimary: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  successGroup: {
    gap: 48,
    width: '100%',
  },
  successBtnWrap: {
    width: '100%',
  },
});

export default Verification;