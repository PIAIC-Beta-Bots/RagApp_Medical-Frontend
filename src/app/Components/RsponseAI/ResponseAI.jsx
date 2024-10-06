import { useEffect, useState } from 'react';

export default function AIResponse({ response }) {
  const [displayedResponse, setDisplayedResponse] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);

  // Reset displayed response when a new response is passed in
  useEffect(() => {
    if (response?.output) {  // Accessing the response.output instead of response.text
      setDisplayedResponse(''); // Reset displayed text
      setTypingIndex(0);        // Reset typing index
    }
  }, [response]);

  // Simulate live response typing only if there is a response output
  useEffect(() => {
    if (response?.output && typingIndex < response.output.length) {  // Using response.output instead of response.text
      const typingInterval = setInterval(() => {
        setDisplayedResponse((prev) => prev + response.output[typingIndex]);
        setTypingIndex((prevIndex) => prevIndex + 1);
      }, 10); // Adjust typing speed

      return () => clearInterval(typingInterval); // Clean up interval on unmount or when text is fully typed
    }
  }, [typingIndex, response]);

  return (
    <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto mt-8 p-6 bg-white shadow-2xl rounded-lg border border-gray-200">
      <h2 className="text-3xl font-semibold mb-6 text-green-700">AI Response</h2>

      {/* Show placeholder when there is no response */}
      {!response ? (
        <p className="text-gray-500 italic text-lg">Your AI-generated healthcare response will appear here after you ask a question...</p>
      ) : (
        <>
          {/* Typing effect response */}
          <p className="mb-6 text-lg leading-relaxed">{displayedResponse}</p>

          {/* Display PubMed articles if they exist */}
          {response.pubmedArticles?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-4 text-green-700">Related PubMed Articles:</h3>
              <ul className="list-disc list-inside space-y-2">
                {response.pubmedArticles.map((article, idx) => (
                  <li key={idx}>
                    <a
                      href={article.link}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Display FDA drug info if it exists */}
          {response.drugInfo && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-green-700">FDA Drug Information:</h3>
              <p className="text-lg leading-relaxed">{response.drugInfo}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}





