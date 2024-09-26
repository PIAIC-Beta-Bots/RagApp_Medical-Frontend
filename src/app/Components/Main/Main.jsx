"use client";
import { useState, useRef } from 'react';
import QuestionForm from '../OuestionForm/QuestionForm';
import AIResponse from '../RsponseAI/ResponseAI';

export default function Main() {
  const [aiResponse, setAiResponse] = useState(null); // Initially no response
  const aiResponseRef = useRef(null); // Create a reference for AI response section

  // Simulated static AI response data
  const staticResponse = {
    text: 'This is a simulated response to your healthcare question. Please consult a healthcare professional for accurate information.',
    pubmedArticles: [
      { title: 'Understanding the Basics of AI in Healthcare', link: 'https://pubmed.ncbi.nlm.nih.gov/1' },
      { title: 'Artificial Intelligence and Healthcare', link: 'https://pubmed.ncbi.nlm.nih.gov/2' },
    ],
    drugInfo: 'Simulated FDA drug information for your query: The drug X is used for treating Y.',
  };

  const handleQuestionSubmit = () => {
    setAiResponse(staticResponse);
    aiResponseRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-white to-green-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto p-6 md:p-8 bg-white shadow-2xl rounded-lg border border-gray-200">
        <h1 className="text-4xl md:text-4xl font-bold text-center text-green-700 mb-6 md:mb-8">Healthcare AI Assistant</h1>
        <QuestionForm onSubmit={handleQuestionSubmit} />
      </div>
      
      <div ref={aiResponseRef} className="mt-6 md:mt-10 max-w-4xl mx-auto p-6 md:p-8 bg-white shadow-2xl rounded-lg border border-gray-200">
        <AIResponse response={aiResponse} />
      </div>
    </div>
  );
}