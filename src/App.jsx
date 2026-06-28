import React from 'react';
import { BundleProvider } from './context/BundleContext';
import BuilderLayout from './layout/BuilderLayout';
import './styles/globals.css';

export default function App() {
  return (
    <BundleProvider>
      <BuilderLayout />
    </BundleProvider>
  );
}
