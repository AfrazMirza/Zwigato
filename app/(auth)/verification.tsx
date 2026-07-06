// import Text from "@/skeleton/Text";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Image, View, StyleSheet, Dimensions } from "react-native";
// import { z } from "zod";
// import Button from "@/components/controls/Button";
// import FormInput from "@/components/controls/DynamicInput";

// const formSchema = z.object({
//   otpEmail: z.string().min(6, "Enter 6-digit OTP").optional(),
//   otpPhone: z.string().min(6, "Enter 6-digit OTP").optional(),
// });

// type FormData = z.infer<typeof formSchema>;

// const Verification = () => {
//   const router = useRouter();
//   const [step, setStep] = useState<1 | 2 | 3>(1);
//   const [loader, setloader] = useState(false);

//   const {
//     control,
//     getValues,
//     setError,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       otpEmail: "",
//       otpPhone: "",
//     },
//   });

//   const verifyEmail = () => {
//     const { otpEmail } = getValues();
//     if (!otpEmail) {
//       setError("otpEmail", {
//         type: "manual",
//         message: "Enter the 6-digit code",
//       });
//       return;
//     }
//     setStep(2);
//   };

//   const verifyPhone = () => {
//     const { otpPhone } = getValues();
//     if (!otpPhone) {
//       setError("otpPhone", {
//         type: "manual",
//         message: "Enter the 6-digit code",
//       });
//       return;
//     }
//     setStep(3);
//   };

//   // Helper to get step bar color safely without dynamic Tailwind string crashes
//   const getStepBarColor = (currentBarStep: number) => {
//     return step >= currentBarStep ? '#ff3f6c' : '#E5E7EB'; // amber-200 : gray-200
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.cardContainer}>
        
//         {/* Header Block */}
//         <View style={styles.headerBlock}>
//           <Image
//             source={require("../../assets/zwigato.jpg")}
//             style={styles.logo}
//           />

//           {/* Progress Indicator Bars */}
//           <View style={styles.progressRow}>
//             <View style={[styles.progressBar, { backgroundColor: getStepBarColor(1) }]} />
//             <View style={[styles.progressBar, { backgroundColor: getStepBarColor(2) }]} />
//             <View style={[styles.progressBar, { backgroundColor: getStepBarColor(3) }]} />
//           </View>
//         </View>

//         {/* Step 1: Email Verification */}
//         {step === 1 && (
//           <View style={styles.flexOne}>
//             <View style={styles.centerWrapper}>
//               <View style={styles.formGroup}>
//                 <View style={styles.textCenterBlock}>
//                   <Text variant="semibold" style={styles.titleText}>
//                     Email Verification
//                   </Text>
//                   <Text style={styles.subtitleText}>
//                     We’ve sent a 6-digit code to your email
//                   </Text>
//                 </View>
                
//                 <View style={styles.inputActionStack}>
//                   <FormInput control={control} name="otpEmail" type="otp" />
                  
//                   <View style={styles.metaControlStack}>
//                     <Text style={styles.infoText}>
//                       The OTP will expire in{" "}
//                       <Text variant="medium" style={styles.infoText}>
//                         0:59 sec
//                       </Text>
//                     </Text>
                    
//                     <Button loading={loader} variant="primary" onPress={verifyEmail}>
//                       <Text variant="semibold" style={styles.btnTextPrimary}>Verify Email</Text>
//                     </Button>
                    
//                     <Text style={styles.infoText}>
//                       Didn’t receive the code?
//                       <Text style={styles.underlineLink}> Resend</Text>
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </View>
//         )}

//         {/* Step 2: Phone Verification */}
//         {step === 2 && (
//           <View style={styles.flexOne}>
//             <View style={styles.centerWrapper}>
//               <View style={styles.formGroup}>
//                 <View style={styles.textCenterBlock}>
//                   <Text variant="semibold" style={styles.titleText}>
//                     Phone Verification
//                   </Text>
//                   <Text style={styles.subtitleText}>
//                     We’ve sent a 6-digit code to your phone number:
//                   </Text>
//                 </View>
                
//                 <View style={styles.inputActionStack}>
//                   <FormInput control={control} name="otpPhone" type="otp" />
                  
//                   <View style={styles.metaControlStack}>
//                     <Text style={styles.infoText}>
//                       The OTP will expire in{" "}
//                       <Text variant="medium" style={styles.infoText}>
//                         0:59 sec
//                       </Text>
//                     </Text>
                    
//                     <Button
//                       loading={loader}
//                       variant="primary"
//                       onPress={() => {
//                         setloader(true);
//                         verifyPhone();
//                         setloader(false);
//                       }}
//                     >
//                       <Text variant="semibold" style={styles.btnTextPrimary}>Verify Phone</Text>
//                     </Button>
                    
//                     <Text style={styles.infoText}>
//                       Didn’t receive the code?
//                       <Text style={styles.underlineLink}> Resend</Text>
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </View>
//         )}

//         {/* Step 3: Success Screen */}
//         {step === 3 && (
//           <View style={styles.successContainer}>
//             <View style={styles.successGroup}>
//               <View style={styles.textCenterBlock}>
//                 <Text variant="semibold" style={styles.titleText}>
//                   Account Verified
//                 </Text>
//                 <Text style={styles.subtitleText}>
//                   Your account has been verified successfully
//                 </Text>
//               </View>
//               <View style={styles.successBtnWrap}>
//                 <Button
//                   variant="primary"
//                   onPress={() => router.push("/personalDetails")}
//                 >
//                   <Text variant="semibold" style={styles.btnTextPrimary}>Continue</Text>
//                 </Button>
//               </View>
//             </View>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#EFF1F3',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cardContainer: {
//     paddingHorizontal: 12,
//     paddingTop: 8,
//     paddingBottom: 16,
//     height: '90%',
//     width: '90%',
//     marginTop: 28,
//     borderRadius: 16,
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   headerBlock: {
//     width: '100%',
//   },
//   logo: {
//     width: 52,
//     height: 52,
//     borderRadius: 12,
//   },
//   progressRow: {
//     flexDirection: 'row',
//     width: '100%',
//     gap: 8,
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   progressBar: {
//     flex: 1,
//     height: 3,
//     borderRadius: 4,
//   },
//   flexOne: {
//     flex: 1,
//   },
//   centerWrapper: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   formGroup: {
//     gap: 40,
//     width: '100%',
//   },
//   textCenterBlock: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 4,
//   },
//   titleText: {
//     fontSize: 32,
//     color: '#000000',
//     textAlign: 'center',
//     lineHeight: 38,
//     letterSpacing: -0.5,
//   },
//   subtitleText: {
//     fontSize: 14,
//     color: '#4B5563',
//     textAlign: 'center',
//     lineHeight: 20,
//     paddingHorizontal: 8,
//   },
//   inputActionStack: {
//     width: '100%',
//     gap: 24,
//   },
//   metaControlStack: {
//     gap: 24,
//   },
//   infoText: {
//     fontSize: 12,
//     color: '#4B5563',
//     textAlign: 'center',
//   },
//   underlineLink: {
//     fontSize: 12,
//     textDecorationLine: 'underline',
//     color: '#000000',
//   },
//   btnTextPrimary: {
//     fontSize: 16,
//     color: '#000000',
//     textAlign: 'center',
//   },
//   successContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     width: '100%',
//   },
//   successGroup: {
//     gap: 48,
//     width: '100%',
//   },
//   successBtnWrap: {
//     width: '100%',
//   },
// });

// export default Verification;

import Text from "@/skeleton/Text";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, View, StyleSheet, Dimensions, Alert, TouchableOpacity } from "react-native";
import { z } from "zod";
import Button from "@/components/controls/Button";
import FormInput from "@/components/controls/DynamicInput";

// ── IMPORT RECONSTRUCTED REAL API GATEWAYS ──
import Routes from "../../src/constants/apiRoutes";
import { request } from "../../src/controller/fetchApiController";
import { saveTokens } from "../../src/controller/tokenController";

const formSchema = z.object({
  otpEmail: z.string().min(6, "Enter 6-digit OTP").optional(),
  otpPhone: z.string().min(6, "Enter 6-digit OTP").optional(),
});

type FormData = z.infer<typeof formSchema>;

const Verification = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  
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

  // ── 1. VERIFY EMAIL OTP VIA PHP LARAVEL BACKEND ──
  const verifyEmail = async () => {
    const { otpEmail } = getValues();
    if (!otpEmail || otpEmail.length < 6) {
      setError("otpEmail", {
        type: "manual",
        message: "Enter the 6-digit code",
      });
      return;
    }

    setloader(true);
    console.log("================ [API REQ: VERIFY OTP LAYOUT] ================");
    console.log("Payload Sending Context:", { email: email, otp: otpEmail });

    try {
      // POST triggers directly to /auth/verify-otp as per Image 4 specifications
      const response = await request(Routes.verifyOtp, "POST", {
        body: {
          email: email || "afrazmirza68@gmail.com",
          otp: otpEmail
        }
      });

      console.log("================ [API RES: VERIFY OTP SUCCESS] ================");
      console.log("Server Handshake Response Package:", response);
      
      // Persist authentic credentials tokens vector layout instantly inside device secure store
      if (response && (response.token || response.accessToken)) {
        await saveTokens(response);
        console.log("Session token array synchronized successfully.");
      }

      // Bypass phone verification fallback since email handles main validation nodes
      setStep(3);
    } catch (error: any) {
      console.log("================ [API RES: VERIFY OTP FAILED] ================");
      console.log("Error Package:", error);
      
      const serverErrorMessage = error?.errorData?.message || "Invalid validation OTP code. Please try again.";
      setError("otpEmail", {
        type: "manual",
        message: serverErrorMessage,
      });
      Alert.alert("Verification Failed", serverErrorMessage);
    } finally {
      setloader(false);
    }
  };

  // ── 2. RESEND OTP API TRIGGER ROUTING (Image 3 Blueprint) ──
  const handleResendOtp = async () => {
    console.log("================ [API REQ: RESEND EMAIL OTP] ================");
    try {
      const response = await request(Routes.requestOtp, "POST", {
        body: { email: email || "afrazmirza68@gmail.com" }
      });

      console.log("================ [API RES: RESEND SUCCESS] ================");
      Alert.alert("OTP Sent", "A brand fresh 6-digit validation security code has been dispatched.");
    } catch (error: any) {
      console.log("================ [API RES: RESEND FAILED] ================");
      const serverErrorMessage = error?.errorData?.message || "Unable to process resend request right now.";
      Alert.alert("Error", serverErrorMessage);
    }
  };

  const getStepBarColor = (currentBarStep: number) => {
    return step >= currentBarStep ? '#ff3f6c' : '#E5E7EB';
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        
        <View style={styles.headerBlock}>
          <Image source={require("../../assets/zwigato.jpg")} style={styles.logo} />
          <View style={styles.progressRow}>
            <View style={[styles.progressBar, { backgroundColor: getStepBarColor(1) }]} />
            <View style={[styles.progressBar, { backgroundColor: getStepBarColor(2) }]} />
            <View style={[styles.progressBar, { backgroundColor: getStepBarColor(3) }]} />
          </View>
        </View>

        {step === 1 && (
          <View style={styles.flexOne}>
            <View style={styles.centerWrapper}>
              <View style={styles.formGroup}>
                <View style={styles.textCenterBlock}>
                  <Text variant="semibold" style={styles.titleText}>Email Verification</Text>
                  <Text style={styles.subtitleText}>We’ve sent a 6-digit code to your email</Text>
                </View>
                
                <View style={styles.inputActionStack}>
                  <FormInput control={control} name="otpEmail" type="otp" error={errors.otpEmail} />
                  <View style={styles.metaControlStack}>
                    <Text style={styles.infoText}>
                      The OTP will expire in <Text variant="medium" style={styles.infoText}>0:59 sec</Text>
                    </Text>
                    <Button loading={loader} variant="primary" onPress={verifyEmail}>
                      <Text variant="semibold" style={styles.btnTextPrimary}>Verify Email</Text>
                    </Button>
                    <TouchableOpacity onPress={getValues().otpEmail ? undefined : handleResendOtp} style={{ alignSelf: 'center' }}>
                      <Text style={styles.infoText}>Didn’t receive the code? <Text style={styles.underlineLink}>Resend</Text></Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.successContainer}>
            <View style={styles.successGroup}>
              <View style={styles.textCenterBlock}>
                <Text variant="semibold" style={styles.titleText}>Account Verified</Text>
                <Text style={styles.subtitleText}>Your account has been verified successfully</Text>
              </View>
              <View style={styles.successBtnWrap}>
                <Button variant="primary" onPress={() => router.push("/(main)/(tabs)")}>
                  <Text variant="semibold" style={styles.btnTextPrimary}>Continue to Shop</Text>
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
  container: { flex: 1, backgroundColor: '#EFF1F3', justifyContent: 'center', alignItems: 'center' },
  cardContainer: { paddingHorizontal: 12, paddingTop: 8, paddingBottom: 16, height: '90%', width: '90%', marginTop: 28, borderRadius: 16, backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 3 },
  headerBlock: { width: '100%' },
  logo: { width: 52, height: 52, borderRadius: 12 },
  progressRow: { flexDirection: 'row', width: '100%', gap: 8, marginTop: 20, marginBottom: 10 },
  progressBar: { flex: 1, height: 3, borderRadius: 4 },
  flexOne: { flex: 1 },
  centerWrapper: { flex: 1, justifyContext: 'center', justifyContent:'center' },
  formGroup: { gap: 40, width: '100%' },
  textCenterBlock: { alignItems: 'center', justifyContent: 'center', gap: 4 },
  titleText: { fontSize: 32, color: '#000000', textAlign: 'center', lineHeight: 38, letterSpacing: -0.5 },
  subtitleText: { fontSize: 14, color: '#4B5563', textAlign: 'center', lineHeight: 20, paddingHorizontal: 8 },
  inputActionStack: { width: '100%', gap: 24 },
  metaControlStack: { gap: 24 },
  infoText: { fontSize: 12, color: '#4B5563', textAlign: 'center' },
  underlineLink: { fontSize: 12, textDecorationLine: 'underline', color: '#000000' },
  btnTextPrimary: { fontSize: 16, color: '#000000', textAlign: 'center' },
  successContainer: { flex: 1, justifyContent: 'center', width: '100%' },
  successGroup: { gap: 48, width: '100%' },
  successBtnWrap: { width: '100%' },
});

export default Verification;
// import Text from "@/skeleton/Text";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Image, View, StyleSheet, Dimensions, Alert, TouchableOpacity } from "react-native";
// import { z } from "zod";
// import Button from "@/components/controls/Button";
// import FormInput from "@/components/controls/DynamicInput";

// // ── IMPORT RECONSTRUCTED REAL API GATEWAYS ──
// import Routes from "../../src/constants/apiRoutes";
// import { request } from "../../src/controller/fetchApiController";
// import { saveTokens } from "../../src/controller/tokenController";

// const formSchema = z.object({
//   otpEmail: z.string().min(6, "Enter 6-digit OTP").optional(),
//   otpPhone: z.string().min(6, "Enter 6-digit OTP").optional(),
// });

// type FormData = z.infer<typeof formSchema>;

// const Verification = () => {
//   const router = useRouter();
  
//   // ── FETCH EMAIL PASSED FROM SIGNUP SCREEN ──
//   const { email } = useLocalSearchParams<{ email: string }>();
  
//   const [step, setStep] = useState<1 | 2 | 3>(1);
//   const [loader, setloader] = useState(false);

//   const {
//     control,
//     getValues,
//     setError,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       otpEmail: "",
//       otpPhone: "",
//     },
//   });

//   // ── 1. VERIFY EMAIL OTP VIA PHP BACKEND ──
//   const verifyEmail = async () => {
//     const { otpEmail } = getValues();
//     if (!otpEmail || otpEmail.length < 6) {
//       setError("otpEmail", {
//         type: "manual",
//         message: "Enter the 6-digit code",
//       });
//       return;
//     }

//     setloader(true);
//     console.log("================ [API REQ: VERIFY EMAIL OTP] ================");
//     console.log("Payload:", { email: email, otp: otpEmail });

//     try {
//       // POST triggers to /api/auth/verify-otp
//       const response = await request(Routes.verifyOtp, "POST", {
//         body: {
//           email: email || "afrazmirza68@gmail.com", // Fallback parameter
//           otp: otpEmail
//         }
//       });

//       console.log("================ [API RES: EMAIL OTP VERIFIED] ================");
//       console.log("Server Response:", response);
      
//       // Step update transitions dynamically
//       setStep(2);
//     } catch (error: any) {
//       console.log("================ [API RES: EMAIL OTP FAILED] ================");
//       console.log("Error details:", error);
      
//       const serverErrorMessage = error?.errorData?.message || "Invalid OTP code. Please try again.";
//       setError("otpEmail", {
//         type: "manual",
//         message: serverErrorMessage,
//       });
//       Alert.alert("Verification Failed", serverErrorMessage);
//     } finally {
//       setloader(false);
//     }
//   };

//   // ── 2. VERIFY PHONE OTP VIA PHP BACKEND ──
//   const verifyPhone = async () => {
//     const { otpPhone } = getValues();
//     if (!otpPhone || otpPhone.length < 6) {
//       setError("otpPhone", {
//         type: "manual",
//         message: "Enter the 6-digit code",
//       });
//       return;
//     }

//     setloader(true);
//     console.log("================ [API REQ: VERIFY PHONE OTP] ================");
    
//     try {
//       // POST triggers mock routing verification context setup
//       const response = await request(Routes.verifyOtp, "POST", {
//         body: {
//           email: email || "afrazmirza68@gmail.com",
//           otp: otpPhone
//         }
//       });

//       console.log("================ [API RES: PHONE OTP VERIFIED SUCCESS] ================");
//       console.log("Server Data:", response);

//       // Save tokens securely on complete signup/verification handshake lifecycle
//       if (response && (response.token || response.accessToken)) {
//         await saveTokens(response);
//         console.log("Authentication secure tokens saved safely on Device registry.");
//       }

//       setStep(3);
//     } catch (error: any) {
//       console.log("================ [API RES: PHONE OTP FAILED] ================");
//       const serverErrorMessage = error?.errorData?.message || "Invalid Phone OTP. Please try again.";
//       setError("otpPhone", {
//         type: "manual",
//         message: serverErrorMessage,
//       });
//       Alert.alert("Verification Failed", serverErrorMessage);
//     } finally {
//       setloader(false);
//     }
//   };

//   // ── 3. RESEND OTP API TRIGGER ROUTING ──
//   const handleResendOtp = async () => {
//     console.log("================ [API REQ: RESEND OTP] ================");
//     console.log("Target Email Address:", email);

//     try {
//       // POST trigger to /api/auth/request-otp
//       const response = await request(Routes.requestOtp, "POST", {
//         body: { email: email || "afrazmirza68@gmail.com" }
//       });

//       console.log("================ [API RES: RESEND OTP SUCCESS] ================");
//       console.log("Response:", response);
//       Alert.alert("OTP Sent", "A fresh 6-digit verification code has been dispatched to your address.");
//     } catch (error: any) {
//       console.log("================ [API RES: RESEND OTP FAILED] ================");
//       const serverErrorMessage = error?.errorData?.message || "Unable to resend OTP. Try after some time.";
//       Alert.alert("Error", serverErrorMessage);
//     }
//   };

//   const getStepBarColor = (currentBarStep: number) => {
//     return step >= currentBarStep ? '#ff3f6c' : '#E5E7EB';
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.cardContainer}>
        
//         {/* Header Block */}
//         <View style={styles.headerBlock}>
//           <Image
//             source={require("../../assets/zwigato.jpg")}
//             style={styles.logo}
//           />

//           {/* Progress Indicator Bars */}
//           <View style={styles.progressRow}>
//             <View style={[styles.progressBar, { backgroundColor: getStepBarColor(1) }]} />
//             <View style={[styles.progressBar, { backgroundColor: getStepBarColor(2) }]} />
//             <View style={[styles.progressBar, { backgroundColor: getStepBarColor(3) }]} />
//           </View>
//         </View>

//         {/* Step 1: Email Verification */}
//         {step === 1 && (
//           <View style={styles.flexOne}>
//             <View style={styles.centerWrapper}>
//               <View style={styles.formGroup}>
//                 <View style={styles.textCenterBlock}>
//                   <Text variant="semibold" style={styles.titleText}>
//                     Email Verification
//                   </Text>
//                   <Text style={styles.subtitleText}>
//                     We’ve sent a 6-digit code to your email
//                   </Text>
//                 </View>
                
//                 <View style={styles.inputActionStack}>
//                   <FormInput control={control} name="otpEmail" type="otp" error={errors.otpEmail} />
                  
//                   <View style={styles.metaControlStack}>
//                     <Text style={styles.infoText}>
//                       The OTP will expire in{" "}
//                       <Text variant="medium" style={styles.infoText}>
//                         0:59 sec
//                       </Text>
//                     </Text>
                    
//                     <Button loading={loader} variant="primary" onPress={verifyEmail}>
//                       <Text variant="semibold" style={styles.btnTextPrimary}>Verify Email</Text>
//                     </Button>
                    
//                     <Text style={styles.infoText}>
//                       Didn’t receive the code?{" "}
//                       <TouchableOpacity onPress={handleResendOtp} activeOpacity={0.7}>
//                         <Text style={styles.underlineLink}>Resend</Text>
//                       </TouchableOpacity>
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </View>
//         )}

//         {/* Step 2: Phone Verification */}
//         {step === 2 && (
//           <View style={styles.flexOne}>
//             <View style={styles.centerWrapper}>
//               <View style={styles.formGroup}>
//                 <View style={styles.textCenterBlock}>
//                   <Text variant="semibold" style={styles.titleText}>
//                     Phone Verification
//                   </Text>
//                   <Text style={styles.subtitleText}>
//                     We’ve sent a 6-digit code to your phone number:
//                   </Text>
//                 </View>
                
//                 <View style={styles.inputActionStack}>
//                   <FormInput control={control} name="otpPhone" type="otp" error={errors.otpPhone} />
                  
//                   <View style={styles.metaControlStack}>
//                     <Text style={styles.infoText}>
//                       The OTP will expire in{" "}
//                       <Text variant="medium" style={styles.infoText}>
//                         0:59 sec
//                       </Text>
//                     </Text>
                    
//                     <Button
//                       loading={loader}
//                       variant="primary"
//                       onPress={verifyPhone}
//                     >
//                       <Text variant="semibold" style={styles.btnTextPrimary}>Verify Phone</Text>
//                     </Button>
                    
//                     <Text style={styles.infoText}>
//                       Didn’t receive the code?{" "}
//                       <TouchableOpacity onPress={handleResendOtp} activeOpacity={0.7}>
//                         <Text style={styles.underlineLink}>Resend</Text>
//                       </TouchableOpacity>
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </View>
//         )}

//         {/* Step 3: Success Screen */}
//         {step === 3 && (
//           <View style={styles.successContainer}>
//             <View style={styles.successGroup}>
//               <View style={styles.textCenterBlock}>
//                 <Text variant="semibold" style={styles.titleText}>
//                   Account Verified
//                 </Text>
//                 <Text style={styles.subtitleText}>
//                   Your account has been verified successfully
//                 </Text>
//               </View>
//               <View style={styles.successBtnWrap}>
//                 <Button
//                   variant="primary"
//                   onPress={() => router.push("/personalDetails")}
//                 >
//                   <Text variant="semibold" style={styles.btnTextPrimary}>Continue</Text>
//                 </Button>
//               </View>
//             </View>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#EFF1F3', justifyContent: 'center', alignItems: 'center' },
//   cardContainer: {
//     paddingHorizontal: 12,
//     paddingTop: 8,
//     paddingBottom: 16,
//     height: '90%',
//     width: '90%',
//     marginTop: 28,
//     borderRadius: 16,
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   headerBlock: { width: '100%' },
//   logo: { width: 52, height: 52, borderRadius: 12 },
//   progressRow: { flexDirection: 'row', width: '100%', gap: 8, marginTop: 20, marginBottom: 10 },
//   progressBar: { flex: 1, height: 3, borderRadius: 4 },
//   flexOne: { flex: 1 },
//   centerWrapper: { flex: 1, justifyContent: 'center' },
//   formGroup: { gap: 40, width: '100%' },
//   textCenterBlock: { alignItems: 'center', justifyContent: 'center', gap: 4 },
//   titleText: { fontSize: 32, color: '#000000', textAlign: 'center', lineHeight: 38, letterSpacing: -0.5 },
//   subtitleText: { fontSize: 14, color: '#4B5563', textAlign: 'center', lineHeight: 20, paddingHorizontal: 8 },
//   inputActionStack: { width: '100%', gap: 24 },
//   metaControlStack: { gap: 24 },
//   infoText: { fontSize: 12, color: '#4B5563', textAlign: 'center' },
//   underlineLink: { fontSize: 12, textDecorationLine: 'underline', color: '#000000' },
//   btnTextPrimary: { fontSize: 16, color: '#000000', textAlign: 'center' },
//   successContainer: { flex: 1, justifyContent: 'center', width: '100%' },
//   successGroup: { gap: 48, width: '100%' },
//   successBtnWrap: { width: '100%' },
// });

// export default Verification;