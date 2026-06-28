import { createContext, useContext } from 'react';
import { useBundleBuilder } from '../hooks/useBundleBuilder';

const BundleContext = createContext(null);

export function BundleProvider({ children }) {
  const bundleState = useBundleBuilder();
  return <BundleContext.Provider value={bundleState}>{children}</BundleContext.Provider>;
}

export function useBundle() {
  const ctx = useContext(BundleContext);
  if (!ctx) {
    throw new Error('useBundle must be used inside <BundleProvider>');
  }
  return ctx;
}
