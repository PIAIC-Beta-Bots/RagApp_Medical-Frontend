import { useEffect, useState, useRef } from 'react';

export default function AIResponse({ response }) {
  const [displayedResponse, setDisplayedResponse] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const responseRef = useRef(null); // Create a reference for the response container

  useEffect(() => {
    if (response?.output) {
      setDisplayedResponse('');
      setTypingIndex(0);
    }
  }, [response]);

  useEffect(() => {
    if (response?.output && typingIndex < response.output.length) {
      const typingInterval = setInterval(() => {
        setDisplayedResponse((prev) => prev + response.output[typingIndex]);
        setTypingIndex((prevIndex) => prevIndex + 1);
      }, 10);

      return () => clearInterval(typingInterval);
    }
  }, [typingIndex, response]);

  useEffect(() => {
    // Scroll to the bottom of the response container whenever the displayed text changes
    if (responseRef.current) {
      responseRef.current.scrollTo({
        top: responseRef.current.scrollHeight,
        behavior: 'smooth', // Add smooth scrolling
      });
    }
  }, [displayedResponse]);

  return (
    <div
      className="p-6 bg-white rounded-lg shadow-md overflow-y-auto" // Enable vertical scrolling
      style={{ maxHeight: '80vh' }} // Limit the height to enable scrolling when content exceeds
      ref={responseRef} // Attach the ref to the scrollable container
    >
      <h2 className="text-3xl font-semibold text-green-700 mb-4">AI Response</h2>
      {!response ? (
        <p className="text-gray-500 italic">Your AI-generated healthcare response will appear here...</p>
      ) : (
        <p className="text-lg leading-relaxed">{displayedResponse}</p>
      )}

      {response?.pubmedArticles && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-green-600">Related PubMed Articles:</h3>
          <ul className="list-disc ml-5 space-y-2">
            {response.pubmedArticles.map((article, idx) => (
              <li key={idx}>
                <a href={article.link} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {response?.drugInfo && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-green-600">FDA Drug Information:</h3>
          <p className="text-lg">{response.drugInfo}</p>
        </div>
      )}
    </div>
  );
}
