import React from 'react';
import { Redirect } from 'expo-router';

export default function AppEntryPoint() {
  return <Redirect href="/(main)" />;
}
