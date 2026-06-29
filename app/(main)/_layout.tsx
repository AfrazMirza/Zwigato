import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 1. Yeh hamare tabs navigation wale folder ko map karega */}
      <Stack.Screen name="(tabs)" />
      
      {/* 2. Yeh product details page ko map karega */}
      <Stack.Screen name="details/[id]" />
    </Stack>
  );
}