import { useState } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure this is imported

export default function QuestionForm({ onSubmit, loading }) {
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      toast.error('Please enter a question!', { position: 'top-right' });
      return;
    }
    try {
      await onSubmit(question); // Assuming onSubmit handles API response and success
     
    } catch (error) {
      toast.error('Something went wrong. Please try again.', {
        position: 'top-right',
      });
    }
  };

  return (
    <>
      <ToastContainer autoClose={1500}/>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="question"
            className="block text-xl font-medium text-gray-700"
          >
            Ask a Healthcare Question
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            className="w-full h-36 p-4 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 focus:outline-none resize-none transition-colors"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 px-5 text-lg font-semibold text-white rounded-md transition duration-300 ease-in-out ${
            loading
              ? 'bg-green-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300'
          } flex items-center justify-center`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center space-x-2">
              <BiLoaderAlt className="animate-spin" size={24} />
              <span>Submitting...</span>
            </span>
          ) : (
            'Submit Question'
          )}
        </button>
      </form>
    </>
  );
}
