"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchUnits, Unit } from '@/services/unitsService';

interface UnitsContextType {
  units: Unit[];
  loading: boolean;
  error: string | null;
  refetchUnits: () => Promise<void>;
}

const UnitsContext = createContext<UnitsContextType | undefined>(undefined);

interface UnitsProviderProps {
  children: ReactNode;
}

export function UnitsProvider({ children }: UnitsProviderProps) {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUnits = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedUnits = await fetchUnits();
      setUnits(fetchedUnits);
    } catch (err) {
      console.error('Failed to load units:', err);
      setError(err instanceof Error ? err.message : 'Failed to load units');
    } finally {
      setLoading(false);
    }
  };

  const refetchUnits = async () => {
    await loadUnits();
  };

  useEffect(() => {
    loadUnits();
  }, []);

  const value: UnitsContextType = {
    units,
    loading,
    error,
    refetchUnits,
  };

  return (
    <UnitsContext.Provider value={value}>
      {children}
    </UnitsContext.Provider>
  );
}

export function useUnits(): UnitsContextType {
  const context = useContext(UnitsContext);
  if (context === undefined) {
    throw new Error('useUnits must be used within a UnitsProvider');
  }
  return context;
}