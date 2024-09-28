'use client';
import React, { useState } from 'react';
import { MedicalProvider } from './MedicalContext';
import PatientList from '@/app sara/PatientList';
import AddPatient from '@/app sara/AddPatient';

const App: React.FC = () => {
  const [editingRecord, setEditingRecord] = useState<PatientRecord | null>(null);

  return (
    <MedicalProvider>
      <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6">Management State</h1>
        <div className="space-y-6">
          <AddPatient editingRecord={editingRecord} setEditingRecord={setEditingRecord} />
          <PatientList setEditingRecord={setEditingRecord} />
        </div>
      </div>
    </MedicalProvider>
  );
};

export default App;

// import React from 'react';
// import { MedicalProvider } from './MedicalContext';
// import PatientList from '@/app/PatientList';
// import AddPatient from '@/app/AddPatient';

// const App: React.FC = () => {
//   return (
//     <MedicalProvider>
//       <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
//         <h1 className="text-3xl font-bold text-center mb-6"> Management State</h1>
//         <div className="space-y-6">
//           <AddPatient />
//           <PatientList />
//         </div>
//       </div>
//     </MedicalProvider>
//   );
// };

// export default App;
