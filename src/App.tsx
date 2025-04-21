import React, { useMemo } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import * as Babel from '@babel/standalone';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {motion} from 'framer-motion';
function App() {
  const codeString = `
  import React from 'react';
  import { motion } from 'framer-motion';
const AnimatedAvatar = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-5">
      <div className="flex gap-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold"
        >
          <img
            className="h-20 w-20 relative shrink-0 z-20 rounded-full ring-2 ring-white inline-block"
            src="https://i.ibb.co.com/RvFgZC8/aman.png"
            alt="avatar"
          />
        </motion.div>
 
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold"
        >
          <img
            className="h-20 w-20 relative shrink-0 z-20 rounded-full ring-2 ring-white inline-block"
            src="https://i.ibb.co.com/RvFgZC8/aman.png"
            alt="avatar"
          />
        </motion.div>
 
        <motion.div
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 20px rgba(0,0,0,0.2)",
          }}
          className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-yellow-500 flex items-center justify-center text-white text-2xl font-bold"
        >
          <img
            className="h-20 w-20 relative shrink-0 z-20 rounded-full ring-2 ring-white inline-block"
            src="https://i.ibb.co.com/RvFgZC8/aman.png"
            alt="avatar"
          />
        </motion.div>
      </div>
    </div>
  );
};
`;

  const RenderedComponent = useMemo(() => {
    try {
      const module = { exports: {} };
      const require = (name) => {
        if (name === 'react') return React;
        if (name === 'framer-motion') return { motion };
        throw new Error(`Cannot require ${name}`);
      };

      const wrappedCode = `
        ${codeString}
        module.exports = AnimatedAvatar; 
      `; // module export the jsx file

      const transpiled = Babel.transform(wrappedCode, {
        presets: ['react', 'env'],
      }).code;

      const func = new Function('module', 'exports', 'require', transpiled);
      func(module, module.exports, require);
      const Component = module.exports;

      if (!Component) {
        throw new Error('Component creation failed - got null');
      }

      return <Component />;
    } catch (err) {
      console.error('Component creation error:', err);
      return (
        <div className="text-red-500 p-4">Component Error: {err.message}</div>
      );
    }
  }, [codeString]);

  return (
    <div className="flex flex-col md:flex-row items-start justify-center gap-4 p-4">
      <div className="w-full md:w-1/2 border rounded-lg p-4 shadow">
        <h2 className="text-lg font-bold mb-4">Preview</h2>
        {RenderedComponent}
      </div>
      <div className="w-full md:w-1/2 border rounded-lg p-4 shadow bg-gray-100">
        <h2 className="text-lg font-bold mb-4">Code</h2>
        <SyntaxHighlighter
          language="jsx"
          style={atomOneDark}
          showLineNumbers
          wrapLines
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default App;
