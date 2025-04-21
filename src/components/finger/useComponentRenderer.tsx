import React, { useMemo } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import * as Babel from '@babel/standalone';

export function useComponentRenderer() {
  return function ComponentWithCode({ component, dependencies = {} }) {
    const { renderedComponent, error, componentCode } = useMemo(() => {
      try {
        // Case 1: Already a React element
        if (React.isValidElement(component)) {
          return {
            renderedComponent: component,
            componentCode: component.type.toString(),
            error: null,
          };
        }

        // Case 2: String code
        if (typeof component === 'string') {
          const sandbox = {
            React,
            ...dependencies,
            exports: {},
            module: { exports: {} },
          };

          // Transform the code to handle both ES modules and CommonJS
          const wrappedCode = `
            (function(module, exports, require) {
              ${component}
              
              // Try to find the component in various ways
              let componentToExport;
              
              // Check for default export
              if (typeof module.exports !== 'undefined' && module.exports !== null) {
                componentToExport = module.exports;
              }
              // Check for named exports
              else if (typeof exports !== 'undefined' && exports !== null) {
                componentToExport = exports;
              }
              // Check for global component
              else {
                const componentNames = ['App', 'DefaultComponent', 'Component', 'MyComponent'];
                for (const name of componentNames) {
                  if (typeof window !== 'undefined' && window[name]) {
                    componentToExport = window[name];
                    break;
                  }
                  if (typeof global !== 'undefined' && global[name]) {
                    componentToExport = global[name];
                    break;
                  }
                  if (typeof this !== 'undefined' && this[name]) {
                    componentToExport = this[name];
                    break;
                  }
                }
              }
              
              if (!componentToExport) {
                throw new Error('Could not find any component to export');
              }
              
              return componentToExport;
            })
          `;

          const transpiled = Babel.transform(wrappedCode, {
            presets: ['react', 'env'],
          }).code;

          const require = (name: string) => {
            if (name === 'react') return React;
            if (dependencies[name]) return dependencies[name];
            throw new Error(`Cannot require ${name}`);
          };

          const componentFunc = new Function(
            'module',
            'exports',
            'require',
            `return ${transpiled}`
          );

          const DynamicComponent = componentFunc(
            sandbox.module,
            sandbox.exports,
            require
          );

          if (!DynamicComponent) {
            throw new Error('Component creation failed - got null');
          }

          return {
            renderedComponent: <DynamicComponent {...dependencies} />,
            componentCode: component,
            error: null,
          };
        }

        throw new Error('Invalid component type provided');
      } catch (err) {
        console.error('Component render error:', err);
        return {
          renderedComponent: null,
          componentCode: typeof component === 'string' ? component : '',
          error: err instanceof Error ? err.message : 'Unknown error occurred',
        };
      }
    }, [component, dependencies]);

    if (error) {
      return (
        <div className="border rounded-lg p-4 bg-red-50">
          <div className="text-red-600 font-bold mb-2">Render Error</div>
          <div className="text-red-500 mb-4">{error}</div>
          <div className="text-sm mb-2">Component Code:</div>
          <SyntaxHighlighter
            language="jsx"
            style={atomOneDark}
            showLineNumbers
            wrapLines
          >
            {componentCode}
          </SyntaxHighlighter>
        </div>
      );
    }

    return (
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 border rounded-lg p-4">
          <h3 className="font-bold mb-2">Preview</h3>
          {renderedComponent}
        </div>
        <div className="flex-1 border rounded-lg p-4 bg-gray-50">
          <h3 className="font-bold mb-2">Code</h3>
          <SyntaxHighlighter
            language="jsx"
            style={atomOneDark}
            showLineNumbers
            wrapLines
          >
            {componentCode}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  };
}
