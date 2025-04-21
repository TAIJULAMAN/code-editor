import { useEffect, useState } from 'react';

const useAdBlockDetect = () => {
  const [adBlockEnabled, setAdBlockEnabled] = useState(false);

  useEffect(() => {
    const checkAdBlock = async () => {
      try {
        const response = await fetch(
          'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
          {
            method: 'HEAD',
            mode: 'no-cors',
          }
        );
        console.log(response);
        // If fetch succeeds, no ad blocker
        setAdBlockEnabled(false);
      } catch (error) {
        if (error) {
          setAdBlockEnabled(true);
          alert('please turn of your ad blocker for full access ⚠️')
        }
      }
    };

    checkAdBlock();
  }, []);

  return adBlockEnabled;
};

export default useAdBlockDetect;
