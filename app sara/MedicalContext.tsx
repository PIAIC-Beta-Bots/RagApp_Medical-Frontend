
'use client';
import React, { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react';

interface PatientRecord {
  id: number;
  name: string;
  diagnosis: string;
  disease: string; 
}

type Action =
  | { type: 'ADD_RECORD'; payload: PatientRecord }
  | { type: 'REMOVE_RECORD'; payload: number }
  | { type: 'SET_RECORDS'; payload: PatientRecord[] }
  | { type: 'EDIT_RECORD'; payload: PatientRecord };

interface MedicalContextProps {
  state: PatientRecord[];
  dispatch: Dispatch<Action>;
}

const MedicalContext = createContext<MedicalContextProps | undefined>(undefined);

const medicalReducer = (state: PatientRecord[], action: Action): PatientRecord[] => {
  switch (action.type) {
    case 'ADD_RECORD':
      return [...state, action.payload];
    case 'REMOVE_RECORD':
      return state.filter(record => record.id !== action.payload);
    case 'SET_RECORDS':
      return action.payload;
    case 'EDIT_RECORD':
      return state.map(record => 
        record.id === action.payload.id ? action.payload : record
      );
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const MedicalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(medicalReducer, []);

  return (
    <MedicalContext.Provider value={{ state, dispatch }}>
      <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
        {children}
      </div>
    </MedicalContext.Provider>
  );
};

export const useMedical = (): MedicalContextProps => {
  const context = useContext(MedicalContext);
  if (!context) {
    throw new Error('useMedical must be used within a MedicalProvider');
  }
  return context;
};

