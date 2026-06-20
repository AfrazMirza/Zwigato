// import React, { memo, useRef, useState } from "react";
// import Text from "@/skeleton/Text";
// import Feather from "@expo/vector-icons/Feather";
// // import * as ImagePicker from "expo-image-picker";
// import {
//   Control,
//   Controller,
//   FieldError,
//   FieldValues,
//   Path,
// } from "react-hook-form";
// import { Image, TextInput, TouchableOpacity, View } from "react-native";

// interface IFormInput<TFieldValues extends FieldValues> {
//   control: Control<TFieldValues>;
//   name: Path<TFieldValues>;
//   label?: string;
//   placeholder?: string;
//   onChange?: (e: any) => void;
//   type?: "text" | "password" | "otp" | "image" | "phone" | "checkbox";
//   error?: FieldError;
//   upperCase?: boolean;
//   editable?: boolean;
//   containerClassName?: string;
//   onChangeText?: (text: string) => void;
//   onValueChange?: (value: any) => any;

//   maxLength?: number;
//   isDropdown?: boolean;
//   isOpen?: boolean;
//   onDropdownPress?: () => void;
// }

// function FormInput<TFieldValues extends FieldValues = FieldValues>({
//   control,
//   name,
//   label,
//   placeholder,
//   type = "text",
//   containerClassName = "w-full",
//   error,
//   upperCase,

//   editable = true,
//   onValueChange,
//   maxLength,
//   isDropdown = false,
//   onDropdownPress,
//   isOpen = false,
// }: IFormInput<TFieldValues>) {
//   const [secureTextEntry, setSecureTextEntry] = useState(type === "password");
//   const [isFocused, setIsFocused] = useState(false);
//   const inputRef = useRef<TextInput>(null);

//   const togglePasswordVisibility = () => setSecureTextEntry((prev) => !prev);

//   const classes = `
//      h-[52px] flex-row px-4 items-center border-[1px] rounded-[16px] text-gray-800
//      ${
//        isFocused
//          ? "bg-slate-100 border-[#FFEE37]"
//          : "bg-[#EFF1F3] border-[#EBEBEB]"
//      }
//      ${error ? "border border-red-500" : ""}
//   `;

//   const renderInput = (onChange: any, value: any, onBlur: any) => {
//     switch (type) {
//       case "password":
//       case "text":
//         return (
//           <View className={classes}>
//             <TextInput
//               ref={inputRef}
//               placeholder={placeholder}
//               placeholderTextColor="#999999"
//               value={value}
//               // onChangeText={(val) =>
//               //   onChange(upperCase ? val.toUpperCase() : val)
//               // }

//               onChangeText={(val) => {
//                 let processed = upperCase ? val.toUpperCase() : val;

//                 if (onValueChange) {
//                   processed = onValueChange(processed); // returns a STRING
//                 }

//                 onChange(processed); // react-hook-form updates correctly
//               }}
//               style={{
//                 flex: 1,
//                 fontSize: 15,
//                 fontFamily: "Poppins_400Regular",
//                 color: "#1f1f1f",
//                 paddingVertical: 12,
//               }}
//               onBlur={() => {
//                 onBlur();
//                 setIsFocused(false);
//               }}
//               editable={!isDropdown}
//               onFocus={() => setIsFocused(true)}
//               className="flex-1 py-3 text-black"
//               secureTextEntry={secureTextEntry}
//               returnKeyType="next"
//             />
//             {type === "password" && (
//               <TouchableOpacity onPress={togglePasswordVisibility}>
//                 {secureTextEntry ? (
//                   <Image
//                     source={require("../../../assets/closeeye.png")}
//                     style={{ width: 24, height: 24 }}
//                   />
//                 ) : (
//                   <Image
//                     source={require("../../../assets/eyeopen.png")}
//                     style={{ width: 24, height: 24 }}
//                   />
//                 )}
//               </TouchableOpacity>
//             )}

//             {/* DROPDOWN ICON */}
//             {isDropdown && (
//               <TouchableOpacity onPress={onDropdownPress}>
//                 <Feather
//                   name={isOpen ? "chevron-up" : "chevron-down"}
//                   size={20}
//                   color="#1f1f1f"
//                 />
//               </TouchableOpacity>
//             )}
//           </View>
//         );

//       case "otp":
//         const otpRefs = useRef<TextInput[]>([]);
//         const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

//         const handleOTPChange = (
//           text: string,
//           index: number,
//           onChange: any,
//           value: string,
//         ) => {
//           const newValue = value ? value.split("") : Array(6).fill("");
//           newValue[index] = text.slice(-1);
//           const joinedValue = newValue.join("");
//           onChange(joinedValue);

//           // move to next box automatically
//           if (text && index < 5) {
//             otpRefs.current[index + 1]?.focus();
//           }
//         };

//         const handleKeyPress = (e: any, index: number, value: string) => {
//           if (e.nativeEvent.key === "Backspace" && !value[index] && index > 0) {
//             otpRefs.current[index - 1]?.focus();
//           }
//         };

//         return (
//           <View className="flex-row justify-between">
//             {Array.from({ length: 6 }).map((_, index) => {
//               const isFocused = focusedIndex === index;

//               return (
//                 <TextInput
//                   key={index}
//                   ref={(ref: any) => (otpRefs.current[index] = ref!)}
//                   value={value?.[index] || ""}
//                   onChangeText={(text) =>
//                     handleOTPChange(text, index, onChange, value || "")
//                   }
//                   onKeyPress={(e) => handleKeyPress(e, index, value || "")}
//                   keyboardType="number-pad"
//                   maxLength={1}
//                   textAlign="center"
//                   style={{
//                     borderWidth: 1,
//                     borderRadius: 16,
//                     width: 48,
//                     height: 48,
//                     fontFamily: "Poppins_400Regular",
//                     color: "#1f1f1f",
//                     marginHorizontal: 2,
//                     fontSize: 15,
//                     backgroundColor: "#EBEBEB",
//                     borderColor: isFocused ? "#FFEE37" : "#EBEBEB",
//                   }}
//                   cursorColor="#FFEE37"
//                   onFocus={() => setFocusedIndex(index)}
//                   onBlur={() => setFocusedIndex(null)}
//                 />
//               );
//             })}
//           </View>
//         );

//       // case "image":
//       //   return (
//       //     <TouchableOpacity
//       //       className="items-center justify-center border border-[#EBEBEB] rounded-xl p-4"
//       //       onPress={async () => {
//       //         const result = await ImagePicker.launchImageLibraryAsync({
//       //           mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       //           allowsEditing: true,
//       //           quality: 0.7,
//       //         });

//       //         if (!result.canceled) {
//       //           onChange(result.assets[0].uri);
//       //         }
//       //       }}
//       //     >
//       //       {value ? (
//       //         <Image source={{ uri: value }} className="w-24 h-24 rounded-lg" />
//       //       ) : (
//       //         <Text className="text-[#1F1F1F]">Upload Image</Text>
//       //       )}
//       //     </TouchableOpacity>
//       //   );
//       case "phone":
//         return (
//           <View className={classes}>
//             <TextInput
//               ref={inputRef}
//               placeholder={placeholder}
//               value={value}
//               keyboardType="phone-pad"
//               maxLength={maxLength || 10}
//               onChangeText={(val) => onChange(val.replace(/[^0-9]/g, ""))}
//               onBlur={() => {
//                 onBlur();
//                 setIsFocused(false);
//               }}
//               style={{
//                 fontSize: 15,
//                 fontFamily: "Poppins_400Regular",
//                 color: "#1f1f1f",
//               }}
//               onFocus={() => setIsFocused(true)}
//               className="flex-1 py-3 text-black"
//               placeholderTextColor="#999999"
//               returnKeyType="next"
//             />
//           </View>
//         );
//       case "checkbox":
//         return (
//           <TouchableOpacity
//             className="flex-row items-center space-x-2"
//             onPress={() => {
//               onChange(!value);
//               if (onValueChange) onValueChange(!value);
//             }}
//             activeOpacity={0.7}
//           >
//             <View
//               className={`w-6 h-6 rounded-lg border ${
//                 value ? "bg-[#FFEE37] border-[#ebebeb]" : "border-[#1f1f1f]"
//               } items-center justify-center`}
//             >
//               {value && <Feather name="check" size={16} color="black" />}
//             </View>
//             {label && (
//               <Text className="text-[#1f1f1f] pl-2 text-xs text-md">
//                 {label}
//               </Text>
//             )}
//           </TouchableOpacity>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <View
//       className={`mb-4 ${type === "checkbox" ? "mt-2" : ""} ${
//         containerClassName || ""
//       }`}
//     >
//       {label && type !== "checkbox" && (
//         <Text variant="medium" className="ml-1 mb-1">
//           {label}
//         </Text>
//       )}

//       <Controller<TFieldValues>
//         control={control}
//         name={name}
//         render={({
//           field: { onChange, onBlur, value },
//           fieldState: { error },
//         }) => (
//           <>
//             {renderInput(onChange, value, onBlur)}
//             {error && (
//               <Text className="text-red-600 pl-2 text-xs mt-1">
//                 {error.message}
//               </Text>
//             )}
//           </>
//         )}
//       />

//       {/* {error && (
//         <Text className="text-red-600 pl-2 text-xs mt-1">{error.message}</Text>
//       )} */}
//     </View>
//   );
// }

// export default memo(FormInput);

import React, { memo, useRef, useState } from "react";
import Text from "@/skeleton/Text";
import Feather from "@expo/vector-icons/Feather";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { Image, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";

interface IFormInput<TFieldValues extends FieldValues> {
  control: any;
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  onChange?: (e: any) => void;
  type?: "text" | "password" | "otp" | "image" | "phone" | "checkbox";
  error?: FieldError;
  upperCase?: boolean;
  editable?: boolean;
  containerClassName?: string; // Kept for interface backward compatibility
  onChangeText?: (text: string) => void;
  onValueChange?: (value: any) => any;
  maxLength?: number;
  isDropdown?: boolean;
  isOpen?: boolean;
  onDropdownPress?: () => void;
}

function FormInput<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  error,
  upperCase,
  onValueChange,
  maxLength,
  isDropdown = false,
  onDropdownPress,
  isOpen = false,
}: IFormInput<TFieldValues>) {
  const [secureTextEntry, setSecureTextEntry] = useState(type === "password");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const togglePasswordVisibility = () => setSecureTextEntry((prev) => !prev);

  // Dynamic conditional style solver for container fields
  const getInputContainerStyle = () => {
    let stateStyle = styles.inputContainerDefault;
    if (isFocused) {
      stateStyle = styles.inputContainerFocused;
    }
    return [styles.baseInputRow, stateStyle, error ? styles.inputContainerError : null];
  };

  const renderInput = (onChange: any, value: any, onBlur: any) => {
    switch (type) {
      case "password":
      case "text":
        return (
          <View style={getInputContainerStyle()}>
            <TextInput
              ref={inputRef}
              placeholder={placeholder}
              placeholderTextColor="#999999"
              value={value}
              onChangeText={(val) => {
                let processed = upperCase ? val.toUpperCase() : val;
                if (onValueChange) {
                  processed = onValueChange(processed);
                }
                onChange(processed);
              }}
              style={styles.textInputCore}
              onBlur={() => {
                onBlur();
                setIsFocused(false);
              }}
              editable={!isDropdown}
              onFocus={() => setIsFocused(true)}
              secureTextEntry={secureTextEntry}
              returnKeyType="next"
            />
            
            {type === "password" && (
              <TouchableOpacity onPress={togglePasswordVisibility} activeOpacity={0.7}>
                <Image
                  source={
                    secureTextEntry
                      ? require("../../../assets/closeeye.png")
                      : require("../../../assets/eyeopen.png")
                  }
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            )}

            {isDropdown && (
              <TouchableOpacity onPress={onDropdownPress} activeOpacity={0.7}>
                <Feather
                  name={isOpen ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#1f1f1f"
                />
              </TouchableOpacity>
            )}
          </View>
        );

      case "otp": {
        const otpRefs = useRef<TextInput[]>([]);
        const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

        const handleOTPChange = (
          text: string,
          index: number,
          onChangeRef: any,
          currentValue: string,
        ) => {
          const newValue = currentValue ? currentValue.split("") : Array(6).fill("");
          newValue[index] = text.slice(-1);
          const joinedValue = newValue.join("");
          onChangeRef(joinedValue);

          if (text && index < 5) {
            otpRefs.current[index + 1]?.focus();
          }
        };

        const handleKeyPress = (e: any, index: number, currentValue: string) => {
          if (e.nativeEvent.key === "Backspace" && !currentValue[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
          }
        };

        return (
          <View style={styles.otpWrapperRow}>
            {Array.from({ length: 6 }).map((_, index) => {
              const isBoxFocused = focusedIndex === index;
              return (
                <TextInput
                  key={index}
                  ref={(ref: any) => (otpRefs.current[index] = ref!)}
                  value={value?.[index] || ""}
                  onChangeText={(text) =>
                    handleOTPChange(text, index, onChange, value || "")
                  }
                  onKeyPress={(e) => handleKeyPress(e, index, value || "")}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                  style={[
                    styles.otpInputBox,
                    { borderColor: isBoxFocused ? "#ff3f6c" : "#EBEBEB" },
                  ]}
                  cursorColor="#ff3f6c"
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                />
              );
            })}
          </View>
        );
      }

      case "phone":
        return (
          <View style={getInputContainerStyle()}>
            <TextInput
              ref={inputRef}
              placeholder={placeholder}
              placeholderTextColor="#999999"
              value={value}
              keyboardType="phone-pad"
              maxLength={maxLength || 10}
              onChangeText={(val) => onChange(val.replace(/[^0-9]/g, ""))}
              onBlur={() => {
                onBlur();
                setIsFocused(false);
              }}
              style={styles.textInputCore}
              onFocus={() => setIsFocused(true)}
              returnKeyType="next"
            />
          </View>
        );

      case "checkbox":
        return (
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => {
              onChange(!value);
              if (onValueChange) onValueChange(!value);
            }}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.checkboxBox,
                value ? styles.checkboxChecked : styles.checkboxUnchecked,
              ]}
            >
              {value && <Feather name="check" size={16} color="black" />}
            </View>
            {label && (
              <Text style={styles.checkboxLabel}>
                {label}
              </Text>
            )}
          </TouchableOpacity>
        );

      default:
        return null;
    }
  };

  return (
    <View style={[styles.mainFieldContainer, type === "checkbox" && styles.mtFieldCheckbox]}>
      {label && type !== "checkbox" && (
        <Text variant="medium" style={styles.fieldLabelText}>
          {label}
        </Text>
      )}

      <Controller<TFieldValues>
        control={control}
        name={name}
        render={({
          field: { onChange: formOnChange, onBlur: formOnBlur, value: formValue },
          fieldState: { error: fieldError },
        }) => (
          <>
            {renderInput(formOnChange, formValue, formOnBlur)}
            {fieldError && (
              <Text style={styles.errorText}>
                {fieldError.message}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainFieldContainer: {
    marginBottom: 16,
    width: '100%',
  },
  mtFieldCheckbox: {
    marginTop: 8,
  },
  fieldLabelText: {
    marginLeft: 4,
    marginBottom: 4,
    textAlign: 'left',
  },
  baseInputRow: {
    height: 52,
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
  },
  inputContainerDefault: {
    backgroundColor: '#EFF1F3',
    borderColor: '#EBEBEB',
  },
  inputContainerFocused: {
    backgroundColor: '#F1F5F9', // bg-slate-100
    borderColor: '#ff3f6c',
  },
  inputContainerError: {
    borderColor: '#EF4444', // border-red-500
  },
  textInputCore: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    color: "#1F1F1F",
    paddingVertical: 12,
    textAlign: 'left',
  },
  eyeIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  otpWrapperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  otpInputBox: {
    borderWidth: 1,
    borderRadius: 16,
    width: 46,
    height: 48,
    fontFamily: "Poppins-Regular",
    color: "#1F1F1F",
    fontSize: 15,
    backgroundColor: "#EBEBEB",
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#ff3f6c',
    borderColor: '#EBEBEB',
  },
  checkboxUnchecked: {
    borderColor: '#1F1F1F',
  },
  checkboxLabel: {
    color: '#1F1F1F',
    paddingLeft: 8,
    fontSize: 12,
    textAlign: 'left',
  },
  errorText: {
    color: '#DC2626',
    paddingLeft: 8,
    fontSize: 12,
    marginTop: 4,
    textAlign: 'left',
  },
});

export default memo(FormInput);
