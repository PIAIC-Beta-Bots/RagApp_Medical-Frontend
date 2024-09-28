'use client';
import React, { useEffect } from 'react';
import { useMedical } from './MedicalContext';

const PatientList: React.FC<{ setEditingRecord: (record: PatientRecord | null) => void }> = ({ setEditingRecord }) => {
  const { state, dispatch } = useMedical();

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchRecords = async () => {
      const records = await fetch('/api/patient-records').then(res => res.json());
      dispatch({ type: 'SET_RECORDS', payload: records });
    };

    fetchRecords();
  }, [dispatch]);

  const handleEdit = (record: PatientRecord) => {
    setEditingRecord(record);
  };

  return (
    <ul className="space-y-4">
      {state.map(record => (
        <li key={record.id} className="p-4 bg-white shadow rounded flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">{record.name}</p>
            <p className="text-gray-600">{record.diagnosis}</p>
            <p className="text-gray-600">{record.disease}</p> {/* Add this line */}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => dispatch({ type: 'REMOVE_RECORD', payload: record.id })}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Remove
            </button>
            <button
              onClick={() => handleEdit(record)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PatientList;







