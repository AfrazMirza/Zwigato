// import Text from "@/skeleton/Text";
// import { GestureResponderEvent, TouchableOpacity } from "react-native";
// import PulseLoader from "../UI/PulseLoader";

// type ButtonProps = {
//   variant?: "primary" | "secondary" | "disabled";
//   onPress?: (event: GestureResponderEvent) => void;
//   children: React.ReactNode;
//   style?: object;
//   loading?: boolean;
// };

// export default function Button({
//   variant = "primary",
//   onPress,
//   children,
//   style,
//   loading = false,
// }: ButtonProps) {
//   // const backgroundColor =
//   //   variant === "primary"
//   //     ? loading
//   //       ? "bg-[#FFF57A] border border-[#EEDD26]"
//   //       : "bg-[#FFEE37] border border-[#EEDD26]"
//   //     : loading
//   //     ? "border border-[#EBEBEB]"
//   //     : "border border-[#EBEBEB]";

//   let backgroundColor = "";
//   let textColor = "";

//   switch (variant) {
//     case "primary":
//       backgroundColor = loading
//         ? "bg-[#FFF57A] border border-[#EEDD26]"
//         : "bg-[#FFEE37] border border-[#EEDD26]";
//       textColor = "#1F1F1F";
//       break;
//     case "secondary":
//       backgroundColor = "border border-[#EBEBEB]";
//       textColor = "#1F1F1F";
//       break;
//     case "disabled":
//       backgroundColor = "bg-[#EFF1F3] border border-[#EFF1F3]";
//       textColor = "#999999";
//       break;
//   }
//   return (
//     <TouchableOpacity
//       // onPress={onPress}
//       // disabled={loading}
//       onPress={variant === "disabled" ? undefined : onPress}
//       disabled={variant === "disabled" || loading}
//       activeOpacity={0.8}
//       className={`py-3 w-full  rounded-2xl items-center  ${backgroundColor} `}
//     >
//       {loading ? (
//         <PulseLoader
//           size={4}
//           color={variant == "primary" ? "#1f1f1f" : "#ebebeb"}
//         />
//       ) : (
//         <Text
//           variant="semibold"
//           className="text-[#1F1F1F] "
//           style={{ color: textColor }}
//         >
//           {children}
//         </Text>
//       )}
//     </TouchableOpacity>
//   );
// }


import Text from "@/skeleton/Text";
import React from "react";
import { GestureResponderEvent, TouchableOpacity, StyleSheet } from "react-native";
import PulseLoader from "../UI/PulseLoader";

type ButtonProps = {
  variant?: "primary" | "secondary" | "disabled";
  onPress?: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
  style?: object;
  loading?: boolean;
};

export default function Button({
  variant = "primary",
  onPress,
  children,
  style,
  loading = false,
}: ButtonProps) {
  
  // Logic parts untouched - keeping the conditional states exactly as you built
  let buttonVariantStyle = {};
  let textColor = "";

  switch (variant) {
    case "primary":
      buttonVariantStyle = loading ? styles.btnPrimaryLoading : styles.btnPrimary;
      textColor = "#1F1F1F";
      break;
    case "secondary":
      buttonVariantStyle = styles.btnSecondary;
      textColor = "#1F1F1F";
      break;
    case "disabled":
      buttonVariantStyle = styles.btnDisabled;
      textColor = "#999999";
      break;
  }

  return (
    <TouchableOpacity
      onPress={variant === "disabled" ? undefined : onPress}
      disabled={variant === "disabled" || loading}
      activeOpacity={0.8}
      style={[styles.btnBase, buttonVariantStyle, style]} // Array composition ensures custom overrides work perfectly
    >
      {loading ? (
        <PulseLoader
          size={4}
          color={variant === "primary" ? "#1f1f1f" : "#ebebeb"}
        />
      ) : (
        <Text
          variant="semibold"
          style={[styles.textBase, { color: textColor }]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnBase: {
    paddingVertical: 12,      // Matching standard py-3 padding scale
    width: '100%',            // w-full
    borderRadius: 16,         // rounded-2xl
    alignItems: 'center',     // items-center
    justifyContent: 'center',
  },
  btnPrimary: {
    backgroundColor: '#ff3f6c',
    borderWidth: 1,
    borderColor: '#CC3256',
  },
  btnPrimaryLoading: {
    backgroundColor: '#D14666',
    borderWidth: 1,
    borderColor: '#D55875',
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },
  btnDisabled: {
    backgroundColor: '#EFF1F3',
    borderWidth: 1,
    borderColor: '#EFF1F3',
  },
  textBase: {
    fontSize: 16, // Preserving form baseline readability
  }
});