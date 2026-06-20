// import { cssInterop } from "nativewind";
// import React from "react";
// import { Text as RNText, StyleSheet, TextProps } from "react-native";

// interface CustomTextProps extends TextProps {
//   variant?: "regular" | "medium" | "semibold" | "bold";
//   children: React.ReactNode;
// }

// function Text({
//   variant = "regular",
//   style,
//   className,
//   children,
//   ...props
// }: CustomTextProps) {
//   return (
//     <RNText
//       style={[styles[variant], style]}
//       className={className}
//       {...props}
//       allowFontScaling={false}
//     >
//       {children}
//     </RNText>
//   );
// }

// export default cssInterop(Text, {
//   className: "style",
// });

// const styles = StyleSheet.create({
//   regular: {
//     fontFamily: "Poppins_400Regular",
//   },
//   medium: {
//     fontFamily: "Poppins_500Medium",
//   },
//   semibold: {
//     fontFamily: "Poppins_600SemiBold",
//   },
//   bold: {
//     fontFamily: "Poppins_700Bold",
//   },
// });


import React from "react";
import { Text as RNText, StyleSheet, TextProps } from "react-native";

interface CustomTextProps extends TextProps {
  variant?: "regular" | "medium" | "semibold" | "bold";
  className?: string; // Tailwind support ko physically system mein style wrapper denge
  children: React.ReactNode;
}

export default function Text({
  variant = "regular",
  style,
  className,
  children,
  ...props
}: CustomTextProps) {
  
  // New Architecture (Fabric) safe dynamic style extraction
  const getTailwindFontSize = () => {
    if (!className) return {};
    if (className.includes("text-[32px]")) return { fontSize: 32 };
    if (className.includes("text-[16px]")) return { fontSize: 16 };
    if (className.includes("text-[14px]")) return { fontSize: 14 };
    if (className.includes("text-[13px]")) return { fontSize: 13 };
    return {};
  };

  const getTailwindColor = () => {
    if (!className) return {};
    if (className.includes("text-black")) return { color: "#000000" };
    if (className.includes("text-gray-600")) return { color: "#4B5563" };
    return {};
  };

  return (
    <RNText
      style={[
        styles.base,
        styles[variant],
        getTailwindFontSize(),
        getTailwindColor(),
        style,
      ]}
      {...props}
      allowFontScaling={false}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    textAlign: "center",
  },
  regular: {
    fontFamily: "Poppins-Regular",
  },
  medium: {
    fontFamily: "Poppins-Medium",
  },
  semibold: {
    fontFamily: "Poppins-SemiBold",
  },
  bold: {
    fontFamily: "Poppins-Bold",
  },
});