export const getTextSizeClasses = (size: 'small' | 'medium' | 'large' = 'medium') => {
  const sizes = {
    small: {
      h1: 'text-4xl',
      h2: 'text-3xl',
      h3: 'text-2xl',
      p: 'text-lg',
      button: 'text-xl'
    },
    medium: {
      h1: 'text-6xl',
      h2: 'text-5xl',
      h3: 'text-4xl',
      p: 'text-2xl',
      button: 'text-3xl'
    },
    large: {
      h1: 'text-8xl',
      h2: 'text-7xl',
      h3: 'text-6xl',
      p: 'text-4xl',
      button: 'text-5xl'
    }
  };

  return sizes[size];
};
