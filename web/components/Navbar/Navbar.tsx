import Logo from '../Logo/logo';
import Navigation from './Navigation';
import Link from 'next/link';

interface NavbarProps {
  active: 'Example UI' | 'Icons';
  hideBody?: boolean;
}

export default function Navbar({ active, hideBody }: NavbarProps) {
  return (
    <>
      <Link
        href="https://www.buymeacoffee.com/willk"
        className="visible flex w-full shrink-0 items-center justify-between gap-1 bg-yellow-400 px-5 py-2 font-sans text-sm font-semibold tracking-tighter shadow-sm sm:hidden dark:bg-yellow-600"
      >
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M15.774 5.946H3.194v7.265c0 3.027 3.144 4.843 6.29 4.843s6.29-1.816 6.29-4.843V12m0-6.054c2.516 0 5.032.797 5.032 3.027S19.548 12.605 15.774 12m0-6.054V12"
            />
          </svg>
          Buy me a coffee
        </div>
        <svg
          height="24"
          width="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m12.5 18.5 5.646-5.646a.5.5 0 0 0 0-.708L12.5 6.5m6 6h-13"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </Link>

      <header className="flex items-center justify-between px-5 pt-10 sm:px-16 sm:pt-14">
        <Logo />
        <Navigation active={active} />
      </header>
      {!hideBody && (
        <div className="mt-10 px-5 sm:px-16 ">
          <div className="flex h-60 flex-col justify-between bg-blue-600 px-10 py-6">
            <div className="flex items-center justify-end gap-2">
              <a
                href="https://www.figma.com/community/plugin/1230547475211377845/ikono-icons"
                className="flex items-center gap-2 text-xs font-semibold text-white opacity-70 transition-opacity hover:opacity-100"
              >
                Figma Plugin
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.00005 2.04999H5.52505C4.71043 2.04999 4.05005 2.71037 4.05005 3.52499C4.05005 4.33961 4.71043 4.99999 5.52505 4.99999H7.00005V2.04999ZM7.00005 1.04999H8.00005H9.47505C10.842 1.04999 11.95 2.15808 11.95 3.52499C11.95 4.33163 11.5642 5.04815 10.9669 5.49999C11.5642 5.95184 11.95 6.66836 11.95 7.475C11.95 8.8419 10.842 9.95 9.47505 9.95C8.92236 9.95 8.41198 9.76884 8.00005 9.46266V9.95L8.00005 11.425C8.00005 12.7919 6.89195 13.9 5.52505 13.9C4.15814 13.9 3.05005 12.7919 3.05005 11.425C3.05005 10.6183 3.43593 9.90184 4.03317 9.44999C3.43593 8.99814 3.05005 8.28163 3.05005 7.475C3.05005 6.66836 3.43594 5.95184 4.03319 5.5C3.43594 5.04815 3.05005 4.33163 3.05005 3.52499C3.05005 2.15808 4.15814 1.04999 5.52505 1.04999H7.00005ZM8.00005 2.04999V4.99999H9.47505C10.2897 4.99999 10.95 4.33961 10.95 3.52499C10.95 2.71037 10.2897 2.04999 9.47505 2.04999H8.00005ZM5.52505 8.94998H7.00005L7.00005 7.4788L7.00005 7.475L7.00005 7.4712V6H5.52505C4.71043 6 4.05005 6.66038 4.05005 7.475C4.05005 8.28767 4.70727 8.94684 5.5192 8.94999L5.52505 8.94998ZM4.05005 11.425C4.05005 10.6123 4.70727 9.95315 5.5192 9.94999L5.52505 9.95H7.00005L7.00005 11.425C7.00005 12.2396 6.33967 12.9 5.52505 12.9C4.71043 12.9 4.05005 12.2396 4.05005 11.425ZM8.00005 7.47206C8.00164 6.65879 8.66141 6 9.47505 6C10.2897 6 10.95 6.66038 10.95 7.475C10.95 8.28962 10.2897 8.95 9.47505 8.95C8.66141 8.95 8.00164 8.29121 8.00005 7.47794V7.47206Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <span className="text-white opacity-20">•</span>
              <a
                href="https://github.com/wkelly1/IKONO/blob/main/LICENCE"
                className="flex items-center gap-2 text-xs font-semibold text-white opacity-70 transition-opacity hover:opacity-100"
              >
                MIT License
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-3xl font-bold text-white">
                ICONS ARE EASIER THAN WORDS
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
