import { useEffect } from 'react';

const SmartsuppChat = () => {
  useEffect(() => {
    // Initialize Smartsupp
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = 'f3a250723d490b0fcf625eb82afc6e46043e315b';
    
    // Load the Smartsupp script
    const loadSmartsupp = () => {
      window.smartsupp || (function(d) {
        var s, c, o = window.smartsupp = function() { o._.push(arguments) };
        o._ = [];
        s = d.getElementsByTagName('script')[0];
        c = d.createElement('script');
        c.type = 'text/javascript';
        c.charset = 'utf-8';
        c.async = true;
        c.src = 'https://www.smartsuppchat.com/loader.js?';
        s.parentNode.insertBefore(c, s);
      })(document);
    };

    loadSmartsupp();

    // Clean up function
    return () => {
      // Remove Smartsupp when component unmounts (if needed)
      if (window.smartsupp) {
        window.smartsupp('shutdown');
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default SmartsuppChat;