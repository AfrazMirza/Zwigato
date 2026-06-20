// import Button from "@/components/controls/Button";
// import Text from "@/skeleton/Text";
// import { useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { Dimensions, Image, View } from "react-native";


// const { width, height } = Dimensions.get("window");

// const slides = [
//   {
//     title: "Drive smarter",
//     subtitle: "Flexible leasing with no hidden fees",
//     image: require("../../assets/Onboarding1.jpeg"),
//   },
//   {
//     title: "Freedom to choose",
//     subtitle: "Wide selection, tailored deals, easy process",
//     image: require("../../assets/Onboarding2.jpeg"),
//   },
//   {
//     title: "Without limits",
//     subtitle: "Transparent terms and fast approval",
//     image: require("../../assets/Onboarding3.jpeg"),
//   },
//   {
//     title: "Leasing and rental",
//     subtitle: "Compare, choose and lease in minutes",
//     image: require("../../assets/Onboarding4.jpeg"),
//   },
// ];

// export default function App() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const router = useRouter();

//   const handleNext = () => {
//     if (currentSlide < slides.length - 1) {
//       setCurrentSlide((prev) => prev + 1);
//     } else {
//       router.push("/auth/SignUp");
//     }
//   };

//   const handleSkip = () => {
//     router.push("/auth/SignUp");
//   };

//   useEffect(() => {
//     // no secure storage needed for onboarding flow
//   }, []);

//   const { title, subtitle, image } = slides[currentSlide];

//   return (
//     <View className="flex-1 bg-[#EFF1F3] px-4 pt-12 h-full ">
//       {/* <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" /> */}

//       {/* Image Wrapper */}
//       <View
//         className={`
//           relative self-center rounded-[16px] overflow-hidden 
//         w-full mt-6 mb-6
//         `}
//       >
//         <Image source={image} resizeMode="cover" className="w-[150%] h-full" />

//         {/* Overlay */}
//         <View className="absolute justify-between h-full w-full px-5  pb-10">
//           {/* Text Section */}
//           <View
//             className={`
//               flex items-center mt-10
             
//             `}
//           >
//             <Text
//               variant="semibold"
//               className="text-[32px] text-black tracking-tight text-center"
//             >
//               {title}
//               {""}
//             </Text>
//             <Text className="text-[13px] tracking-tight text-center text-black opacity-80">
//               {subtitle}
//               {""}
//             </Text>
//           </View>

//           {/* Buttons Section */}
//           <View className="w-[90%] mx-auto gap-2">
//             <Button loading={false} variant="primary" onPress={handleNext}>
//               <Text variant="medium" className="text-[16px] text-black">
//                 Next{" "}
//               </Text>
//             </Button>
//             <Button loading={false} variant="secondary" onPress={handleSkip}>
//               <Text variant="medium" className="text-[16px]">
//                 Skip{" "}
//               </Text>
//             </Button>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }


// import Button from "@/components/controls/Button";
// import Text from "@/skeleton/Text";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import { Dimensions, Image, View } from "react-native";

// const { width, height } = Dimensions.get("window");

// const slides = [
//   {
//     title: "Drive smarter",
//     subtitle: "Flexible leasing with no hidden fees",
//     image: require("../../assets/Onboarding1.jpeg"),
//   },
//   {
//     title: "Freedom to choose",
//     subtitle: "Wide selection, tailored deals, easy process",
//     image: require("../../assets/Onboarding2.jpeg"),
//   },
//   {
//     title: "Without limits",
//     subtitle: "Transparent terms and fast approval",
//     image: require("../../assets/Onboarding3.jpeg"),
//   },
//   {
//     title: "Leasing and rental",
//     subtitle: "Compare, choose and lease in minutes",
//     image: require("../../assets/Onboarding4.jpeg"),
//   },
// ];

// export default function Onboarding() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const router = useRouter();

//   const handleNext = () => {
//     if (currentSlide < slides.length - 1) {
//       setCurrentSlide((prev) => prev + 1);
//     } else {
//       router.push("/auth/SignUp");
//     }
//   };

//   const handleSkip = () => {
//     router.push("/auth/SignUp");
//   };

//   const { title, subtitle, image } = slides[currentSlide];

//   return (
//     <View className="flex-1 bg-[#EFF1F3] px-4 pt-12">
      
//       {/* 1. Image Wrapper: Isko hum flex-1 denge taaki buttons ke liye neeche jagah bache */}
//       <View className="flex-1 w-full mt-4 mb-6 rounded-[16px] overflow-hidden relative bg-white shadow-sm">
//         <Image 
//           source={image} 
//           resizeMode="cover" 
//           className="w-full h-full absolute top-0 left-0" 
//         />
        
//         {/* Subtle Dark/Light Gradient Overlay (Optional: text readibility ke liye) */}
//         <View className="absolute inset-0 bg-black/5" />
//       </View>

//       {/* 2. Content Section: Yeh ab screen ke bottom par humesha visible rahega */}
//       <View className="w-full pb-8 px-2 justify-end">
        
//         {/* Text Area */}
//         <View className="items-center mb-8">
//           <Text
//             variant="semibold"
//             className="text-[32px] text-black tracking-tight text-center leading-tight"
//           >
//             {title}
//           </Text>
//           <Text 
//             variant="medium" 
//             className="text-[14px] tracking-tight text-center text-gray-600 mt-2 px-4"
//           >
//             {subtitle}
//           </Text>
//         </View>

//         {/* Buttons Area */}
//         <View className="w-full gap-3">
//           <Button loading={false} variant="primary" onPress={handleNext}>
//             <Text variant="semibold" className="text-[16px] text-black text-center py-1">
//               Next
//             </Text>
//           </Button>
          
//           <Button loading={false} variant="secondary" onPress={handleSkip}>
//             <Text variant="semibold" className="text-[16px] text-gray-700 text-center py-1">
//               Skip
//             </Text>
//           </Button>
//         </View>

//       </View>

//     </View>
//   );
// }

import Button from "@/components/controls/Button";
import Text from "@/skeleton/Text";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, View, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get("window");

const slides = [
  {
    title: "Discover Latest Trends",
    subtitle: "Explore thousands of premium products, fashion apparel, and electronics tailored just for your style.",
    image: require("../../assets/Onboarding1.jpeg"),
  },
  {
    title: "Exclusive Deals & Offers",
    subtitle: "Unlock massive discounts, flash sales, and personalized promo codes on top-tier global brands.",
    image: require("../../assets/Onboarding2.jpeg"),
  },
  {
    title: "Seamless & Secure Checkout",
    subtitle: "Experience lightning-fast payments via secure UPI, cards, or NetBanking with zero hassle.",
    image: require("../../assets/Onboarding3.jpeg"),
  },
  {
    title: "Fast Delivery to Your Doorstep",
    subtitle: "Track your orders in real-time with our reliable, lightning-fast shipping and easy return policies.",
    image: require("../../assets/Onboarding4.jpeg"),
  },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const handleNext = async () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      router.push("/auth/SignUp");
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
    router.push("/auth/SignUp");
  };

  const { title, subtitle, image } = slides[currentSlide];

  return (
    <View style={styles.container}>
      
      {/* 1. Image Wrapper Component */}
      <View style={styles.imageWrapper}>
        <Image 
          source={image} 
          resizeMode="cover" 
          style={styles.image} 
        />
        {/* Subtle Overlay to improve text readability */}
        <View style={styles.overlay} />
      </View>

      {/* 2. Content Section (Bottom Sheet style layout) */}
      <View style={styles.contentSection}>
        
        {/* Text Area */}
        <View style={styles.textContainer}>
          <Text
            variant="semibold"
            style={styles.titleText}
          >
            {title}
          </Text>
          <Text 
            variant="medium" 
            style={styles.subtitleText}
          >
            {subtitle}
          </Text>
        </View>

        {/* Buttons Area */}
        <View style={styles.buttonContainer}>
          <Button loading={false} variant="primary" onPress={handleNext}>
            <Text variant="semibold" style={styles.btnTextPrimary}>
              Next
            </Text>
          </Button>
          
          <Button loading={false} variant="secondary" onPress={handleSkip}>
            <Text variant="semibold" style={styles.btnTextSecondary}>
              Skip
            </Text>
          </Button>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF1F3',
    paddingHorizontal: 16,
    paddingTop: 45,
  },
  imageWrapper: {
    flex: 1,
    width: '100%',
    marginTop: 14,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  contentSection: {
    width: '100%',
    paddingBottom: 32,
    paddingHorizontal: 8,
    justifyContent: 'flex-end',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  titleText: {
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  subtitleText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#4B5563',
    marginTop: 8,
    paddingHorizontal: 16,
    lineHeight: 20,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  btnTextPrimary: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    paddingVertical: 4,
  },
  btnTextSecondary: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    paddingVertical: 4,
  }
});