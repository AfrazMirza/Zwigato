
import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

const PulseLoader = ({
  size = 10,
  color = "#000000",
  speed = 600,
}: {
  size?: number;
  color?: string;
  speed?: number;
}) => {
  const anims = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    anims.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: speed,
            delay: index * (speed / 2),
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: speed,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        ])
      ).start();
    });
  }, []);

  const dotsPos = [-20, -7, 7, 20];

  return (
    <View style={[styles.container, { height: 24 }]}>
      {anims.map((anim, i) => {
        const scale = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.7],
        });
        const opacity = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.4, 1],
        });

        return (
          <Animated.View
            key={i}
            style={{
              position: "absolute",
              width: size,
              height: size,
              backgroundColor: color,
              borderRadius: size / 2,
              transform: [{ translateX: dotsPos[i] }, { scale }],
              opacity,
            }}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PulseLoader;
