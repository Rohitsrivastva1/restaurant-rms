import React, { useState, useCallback } from 'react';

const ImageWithFallback = React.memo(({ 
  src, 
  alt, 
  className = "", 
  fallbackSrc = "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop&crop=center",
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleImageError = useCallback(() => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(fallbackSrc);
      setIsLoading(false);
    } else {
      // If fallback also fails, show a placeholder
      setImageSrc('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwQzEzMy42MzEgMTAwIDEyMCA4Ni4zNjg5IDEyMCA3MEMxMjAgNTMuNjMxMSAxMzMuNjMxIDQwIDE1MCA0MEMxNjYuMzY5IDQwIDE4MCA1My42MzExIDE4MCA3MEMxODAgODYuMzY4OSAxNjYuMzY5IDEwMCAxNTAgMTAwWiIgZmlsbD0iI0QxRDVEM0EiLz4KPHN2ZyB4PSIxMzAiIHk9IjgwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzk5OUFBM0EiPgo8cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6Ii8+CjxwYXRoIGQ9Ik0xMiA2Yy0zLjMxIDAtNiAyLjY5LTYgNnMyLjY5IDYgNiA2IDYtMi42OSA2LTYtMi42OS02LTYtNnptMCAxMGMtMi4yMSAwLTQtMS43OS00LTRzMS43OS00IDQtNCA0IDEuNzkgNCA0LTEuNzkgNC00IDR6Ii8+Cjwvc3ZnPgo8L3N2Zz4K');
    }
  }, [hasError, fallbackSrc]);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
        {...props}
      />
    </div>
  );
});

ImageWithFallback.displayName = 'ImageWithFallback';

export default ImageWithFallback; 