import { useState } from 'react';

export default function QuestionForm({ onSubmit, loading }) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() === '') {
      alert('Please enter a question');
      return;
    }
    onSubmit(question); // Call the parent submit function
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg border border-gray-200"
    >
      <h2 className="text-3xl font-semibold text-center mb-6 text-green-700">
        Ask Your Healthcare Question
      </h2>
      <div className="mb-6">
        <label htmlFor="question" className="block text-lg font-medium text-gray-700 mb-2">
          Your Question
        </label>
        <textarea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..."
          className="w-full h-36 p-4 text-lg border-2 border-gray-300 rounded-md focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className={`w-full py-3 px-5 font-semibold text-white rounded-lg transition-all ease-in-out ${
          loading ? 'bg-green-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
        } focus:outline-none focus:ring-4 focus:ring-green-400`}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Question'}
      </button>
    </form>
  );
}
