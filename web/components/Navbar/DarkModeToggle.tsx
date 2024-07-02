'use client';

import { useTheme } from 'next-themes';
import React from 'react';

const ThemeButton = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <button
      onClick={() =>
        currentTheme == 'dark' ? setTheme('light') : setTheme('dark')
      }
      className="rounded-full p-1 text-2xl text-gray-600 transition-colors duration-100 hover:bg-gray-200 hover:text-gray-900 md:text-4xl dark:text-gray-300 dark:hover:bg-gray-600"
    >
      {currentTheme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
          <g fill="none">
            <circle
              cx="10"
              cy="10"
              r="3.497"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M10.625 2.567a.625.625 0 1 0-1.25 0v2.11a5.415 5.415 0 0 1 1.25 0v-2.11Zm0 12.755v2.11a.625.625 0 1 1-1.25 0v-2.11a5.419 5.419 0 0 0 1.25 0Zm6.808-4.697a.625.625 0 0 0 0-1.25h-2.11a5.42 5.42 0 0 1 0 1.25h2.11Zm-12.755 0a5.412 5.412 0 0 1 0-1.25h-2.11a.625.625 0 0 0 0 1.25h2.11Zm11.02-5.439a.625.625 0 1 0-.884-.884l-1.493 1.493a5.418 5.418 0 0 1 .884.884l1.493-1.493Zm-9.02 9.02a5.407 5.407 0 0 1-.883-.885l-1.493 1.493a.625.625 0 0 0 .884.884l1.493-1.493ZM5.186 4.302a.625.625 0 1 0-.884.884L5.795 6.68a5.415 5.415 0 0 1 .884-.884L5.186 4.302Zm9.02 9.02a5.41 5.41 0 0 1-.884.883l1.492 1.493a.625.625 0 0 0 .884-.884l-1.493-1.493Z"
              clipRule="evenodd"
            />
          </g>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
          <path
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M5.275 3.102A6.726 6.726 0 0 1 8.6 2.707a6.838 6.838 0 0 1 3.122 1.261 7.26 7.26 0 0 1 2.21 2.632 7.637 7.637 0 0 1 .796 3.404 7.637 7.637 0 0 1-.798 3.404 7.26 7.26 0 0 1-2.211 2.63 6.84 6.84 0 0 1-3.123 1.26 6.725 6.725 0 0 1-3.324-.397s4.203-2.572 4.203-6.899c0-4.326-4.2-6.9-4.2-6.9Z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeButton;
