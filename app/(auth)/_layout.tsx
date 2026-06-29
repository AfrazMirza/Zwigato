import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Default sabhi screens ka header hide rahega
        animation: 'slide_from_right', // Smooth transition animation
      }}
    >
      <Stack.Screen name="authPortal" />
      <Stack.Screen name="signIn" />
      <Stack.Screen name="signUp" />
      <Stack.Screen name="verification" />
      <Stack.Screen name="forgetPassword" />
      <Stack.Screen name="personalDetails" />
    </Stack>
  );
}