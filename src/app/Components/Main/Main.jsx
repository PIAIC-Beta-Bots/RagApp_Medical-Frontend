"use client";
import { useState, useRef } from 'react';
import axios from 'axios';
import QuestionForm from '../OuestionForm/QuestionForm'
import AIResponse from '../RsponseAI/ResponseAI';  // Fix the import name

export default function Main() {
  const [aiResponse, setAiResponse] = useState(null); // AI response state to store the full response object
  const [loading, setLoading] = useState(false); // Loading state for spinner
  const aiResponseRef = useRef(null); // Reference for AI response section

  const handleQuestionSubmit = async (question) => {
    setLoading(true); // Start spinner when the request starts
    try {
      // Send POST request to the API
      const response = await axios.post('http://localhost:8001/ask', {
        question: question
      });

      // Set the entire AI response object
      setAiResponse(response.data.response); // Storing the whole response, not just the output

      // Scroll to the AI response section
      aiResponseRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setAiResponse({
        output: 'An error occurred while fetching the AI response. Please try again later.',
      });
    } finally {
      setLoading(false); // Stop spinner once the request completes
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-white to-green-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto p-6 md:p-8 bg-white shadow-2xl rounded-lg border border-gray-200">
        <h1 className="text-4xl md:text-4xl font-bold text-center text-green-700 mb-6 md:mb-8">Healthcare AI Assistant</h1>
        
        {/* Pass the handleQuestionSubmit and loading state to the QuestionForm */}
        <QuestionForm onSubmit={handleQuestionSubmit} loading={loading} />
      </div>

      <div ref={aiResponseRef} className="mt-6 md:mt-10 max-w-4xl mx-auto p-6 md:p-8 bg-white shadow-2xl rounded-lg border border-gray-200">
        {/* Pass the full response object to AIResponse */}
        <AIResponse response={aiResponse} />
      </div>
    </div>
  );
}
