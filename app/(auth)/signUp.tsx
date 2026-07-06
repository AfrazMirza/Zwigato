// import Text from "@/skeleton/Text";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import {
//   Alert,
//   Dimensions,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { z } from "zod";
// import Button from "@/components/controls/Button";
// import FormInput from "@/components/controls/DynamicInput";

// // validation schema - format safe checks added
// const formSchema = z.object({
//   email: z.string().email("Enter a valid email address"), // fix string format check
//   phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   agreeTerms: z.boolean().refine((val) => val === true, {
//     message: "You must agree to the terms and conditions",
//   }),
// });

// //TypeScript type from schema
// type FormData = z.infer<typeof formSchema>;

// const { width } = Dimensions.get("window");

// const SignUp = () => {
//   const router = useRouter();
//   const [loader, setloader] = useState(false);
  
//   // resolver
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
//       phone: "",
//       agreeTerms: false,
//     },
//   });

//   const onSubmit = async (data: FormData) => {
//     setloader(true);
//     try {
//       console.log("SignUp data:", data);
//       reset();
//       router.push("/verification");
//     } catch (error: any) {
//       console.log("Email Error:-", error);
//       setError("email", {
//         type: "manual",
//         message: "Unable to register. Please try again.",
//       });
//     } finally {
//       setloader(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -40}
//       style={styles.keyboardView}
//     >
//       <View style={styles.container}>
//         <View style={styles.cardContainer}>
          
//           {/* Zwigato Logo Box */}
//           <View style={styles.logoWrapper}>
//             <Image
//               source={require("../../assets/zwigato.jpg")}
//               style={styles.logo}
//             />
//           </View>

//           <View style={styles.formContent}>
//             <View style={styles.mainWrapper}>
              
//               {/* ScrollView Wrapper for New Architecture Stability */}
//               <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={styles.scrollContent}
//                 keyboardShouldPersistTaps="handled"
//               >
//                 <View style={styles.innerLayout}>
                  
//                   {/* Header Text Section */}
//                   <View style={styles.headerBlock}>
//                     <Text variant="semibold" style={styles.titleText}>
//                       Welcome to Zwigato
//                     </Text>
//                     <Text style={styles.subtitleText}>
//                       Your ultimate fashion & shopping destination
//                     </Text>
//                   </View>

//                   {/* Inputs Section */}
//                   <View style={styles.inputsBlock}>
//                     <View style={styles.inputStack}>
//                       <FormInput
//                         control={control}
//                         placeholder="Enter email"
//                         name="email"
//                         type="text"
//                         error={errors.email}
//                       />
//                       <FormInput
//                         control={control}
//                         placeholder="Phone Number"
//                         name="phone"
//                         type="phone"
//                         error={errors.phone}
//                       />
//                       <FormInput
//                         control={control}
//                         name="password"
//                         placeholder="Password"
//                         type="password"
//                         error={errors.password}
//                       />

//                       {/* Terms Checkbox Wrap */}
//                       <View style={styles.checkboxWrapper}>
//                         <FormInput
//                           control={control}
//                           name="agreeTerms"
//                           label="I agree to the terms and service and privacy policy"
//                           type="checkbox"
//                           error={errors.agreeTerms}
//                         />
//                       </View>
//                     </View>

//                     {/* Primary SignUp Button */}
//                     <View style={styles.mainActionBlock}>
//                       <Button
//                         loading={loader}
//                         variant="primary"
//                         onPress={handleSubmit(onSubmit)}
//                       >
//                         <Text variant="semibold" style={styles.btnTextPrimary}>
//                           Sign Up
//                         </Text>
//                       </Button>
//                     </View>

//                     {/* Social SignUp Divider & Buttons */}
//                     <View style={styles.socialActionBlock}>
//                       <Text style={styles.dividerText}>
//                         Or sign up with
//                       </Text>
//                       <View style={styles.socialButtonsRow}>
//                         <View style={styles.socialBtnWrap}>
//                           <Button
//                             variant="secondary"
//                             onPress={() => Alert.alert("Google Sign Up clicked")}
//                           >
//                              Google
//                           </Button>
//                         </View>
//                         <View style={styles.socialBtnWrap}>
//                           <Button
//                             variant="secondary"
//                             onPress={() => Alert.alert("Apple Sign Up clicked")}
//                           >
//                              Apple
//                           </Button>
//                         </View>
//                       </View>
//                     </View>
                    
//                   </View>
//                 </View>
//               </ScrollView>

//               {/* Footer Login Link (Fixed Bottom) */}
//               <View style={styles.footerRow}>
//                 <Text style={styles.footerText}>
//                   Already have an account?
//                 </Text>
//                 <TouchableOpacity onPress={() => router.push("/signIn")}>
//                   <Text style={styles.loginLink}> Login</Text>
//                 </TouchableOpacity>
//               </View>
              
//             </View>
//           </View>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   keyboardView: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#EFF1F3',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cardContainer: {
//     paddingHorizontal: 8,
//     paddingTop: 8,
//     paddingBottom: 16,
//     gap: 16, // using standard gap prop supported in newer RN versions
//     marginTop: 28,
//     height: '90%',
//     borderRadius: 24,
//     backgroundColor: '#FFFFFF',
//     width: '90%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   logoWrapper: {
//     paddingLeft: 8,
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
//   mainWrapper: {
//     flex: 1,
//     width: '100%',
//     justifyContent: 'space-between',
//   },
//   scrollContent: {
//     flexGrow: 1,
//   },
//   innerLayout: {
//     gap: 32, // gap between header and input stack
//   },
//   headerBlock: {
//     alignItems: 'center',
//   },
//   titleText: {
//     fontSize: 26,
//     color: '#000000',
//     textAlign: 'center',
//     lineHeight: 38,
//     letterSpacing: -0.5,
//   },
//   subtitleText: {
//     fontSize: 12,
//     color: '#4B5563',
//     marginTop: 4,
//     textAlign: 'center',
//   },
//   inputsBlock: {
//     // gap: 20, // using Gap for consistent spacing between inputs and blocks
//   },
//   inputStack: {
//     gap: 12,
//   },
//   checkboxWrapper: {
//     marginLeft: 12,
//   },
//   mainActionBlock: {
//     marginTop: 22,
//     marginBottom: 22,
//   },
//   btnTextPrimary: {
//     fontSize: 16,
//     color: '#000000',
//     textAlign: 'center',
//   },
//   socialActionBlock: {
//     alignItems: 'center',
//     gap: 20,
//     marginBottom: 16,
//   },
//   dividerText: {
//     fontSize: 12,
//     color: '#4B5563',
//   },
//   socialButtonsRow: {
//     flexDirection: 'row',
//     gap: 12,
//     justifyContent: 'center',
//     width: '100%',
//     paddingHorizontal: 2,
//   },
//   socialBtnWrap: {
//     flex: 1, // equal width distribution
//   },
//   footerRow: {
//     justifyContent: 'center',
//     paddingTop: 8,
//     alignItems: 'center',
//     flexDirection: 'row',
//     borderTopWidth: 1,
//     borderTopColor: '#F3F4F6', // light separator
//   },
//   footerText: {
//     fontSize: 12,
//     color: '#4B5563',
//   },
//   loginLink: {
//     fontSize: 12,
//     textDecorationLine: 'underline',
//     fontWeight: '600',
//     color: '#000000',
//   },
// });

// export default SignUp;

// import Text from "@/skeleton/Text";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import {
//   Alert,
//   Dimensions,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { z } from "zod";
// import Button from "@/components/controls/Button";
// import FormInput from "@/components/controls/DynamicInput";

// // ── IMPORT RECONSTRUCTED REAL API ROUTERS ──
// import Routes from "../../src/constants/apiRoutes";
// import { request } from "../../src/controller/fetchApiController";

// // validation schema - format safe checks added
// const formSchema = z.object({
//   email: z.string().email("Enter a valid email address"),
//   phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   agreeTerms: z.boolean().refine((val) => val === true, {
//     message: "You must agree to the terms and conditions",
//   }),
// });

// type FormData = z.infer<typeof formSchema>;

// const { width } = Dimensions.get("window");

// const SignUp = () => {
//   const router = useRouter();
//   const [loader, setloader] = useState(false);
  
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
//       phone: "",
//       agreeTerms: false,
//     },
//   });

//   // ── HANDLES REAL-TIME REGISTRATION FLOW ──
//   const onSubmit = async (data: FormData) => {
//     setloader(true);
    
//     // 1. Correct Payload Object Creation mapping directly to what the backend wants
//     const targetPayload = {
//       name: "Customer User", 
//       email: data.email,
//       phoneNumber: data.phone,         // 👈 Match backend validation rules
//       password: data.password,
//       password_confirmation: data.password, // 👈 Automated directly from inputs
//       userType: "customer"            // 👈 Explicit user classification routing
//     };

//     console.log("================ [API REQ: SIGNUP] ================");
//     console.log("Sending Payload Sync:", JSON.stringify(targetPayload));

//     try {
//       // 2. POST Request triggers to /api/auth/register with the corrected object body
//       const response = await request(Routes.register, "POST", {
//         body: targetPayload // 👈 FIX: Dynamic clean object mapping replacement
//       });

//       console.log("================ [API RES: SIGNUP SUCCESS] ================");
//       console.log("Response Data:", response);

//       reset();
//       router.push({
//         pathname: "/verification",
//         params: { email: data.email }
//       });

//     } catch (error: any) {
//       console.log("================ [API RES: SIGNUP FAILED] ================");
//       console.log("Detailed Error logs:", error);
      
//       // Parse detailed database message arrays dynamically if present
//       const serverErrorMessage = error?.errorData?.errors 
//         ? Object.values(error.errorData.errors).join(", ")
//         : (error?.errorData?.message || "Unable to register. Please try again.");
        
//       setError("email", {
//         type: "manual",
//         message: serverErrorMessage,
//       });
//       Alert.alert("Registration Failed", serverErrorMessage);
//     } finally {
//       setloader(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -40}
//       style={styles.keyboardView}
//     >
//       <View style={styles.container}>
//         <View style={styles.cardContainer}>
          
//           {/* Zwigato Logo Box */}
//           <View style={styles.logoWrapper}>
//             <Image
//               source={require("../../assets/zwigato.jpg")}
//               style={styles.logo}
//             />
//           </View>

//           <View style={styles.formContent}>
//             <View style={styles.mainWrapper}>
              
//               <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={styles.scrollContent}
//                 keyboardShouldPersistTaps="handled"
//               >
//                 <View style={styles.innerLayout}>
                  
//                   {/* Header Text Section */}
//                   <View style={styles.headerBlock}>
//                     <Text variant="semibold" style={styles.titleText}>
//                       Welcome to Zwigato
//                     </Text>
//                     <Text style={styles.subtitleText}>
//                       Your ultimate fashion & shopping destination
//                     </Text>
//                   </View>

//                   {/* Inputs Section */}
//                   <View style={styles.inputsBlock}>
//                     <View style={styles.inputStack}>
//                       <FormInput
//                         control={control}
//                         placeholder="Enter email"
//                         name="email"
//                         type="text"
//                         error={errors.email}
//                       />
//                       <FormInput
//                         control={control}
//                         placeholder="Phone Number"
//                         name="phone"
//                         type="phone"
//                         error={errors.phone}
//                       />
//                       <FormInput
//                         control={control}
//                         name="password"
//                         placeholder="Password"
//                         type="password"
//                         error={errors.password}
//                       />

//                       {/* Terms Checkbox Wrap */}
//                       <View style={styles.checkboxWrapper}>
//                         <FormInput
//                           control={control}
//                           name="agreeTerms"
//                           label="I agree to the terms and service and privacy policy"
//                           type="checkbox"
//                           error={errors.agreeTerms}
//                         />
//                       </View>
//                     </View>

//                     {/* Primary SignUp Button */}
//                     <View style={styles.mainActionBlock}>
//                       <Button
//                         loading={loader}
//                         variant="primary"
//                         onPress={handleSubmit(onSubmit)}
//                       >
//                         <Text variant="semibold" style={styles.btnTextPrimary}>
//                           Sign Up
//                         </Text>
//                       </Button>
//                     </View>

//                     {/* Social SignUp Divider */}
//                     <View style={styles.socialActionBlock}>
//                       <Text style={styles.dividerText}>
//                         Or sign up with
//                       </Text>
//                       <View style={styles.socialButtonsRow}>
//                         <View style={styles.socialBtnWrap}>
//                           <Button
//                             variant="secondary"
//                             onPress={() => Alert.alert("Google Sign Up clicked")}
//                           >
//                              Google
//                           </Button>
//                         </View>
//                         <View style={styles.socialBtnWrap}>
//                           <Button
//                             variant="secondary"
//                             onPress={() => Alert.alert("Apple Sign Up clicked")}
//                           >
//                              Apple
//                           </Button>
//                         </View>
//                       </View>
//                     </View>
                    
//                   </View>
//                 </View>
//               </ScrollView>

//               {/* Footer Login Link (Fixed Bottom) */}
//               <View style={styles.footerRow}>
//                 <Text style={styles.footerText}>
//                   Already have an account?
//                 </Text>
//                 <TouchableOpacity onPress={() => router.push("/signIn")}>
//                   <Text style={styles.loginLink}> Login</Text>
//                 </TouchableOpacity>
//               </View>
              
//             </View>
//           </View>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   keyboardView: { flex: 1 },
//   container: { flex: 1, backgroundColor: '#EFF1F3', justifyContent: 'center', alignItems: 'center' },
//   cardContainer: {
//     paddingHorizontal: 8,
//     paddingTop: 8,
//     paddingBottom: 16,
//     gap: 16,
//     marginTop: 28,
//     height: '90%',
//     borderRadius: 24,
//     backgroundColor: '#FFFFFF',
//     width: '90%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   logoWrapper: { paddingLeft: 8 },
//   logo: { width: 52, height: 52, borderRadius: 12 },
//   formContent: { paddingHorizontal: 12, flex: 1 },
//   mainWrapper: { flex: 1, width: '100%', justifyContent: 'space-between' },
//   scrollContent: { flexGrow: 1 },
//   innerLayout: { gap: 32 },
//   headerBlock: { alignItems: 'center' },
//   titleText: { fontSize: 26, color: '#000000', textAlign: 'center', lineHeight: 38, letterSpacing: -0.5 },
//   subtitleText: { fontSize: 12, color: '#4B5563', marginTop: 4, textAlign: 'center' },
//   inputsBlock: {},
//   inputStack: { gap: 12 },
//   checkboxWrapper: { marginLeft: 12 },
//   mainActionBlock: { marginTop: 22, marginBottom: 22 },
//   btnTextPrimary: { fontSize: 16, color: '#000000', textAlign: 'center' },
//   socialActionBlock: { alignItems: 'center', gap: 20, marginBottom: 16 },
//   dividerText: { fontSize: 12, color: '#4B5563' },
//   socialButtonsRow: { flexDirection: 'row', gap: 12, justifyContent: 'center', width: '100%', paddingHorizontal: 2 },
//   socialBtnWrap: { flex: 1 },
//   footerRow: { justifyContent: 'center', paddingTop: 8, alignItems: 'center', flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#F3F4F6' },
//   footerText: { fontSize: 12, color: '#4B5563' },
//   loginLink: { fontSize: 12, textDecorationLine: 'underline', fontWeight: '600', color: '#000000' },
// });

// export default SignUp;


// import Text from "@/skeleton/Text";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import {
//   Alert,
//   Dimensions,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { z } from "zod";
// import Button from "@/components/controls/Button";
// import FormInput from "@/components/controls/DynamicInput";

// // ── IMPORT RECONSTRUCTED REAL API ROUTERS ──
// import Routes from "../../src/constants/apiRoutes";
// import { request } from "../../src/controller/fetchApiController";

// // validation schema - format safe checks added
// const formSchema = z.object({
//   email: z.string().email("Enter a valid email address"),
//   phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   agreeTerms: z.boolean().refine((val) => val === true, {
//     message: "You must agree to the terms and conditions",
//   }),
// });

// type FormData = z.infer<typeof formSchema>;

// const { width } = Dimensions.get("window");

// const SignUp = () => {
//   const router = useRouter();
//   const [loader, setloader] = useState(false);
  
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
//       phone: "",
//       agreeTerms: false,
//     },
//   });

//   // ── HANDLES REAL-TIME REGISTRATION FLOW ──
//   const onSubmit = async (data: FormData) => {
//     setloader(true);
    
//     // 1. Correct Payload Object Creation mapping directly to what the backend wants
//     const targetPayload = {
//   name: "Customer User", 
//   email: data.email.trim().toLowerCase(),
//   phone: data.phone.trim(),              // 👈 Check karo 'phone' hai ya 'phoneNumber'
//   password: data.password,
//   password_confirmation: data.password, 
//   role: "customer"                      // 👈 Check karo 'role' hai ya 'userType'
// };
//     // const targetPayload = {
//     //   name: "Customer User", 
//     //   email: data.email,
//     //   phoneNumber: data.phone,         // 👈 Match backend validation rules
//     //   password: data.password,
//     //   password_confirmation: data.password, // 👈 Automated directly from inputs
//     //   userType: "customer"            // 👈 Explicit user classification routing
//     // };

//     console.log("================ [API REQ: SIGNUP] ================");
//     console.log("Sending Payload Sync:", JSON.stringify(targetPayload));

//     try {
//       // 2. POST Request triggers to /api/auth/register with the corrected object body
//       const response = await request(Routes.register, "POST", {
//         body: targetPayload // 👈 FIX: Dynamic clean object mapping replacement
//       });

//       console.log("================ [API RES: SIGNUP SUCCESS] ================");
//       console.log("Response Data:", response);

//       reset();
//       router.push({
//         pathname: "/verification",
//         params: { email: data.email }
//       });

//     } catch (error: any) {
//       console.log("================ [API RES: SIGNUP FAILED] ================");
//       console.log("Detailed Error logs:", error);
      
//       // Parse detailed database message arrays dynamically if present
//       const serverErrorMessage = error?.errorData?.errors 
//         ? Object.values(error.errorData.errors).join(", ")
//         : (error?.errorData?.message || "Unable to register. Please try again.");
        
//       setError("email", {
//         type: "manual",
//         message: serverErrorMessage,
//       });
//       Alert.alert("Registration Failed", serverErrorMessage);
//     } finally {
//       setloader(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -40}
//       style={styles.keyboardView}
//     >
//       <View style={styles.container}>
//         <View style={styles.cardContainer}>
          
//           {/* Zwigato Logo Box */}
//           <View style={styles.logoWrapper}>
//             <Image
//               source={require("../../assets/zwigato.jpg")}
//               style={styles.logo}
//             />
//           </View>

//           <View style={styles.formContent}>
//             <View style={styles.mainWrapper}>
              
//               <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={styles.scrollContent}
//                 keyboardShouldPersistTaps="handled"
//               >
//                 <View style={styles.innerLayout}>
                  
//                   {/* Header Text Section */}
//                   <View style={styles.headerBlock}>
//                     <Text variant="semibold" style={styles.titleText}>
//                       Welcome to Zwigato
//                     </Text>
//                     <Text style={styles.subtitleText}>
//                       Your ultimate fashion & shopping destination
//                     </Text>
//                   </View>

//                   {/* Inputs Section */}
//                   <View style={styles.inputsBlock}>
//                     <View style={styles.inputStack}>
//                       <FormInput
//                         control={control}
//                         placeholder="Enter email"
//                         name="email"
//                         type="text"
//                         error={errors.email}
//                       />
//                       <FormInput
//                         control={control}
//                         placeholder="Phone Number"
//                         name="phone"
//                         type="phone"
//                         error={errors.phone}
//                       />
//                       <FormInput
//                         control={control}
//                         name="password"
//                         placeholder="Password"
//                         type="password"
//                         error={errors.password}
//                       />

//                       {/* Terms Checkbox Wrap */}
//                       <View style={styles.checkboxWrapper}>
//                         <FormInput
//                           control={control}
//                           name="agreeTerms"
//                           label="I agree to the terms and service and privacy policy"
//                           type="checkbox"
//                           error={errors.agreeTerms}
//                         />
//                       </View>
//                     </View>

//                     {/* Primary SignUp Button */}
//                     <View style={styles.mainActionBlock}>
//                       <Button
//                         loading={loader}
//                         variant="primary"
//                         onPress={handleSubmit(onSubmit)}
//                       >
//                         <Text variant="semibold" style={styles.btnTextPrimary}>
//                           Sign Up
//                         </Text>
//                       </Button>
//                     </View>

//                     {/* Social SignUp Divider */}
//                     <View style={styles.socialActionBlock}>
//                       <Text style={styles.dividerText}>
//                         Or sign up with
//                       </Text>
//                       <View style={styles.socialButtonsRow}>
//                         <View style={styles.socialBtnWrap}>
//                           <Button
//                             variant="secondary"
//                             onPress={() => Alert.alert("Google Sign Up clicked")}
//                           >
//                              Google
//                           </Button>
//                         </View>
//                         <View style={styles.socialBtnWrap}>
//                           <Button
//                             variant="secondary"
//                             onPress={() => Alert.alert("Apple Sign Up clicked")}
//                           >
//                              Apple
//                           </Button>
//                         </View>
//                       </View>
//                     </View>
                    
//                   </View>
//                 </View>
//               </ScrollView>

//               {/* Footer Login Link (Fixed Bottom) */}
//               <View style={styles.footerRow}>
//                 <Text style={styles.footerText}>
//                   Already have an account?
//                 </Text>
//                 <TouchableOpacity onPress={() => router.push("/signIn")}>
//                   <Text style={styles.loginLink}> Login</Text>
//                 </TouchableOpacity>
//               </View>
              
//             </View>
//           </View>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   keyboardView: { flex: 1 },
//   container: { flex: 1, backgroundColor: '#EFF1F3', justifyContent: 'center', alignItems: 'center' },
//   cardContainer: {
//     paddingHorizontal: 8,
//     paddingTop: 8,
//     paddingBottom: 16,
//     gap: 16,
//     marginTop: 28,
//     height: '90%',
//     borderRadius: 24,
//     backgroundColor: '#FFFFFF',
//     width: '90%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   logoWrapper: { paddingLeft: 8 },
//   logo: { width: 52, height: 52, borderRadius: 12 },
//   formContent: { paddingHorizontal: 12, flex: 1 },
//   mainWrapper: { flex: 1, width: '100%', justifyContent: 'space-between' },
//   scrollContent: { flexGrow: 1 },
//   innerLayout: { gap: 32 },
//   headerBlock: { alignItems: 'center' },
//   titleText: { fontSize: 26, color: '#000000', textAlign: 'center', lineHeight: 38, letterSpacing: -0.5 },
//   subtitleText: { fontSize: 12, color: '#4B5563', marginTop: 4, textAlign: 'center' },
//   inputsBlock: {},
//   inputStack: { gap: 12 },
//   checkboxWrapper: { marginLeft: 12 },
//   mainActionBlock: { marginTop: 22, marginBottom: 22 },
//   btnTextPrimary: { fontSize: 16, color: '#000000', textAlign: 'center' },
//   socialActionBlock: { alignItems: 'center', gap: 20, marginBottom: 16 },
//   dividerText: { fontSize: 12, color: '#4B5563' },
//   socialButtonsRow: { flexDirection: 'row', gap: 12, justifyContent: 'center', width: '100%', paddingHorizontal: 2 },
//   socialBtnWrap: { flex: 1 },
//   footerRow: { justifyContent: 'center', paddingTop: 8, alignItems: 'center', flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#F3F4F6' },
//   footerText: { fontSize: 12, color: '#4B5563' },
//   loginLink: { fontSize: 12, textDecorationLine: 'underline', fontWeight: '600', color: '#000000' },
// });

// export default SignUp;

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

// ── IMPORT RECONSTRUCTED REAL API ROUTERS ──
import Routes from "../../src/constants/apiRoutes";
import { request } from "../../src/controller/fetchApiController";

const formSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type FormData = z.infer<typeof formSchema>;

const SignUp = () => {
  const router = useRouter();
  const [loader, setloader] = useState(false);
  
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
    
    // Dynamic naming normalization for target databases
    const dynamicName = data.email.split('@')[0];

    // Explicit payload configuration to bypass global vendor arrays fallback
    // const targetPayload = {
    //   name: dynamicName, 
    //   email: data.email.trim().toLowerCase(),
    //   phone: data.phone.trim(),
    //   password: data.password,
    //   password_confirmation: data.password, 
    //   role: "customer",         // Swagger standard key
    //   user_type: "customer",    // Fallback key to avoid vendor selection overlap
    //   userType: "customer"      // Extra fallback node safety
    // };

    // ── HACK PAYLOAD TO FORCE BYPASS VENDOR VALIDATION ──
    const targetPayload = {
      name: dynamicName, 
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      password: data.password,
      password_confirmation: data.password, 
      role: "customer",
    };

    console.log("================ [API REQ: SIGNUP MULTI-ROLE] ================");
    console.log("Sending Payload Sync:", JSON.stringify(targetPayload));

    try {
      const response = await request(Routes.register, "POST", {
        body: targetPayload
      });

      console.log("================ [API RES: SIGNUP SUCCESS] ================");
      console.log("Response Data:", response);

      reset();
      
      // Navigate to verification screen with clear fallback params mapping
      router.push({
        pathname: "/verification",
        params: { email: data.email.trim().toLowerCase() }
      });

    } catch (error: any) {
      console.log("================ [API RES: SIGNUP FAILED] ================");
      console.log("Detailed Error logs:", error);
      
      // Extract specific array validation outputs cleanly from backend response layouts
      let serverErrorMessage = "Unable to register. Please try again.";
      
      if (error?.errorData?.errors) {
        const errorObj = error.errorData.errors;
        const firstKey = Object.keys(errorObj)[0];
        if (Array.isArray(errorObj[firstKey])) {
          serverErrorMessage = `${firstKey}: ${errorObj[firstKey][0]}`;
        } else {
          serverErrorMessage = Object.values(errorObj).join(", ");
        }
      } else if (error?.errorData?.message) {
        serverErrorMessage = error.errorData.message;
      }
        
      setError("email", {
        type: "manual",
        message: serverErrorMessage,
      });
      Alert.alert("Registration Failed", serverErrorMessage);
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
          
          <View style={styles.logoWrapper}>
            <Image
              source={require("../../assets/zwigato.jpg")}
              style={styles.logo}
            />
          </View>

          <View style={styles.formContent}>
            <View style={styles.mainWrapper}>
              
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.innerLayout}>
                  
                  <View style={styles.headerBlock}>
                    <Text variant="semibold" style={styles.titleText}>
                      Welcome to Zwigato
                    </Text>
                    <Text style={styles.subtitleText}>
                      Your ultimate fashion & shopping destination
                    </Text>
                  </View>

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

                    <View style={styles.socialActionBlock}>
                      <Text style={styles.dividerText}>Or sign up with</Text>
                      <View style={styles.socialButtonsRow}>
                        <View style={styles.socialBtnWrap}>
                          <Button variant="secondary" onPress={() => Alert.alert("Google Sign Up clicked")}>
                             Google
                          </Button>
                        </View>
                        <View style={styles.socialBtnWrap}>
                          <Button variant="secondary" onPress={() => Alert.alert("Apple Sign Up clicked")}>
                             Apple
                          </Button>
                        </View>
                      </View>
                    </View>
                    
                  </View>
                </View>
              </ScrollView>

              <View style={styles.footerRow}>
                <Text style={styles.footerText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => router.push("/signIn")}>
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
  keyboardView: { flex: 1 },
  container: { flex: 1, backgroundColor: '#EFF1F3', justifyContent: 'center', alignItems: 'center' },
  cardContainer: {
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 16,
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
  logoWrapper: { paddingLeft: 8 },
  logo: { width: 52, height: 52, borderRadius: 12 },
  formContent: { paddingHorizontal: 12, flex: 1 },
  mainWrapper: { flex: 1, width: '100%', justifyContent: 'space-between' },
  scrollContent: { flexGrow: 1 },
  innerLayout: { gap: 32 },
  headerBlock: { alignItems: 'center' },
  titleText: { fontSize: 26, color: '#000000', textAlign: 'center', lineHeight: 38, letterSpacing: -0.5 },
  subtitleText: { fontSize: 12, color: '#4B5563', marginTop: 4, textAlign: 'center' },
  inputsBlock: {},
  inputStack: { gap: 12 },
  checkboxWrapper: { marginLeft: 12 },
  mainActionBlock: { marginTop: 22, marginBottom: 22 },
  btnTextPrimary: { fontSize: 16, color: '#000000', textAlign: 'center' },
  socialActionBlock: { alignItems: 'center', gap: 20, marginBottom: 16 },
  dividerText: { fontSize: 12, color: '#4B5563' },
  socialButtonsRow: { flexDirection: 'row', gap: 12, justifyContent: 'center', width: '100%', paddingHorizontal: 2 },
  socialBtnWrap: { flex: 1 },
  footerRow: { justifyContent: 'center', paddingTop: 8, alignItems: 'center', flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  footerText: { fontSize: 12, color: '#4B5563' },
  loginLink: { fontSize: 12, textDecorationLine: 'underline', fontWeight: '600', color: '#000000' },
});

export default SignUp;