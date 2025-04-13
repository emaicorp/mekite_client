import { useEffect } from 'react';

const TawkToChat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/67fbc122e6ecad190d7caef5/1ionml01r';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    const s0 = document.getElementsByTagName('script')[0];
    s0.parentNode.insertBefore(script, s0);
    
    return () => {
      // Cleanup if needed
      script.parentNode.removeChild(script);
    };
  }, []);

  return null;
};

export default TawkToChat; 


