
import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';

interface ImageGeneratorProps {
  onClose: () => void;
}

const aspectRatios = ["1:1", "16:9", "9:16", "4:3", "3:4"];

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setImageUrl(null);
    try {
      const url = await generateImage(prompt, aspectRatio);
      setImageUrl(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-2xl transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">AI Image Generator</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>

        <div className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A futuristic city skyline at dusk, neon lights reflecting on wet streets"
            className="w-full h-24 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            disabled={isLoading}
          />
          <div className="flex items-center space-x-4">
            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
              disabled={isLoading}
            >
              {aspectRatios.map(ar => <option key={ar} value={ar}>{ar}</option>)}
            </select>
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="flex-1 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              {isLoading ? 'Generating...' : 'Generate Image'}
            </button>
          </div>
        </div>

        {error && <p className="text-red-400 mt-4">{error}</p>}
        
        <div className="mt-6 w-full h-80 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
          {isLoading ? (
             <div className="flex flex-col items-center space-y-2">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
                <p className="text-gray-400">Generating your vision...</p>
             </div>
          ) : imageUrl ? (
            <img src={imageUrl} alt={prompt} className="object-contain h-full w-full" />
          ) : (
            <p className="text-gray-500">Your generated image will appear here</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
