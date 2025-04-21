import './button.css';
import { memo, useEffect, useState } from 'react';
import useAdBlockDetect from './components/finger/useAdBlockDetect';

function AdBlocker() {
  const originalText = 'Developer';
  const [text, setText] = useState(originalText);
  const [active, setActive] = useState(false);
  const adBlockEnabled = useAdBlockDetect();

  useEffect(() => {
    let iteration = 0;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const interval = setInterval(() => {
      setText((prev) => {
        return prev
          .split('')
          .map((_, idx) => {
            if (idx < iteration) {
              return originalText[idx];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');
      });

      iteration += 1;

      if (iteration > originalText.length) {
        clearInterval(interval);
      }
    }, 40);
  }, [active]);
  return (
    <div className="container relative mx-auto min-h-screen">
      {adBlockEnabled && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-4">
          ⚠️ Ad Blocker Detected! Please disable it to support our site 🙌
        </div>
      )}
      <div className="flex items-start gap-2 ">
        <div className="flex-1 p-2 sticky top-0 h-screen">
          <h1 className="text-6xl font-black mt-28">Brittany Chiang</h1>
          <p className="text-3xl my-2 text-[#4F39F6]">Front End Engineer</p>
          <p>
            I build accessible, pixel-perfect digital experiences for the web.
          </p>
        </div>
        <div className="flex-1">
          <div className="flex flex-col items-start justify-center h-screen">
            <h1 className="text-5xl  uppercase font-black leading-none">
              <span
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(79, 57, 246, 0.5))',
                }}
                className="text-indigo-600"
              >
                Trust
              </span>{' '}
              me I am your desired{' '}
              <span
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(79, 57, 246, 0.5))',
                }}
                className="text-indigo-600"
                onMouseEnter={() => setActive(true)}
                onMouseLeave={() => setActive(false)}
              >
                {text}
              </span>
            </h1>
            <h3 className="text-2xl my-12 leading-none">
              I turn coffee into code and pixels into perfection. When I’m not
              debugging, I’m probably arguing with my CSS like it owes me money.
            </h3>

            <button className="button">See all projects</button>
          </div>
          <div className="h-screen"></div>
          <div className="h-screen"></div>
          <div className="h-screen"></div>
        </div>
      </div>
    </div>
  );
}

export default memo(AdBlocker);
