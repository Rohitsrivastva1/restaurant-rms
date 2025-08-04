import React from 'react';
import ImageWithFallback from './ImageWithFallback';

const ImageTest = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold">Image Fallback Test</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Working image */}
        <div>
          <h3 className="font-semibold mb-2">Working Image:</h3>
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop&crop=center"
            alt="Working Image"
            className="w-full h-32 object-cover rounded"
          />
        </div>
        
        {/* Broken image - should show fallback */}
        <div>
          <h3 className="font-semibold mb-2">Broken Image:</h3>
          <ImageWithFallback 
            src="https://broken-image-url-that-does-not-exist.com/image.jpg"
            alt="Broken Image"
            className="w-full h-32 object-cover rounded"
          />
        </div>
        
        {/* No image - should show fallback */}
        <div>
          <h3 className="font-semibold mb-2">No Image:</h3>
          <ImageWithFallback 
            src=""
            alt="No Image"
            className="w-full h-32 object-cover rounded"
          />
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Test Results:</h3>
        <ul className="text-sm space-y-1">
          <li>✅ Working Image: Should load normally</li>
          <li>✅ Broken Image: Should show fallback after error</li>
          <li>✅ No Image: Should show fallback immediately</li>
          <li>✅ Loading State: Should show spinner while loading</li>
          <li>✅ No Continuous Loading: Should only try once per image</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageTest; 