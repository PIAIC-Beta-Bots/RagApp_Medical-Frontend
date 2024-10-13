"use client"
import { useState, useRef } from 'react';
import axios from 'axios';
import QuestionForm from '../OuestionForm/QuestionForm';
import AIResponse from '../RsponseAI/ResponseAI';

export default function Main() {
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const aiResponseRef = useRef(null);

  const handleQuestionSubmit = async (question) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8001/ask', { question });
      setAiResponse(response.data.response);
      aiResponseRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setAiResponse({ output: 'An error occurred while fetching the AI response. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen p-6 md:p-12">
      <div className=" mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
          Healthcare AI Assistant
        </h1>

        {/* Question Form */}
        <QuestionForm onSubmit={handleQuestionSubmit} loading={loading} />

        {/* AI Response Section */}
        <div ref={aiResponseRef} className="mt-12">
          <AIResponse response={aiResponse} />
        </div>
      </div>
    </div>
  );
}
