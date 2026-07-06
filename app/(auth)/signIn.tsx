// import Button from "@/components/controls/Button";
// import Text from "@/skeleton/Text";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Image, TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
// import { z } from "zod";
// import FormInput from "@/components/controls/DynamicInput";

// const { width } = Dimensions.get("window");

// // validation schema
// const formSchema = z.object({
//   email: z.string().email("Enter a valid email address"),
//   password: z.string().min(1, "Password is required"),
// });

// type FormData = z.infer<typeof formSchema>;

// const Welcome = () => {
//   const [loader, setloader] = useState(false);
//   const router = useRouter();
  
//   const {
//     control,
//     handleSubmit,
//     setError,
//     reset,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (data: FormData) => {
//     setloader(true);
//     try {
//       console.log("SignIn data:", data);
//       reset();
//       router.push("/(main)/(tabs)");
//     } catch (error: any) {
//       console.log("error: ", error);
//       setError("email", {
//         type: "manual",
//         message: "Unable to sign in. Please try again.",
//       });
//     } finally {
//       setloader(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.cardContainer}>
        
//         {/* Zwigato Logo Box */}
//         <View style={styles.logoWrapper}>
//           <Image
//             source={require("../../assets/zwigato.jpg")}
//             style={styles.logo}
//           />
//         </View>

//         <View style={styles.formContent}>
//           <View style={styles.mainSection}>
            
//             {/* Header Text Section */}
//             <View style={styles.textHeaderBlock}>
//               <Text variant="semibold" style={styles.titleText}>
//                 Welcome back
//               </Text>
//                 <Text style={styles.subtitleText}>
//                   Log in to discover exclusive deals today
//                 </Text>
//             </View>

//             {/* Inputs & Controls Wrapper */}
//             <View style={styles.inputWrapper}>
//               <FormInput
//                 control={control}
//                 name="email"
//                 placeholder="Email"
//                 type="text"
//                 error={errors.email}
//               />
//               <FormInput
//                 control={control}
//                 name="password"
//                 placeholder="Enter password"
//                 type="password"
//                 error={errors.password}
//               />

//               {/* Remember Me & Forgot Password Row */}
//               <View style={styles.rowActions}>
//                 <View style={styles.checkboxContainer}>
//                   <FormInput
//                     control={control}
//                     name="check-box"
//                     label="Remember me"
//                     type="checkbox"
//                   />
//                 </View>
//                 <TouchableOpacity onPress={() => router.push("/forgetPassword")}>
//                   <Text style={styles.forgotPasswordText}>
//                     Forgot password?
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//               {/* Submission Buttons */}
//               <View style={styles.buttonStack}>
//                 <Button
//                   variant="primary"
//                   loading={loader}
//                   onPress={handleSubmit(onSubmit)}
//                 >
//                   <Text variant="medium" style={styles.btnTextPrimary}>
//                     Login
//                   </Text>
//                 </Button>
                
//                 <TouchableOpacity style={styles.faceIdButton}>
//                   <Image
//                     source={require("../../assets/Vector.png")}
//                     style={styles.faceIdIcon}
//                   />
//                   <Text variant="medium" style={styles.btnTextSecondary}>
//                     Login with Face ID
//                   </Text>
//                 </TouchableOpacity>
//               </View>
              
//             </View>
//           </View>

//           {/* Footer Navigation Link */}
//           <View style={styles.footerRow}>
//             <Text style={styles.footerText}>
//               Don&apos;t have an account?
//             </Text>
//             <TouchableOpacity onPress={() => router.push("/signUp")}>
//               <Text style={styles.signUpLink}> Sign Up</Text>
//             </TouchableOpacity>
//           </View>
          
//         </View>
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
//     backgroundColor: '#FFFFFF',
//     borderRadius: 24,
//     marginTop: 28,
//     height: '90%',
//     paddingHorizontal: 8,
//     paddingTop: 8,
//     paddingBottom: 16,
//     width: '90%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   logoWrapper: {
//     paddingLeft: 8,
//     // marginTop: 4,
//   },
//   logo: {
//     width: 52,
//     height: 52,
//     borderRadius: 12,
//   },
//   formContent: {
//     paddingHorizontal: 12,
//     flex: 1,
//   },
//   mainSection: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   textHeaderBlock: {
//     alignItems: 'center',
//     marginBottom: 32,
//   },
//   titleText: {
//     fontSize: 26,
//     color: '#000000',
//     textAlign: 'center',
//   },
//   subtitleText: {
//     fontSize: 12,
//     color: '#4B5563',
//     marginTop: 4,
//     textAlign: 'center',
//   },
//   inputWrapper: {
//     gap: 12,
//   },
//   rowActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 4,
//     width: '100%',
//   },
//   checkboxContainer: {
//     width: '50%',
//   },
//   forgotPasswordText: {
//     fontSize: 12,
//     textDecorationLine: 'underline',
//     color: '#1F2937',
//   },
//   buttonStack: {
//     gap: 16,
//     marginTop: 12,
//   },
//   btnTextPrimary: {
//     fontSize: 16,
//     color: '#000000',
//     textAlign: 'center',
//   },
//   btnTextSecondary: {
//     fontSize: 16,
//     color: '#374151',
//   },
//   faceIdButton: {
//     borderWidth: 1,
//     paddingVertical: 12,
//     borderColor: '#CBD5E1',
//     borderRadius: 16,
//     flexDirection: 'row',
//     gap: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'transparent',
//   },
//   faceIdIcon: {
//     height: 16,
//     width: 16,
//     resizeMode: 'contain',
//   },
//   footerRow: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 8,
//     flexDirection: 'row',
//   },
//   footerText: {
//     fontSize: 12,
//     color: '#4B5563',
//   },
//   signUpLink: {
//     fontSize: 12,
//     textDecorationLine: 'underline',
//     fontWeight: '600',
//     color: '#000000',
//   },
// });

// export default Welcome;

import Button from "@/components/controls/Button";
import Text from "@/skeleton/Text";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, TouchableOpacity, View, StyleSheet, Dimensions, Alert } from "react-native";
import { z } from "zod";
import FormInput from "@/components/controls/DynamicInput";

// ── IMPORT REAL API NETWORK GATEWAYS & CONTROLLERS ──
import Routes from "../../src/constants/apiRoutes";
import { request } from "../../src/controller/fetchApiController";
import { saveTokens } from "../../src/controller/tokenController";

const { width } = Dimensions.get("window");

const formSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof formSchema>;

const Welcome = () => {
  const [loader, setloader] = useState(false);
  const router = useRouter();
  
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
    },
  });

  // ── HANDLES SECURE AUTHENTICATION FLOW ──
  const onSubmit = async (data: FormData) => {
    setloader(true);
    console.log("================ [API REQ: SIGNIN] ================");
    console.log("Sending Credentials Mapping:", { email: data.email });

    try {
      // POST Request triggers to /auth/login
      const response = await request(Routes.login, "POST", {
        body: {
          email: data.email,
          password: data.password,
        }
      });

      console.log("================ [API RES: SIGNIN SUCCESS] ================");
      console.log("Auth Response Data Package:", response);

      // Secure Store calls to persist Bearer Token globally inside phone device
      if (response && (response.token || response.accessToken)) {
        await saveTokens(response);
        console.log("Authentication secure handshakes completed successfully!");
      } else {
        console.warn("Warning: No token found inside the server response body layout.");
      }

      reset();
      // Dispatch cleanly into main protected application tab flows
      router.replace("/(main)/(tabs)");

    } catch (error: any) {
      console.log("================ [API RES: SIGNIN FAILED] ================");
      console.log("Detailed Error Logs:", error);

      const serverErrorMessage = error?.errorData?.message || "Unable to sign in. Please try again.";
      setError("email", {
        type: "manual",
        message: serverErrorMessage,
      });
      Alert.alert("Login Failed", serverErrorMessage);
    } finally {
      setloader(false);
    }
  };

  return (
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
          <View style={styles.mainSection}>
            
            {/* Header Text Section */}
            <View style={styles.textHeaderBlock}>
              <Text variant="semibold" style={styles.titleText}>
                Welcome back
              </Text>
              <Text style={styles.subtitleText}>
                Log in to discover exclusive deals today
              </Text>
            </View>

            {/* Inputs & Controls Wrapper */}
            <View style={styles.inputWrapper}>
              <FormInput
                control={control}
                name="email"
                placeholder="Email"
                type="text"
                error={errors.email}
              />
              <FormInput
                control={control}
                name="password"
                placeholder="Enter password"
                type="password"
                error={errors.password}
              />

              {/* Remember Me & Forgot Password Row */}
              <View style={styles.rowActions}>
                <View style={styles.checkboxContainer}>
                  <FormInput
                    control={control}
                    name="check-box"
                    label="Remember me"
                    type="checkbox"
                  />
                </View>
                <TouchableOpacity onPress={() => router.push("/forgetPassword")}>
                  <Text style={styles.forgotPasswordText}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Submission Buttons */}
              <View style={styles.buttonStack}>
                <Button
                  variant="primary"
                  loading={loader}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text variant="medium" style={styles.btnTextPrimary}>
                    Login
                  </Text>
                </Button>
                
                <TouchableOpacity style={styles.faceIdButton}>
                  <Image
                    source={require("../../assets/Vector.png")}
                    style={styles.faceIdIcon}
                  />
                  <Text variant="medium" style={styles.btnTextSecondary}>
                    Login with Face ID
                  </Text>
                </TouchableOpacity>
              </View>
              
            </View>
          </View>

          {/* Footer Navigation Link */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>
              Don&apos;t have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push("/signUp")}>
              <Text style={styles.signUpLink}> Sign Up</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFF1F3', justifyContent: 'center', alignItems: 'center' },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginTop: 28,
    height: '90%',
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 16,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  logoWrapper: { paddingLeft: 8 },
  logo: { width: 52, height: 52, borderRadius: 12 },
  formContent: { paddingHorizontal: 12, flex: 1 },
  mainSection: { flex: 1, justifyContent: 'center' },
  textHeaderBlock: { alignItems: 'center', marginBottom: 32 },
  titleText: { fontSize: 26, color: '#000000', textAlign: 'center' },
  subtitleText: { fontSize: 12, color: '#4B5563', marginTop: 4, textAlign: 'center' },
  inputWrapper: { gap: 12 },
  rowActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, width: '100%' },
  checkboxContainer: { width: '50%' },
  forgotPasswordText: { fontSize: 12, textDecorationLine: 'underline', color: '#1F2937' },
  buttonStack: { gap: 16, marginTop: 12 },
  btnTextPrimary: { fontSize: 16, color: '#000000', textAlign: 'center' },
  btnTextSecondary: { fontSize: 16, color: '#374151' },
  faceIdButton: {
    borderWidth: 1,
    paddingVertical: 12,
    borderColor: '#CBD5E1',
    borderRadius: 16,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  faceIdIcon: { height: 16, width: 16, resizeMode: 'contain' },
  footerRow: { justifyContent: 'center', alignItems: 'center', paddingTop: 8, flexDirection: 'row' },
  footerText: { fontSize: 12, color: '#4B5563' },
  signUpLink: { fontSize: 12, textDecorationLine: 'underline', fontWeight: '600', color: '#000000' },
});

export default Welcome;