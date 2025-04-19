import { useEffect } from 'react';

const TawkToChat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/6803450a74f3ee190b277060/1ip6cbd34';
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


