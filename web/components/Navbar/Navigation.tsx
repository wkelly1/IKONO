import Logo from '../Logo/logo';
import ThemeButton from './DarkModeToggle';
import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface BurgerLinkProps {
  to: string;
  children: string;
  active: boolean;
  subLabel?: string;
  className?: string;
}

function BurgerLink({
  to,
  children,
  subLabel,
  active,
  className
}: BurgerLinkProps) {
  return (
    <Link
      href={to}
      className={twMerge(
        'flex items-center justify-between text-black hover:text-blue-500',
        active ? 'text-blue-600' : 'transition-all',
        className
      )}
    >
      <div className="flex flex-col">
        <span>{children}</span>
        {subLabel && (
          <span className="text-xs font-normal text-gray-500">{subLabel}</span>
        )}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="m8 5 7.57 6.624a.5.5 0 0 1 0 .752L8 19"
        />
      </svg>
    </Link>
  );
}

interface NavigationProps {
  active: 'Blog' | 'Icons';
}

export default function Navigation({ active }: NavigationProps) {
  return (
    <nav className="flex flex-wrap items-center justify-end gap-x-10 gap-y-2 font-sans text-sm font-semibold tracking-tighter">
      <Link
        href="https://www.buymeacoffee.com/willk"
        className="hidden shrink-0 items-center gap-1 rounded-lg bg-yellow-400 px-5 py-1 dark:bg-yellow-400 dark:text-gray-900 sm:flex"
      >
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
      </Link>
      <Link
        href="/"
        className={`hidden sm:inline ${
          active === 'Icons'
            ? 'text-blue-600 dark:text-blue-400'
            : 'transition-all hover:text-blue-600 dark:hover:text-blue-400'
        }`}
      >
        Icons
      </Link>
      <Link
        href="/blog"
        className={twMerge(
          'hidden dark:text-gray-300 sm:inline',
          active === 'Blog'
            ? 'text-blue-600 dark:text-blue-400'
            : 'transition-all hover:text-blue-600 dark:hover:text-blue-400'
        )}
      >
        Blog
      </Link>
      <Link
        href="https://github.com/wkelly1/IKONO"
        className="hidden transition-all hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 sm:inline"
      >
        React Library
      </Link>
      <ThemeButton />
      <div className="inline sm:hidden">
        <Burger active={active} />
      </div>
    </nav>
  );
}

function Burger({ active }: NavigationProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="inline-flex h-[35px] w-[35px] items-center justify-center rounded-sm bg-white font-medium leading-none focus:shadow-[0_0_0_2px] focus:shadow-blue-600 focus:outline-none dark:bg-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M3.14 6.5h17.748M3.14 12h17.748M3.14 17.5h17.748"
            />
          </svg>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-white/10 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-[50%] top-4 flex max-h-[85vh] w-[95vw] translate-x-[-50%] flex-col rounded-[4px] border border-gray-200 bg-white font-sans text-sm font-semibold tracking-tighter shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Close className="absolute right-4 top-4 flex h-[32px] w-[32px] items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M16.87 7.13 12 12m-4.87 4.87L12 12m4.87 4.87L12 12M7.13 7.13 12 12"
              />
            </svg>
          </Dialog.Close>
          <div className="p-5">
            <Logo />
          </div>
          <div className="m-2 mt-0 flex flex-col gap-9 bg-gray-50 p-4 text-base">
            <hr className="invisible -my-3.5" />
            <BurgerLink to="/" active={active === 'Icons'}>
              Icons
            </BurgerLink>

            <hr className="-my-3.5" />
            <BurgerLink to="/blog" active={active === 'Blog'}>
              Blog
            </BurgerLink>

            <hr className="-my-3.5" />
            <BurgerLink to="https://github.com/wkelly1/IKONO" active={false}>
              React Library
            </BurgerLink>

            <hr className="invisible -my-3.5" />
          </div>
          <BurgerLink
            to="https://github.com/wkelly1/IKONO"
            active={false}
            subLabel="Terms of Service & Privacy Policy"
            className="m-6"
          >
            Legal
          </BurgerLink>

          <hr />
          <div className="flex justify-between gap-4 p-6">
            <Link
              className="flex cursor-pointer items-center gap-2 text-base font-normal text-gray-600 hover:text-blue-500"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                'Check out this icon pack IKONO by @WillKelly__ 😮'
              )}&url=${encodeURIComponent('https://ikono.will-kelly.co.uk')}`}
              title="Share IKONO on X (twitter)"
            >
              Share
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15.68 7.946c-7.416.296-11.286 7.108-12.482 11.031a.444.444 0 0 0 .435.57c.183 0 .349-.11.426-.276 2.783-5.912 9.041-6.967 11.703-6.741.245.02.42.23.42.476v1.875a.5.5 0 0 0 .849.359l3.63-3.527a.5.5 0 0 0 .063-.641l-3.63-5.29a.5.5 0 0 0-.912.283v1.371a.518.518 0 0 1-.502.51Z"
                />
              </svg>
            </Link>

            <div className="flex gap-4">
              <ThemeButton className="dark:text-gray-600 dark:hover:bg-gray-100" />
              <span className="border-r"></span>
              <Link
                href="https://github.com/wkelly1/IKONO"
                className="text-gray-600 hover:text-blue-500"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Github repository</title>
                  <path
                    d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Link>
              <Link
                href="https://www.figma.com/community/plugin/1230547475211377845/ikono-icons"
                className="text-gray-600 hover:text-blue-500"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Figma plugin</title>
                  <path
                    d="M7.00005 2.04999H5.52505C4.71043 2.04999 4.05005 2.71037 4.05005 3.52499C4.05005 4.33961 4.71043 4.99999 5.52505 4.99999H7.00005V2.04999ZM7.00005 1.04999H8.00005H9.47505C10.842 1.04999 11.95 2.15808 11.95 3.52499C11.95 4.33163 11.5642 5.04815 10.9669 5.49999C11.5642 5.95184 11.95 6.66836 11.95 7.475C11.95 8.8419 10.842 9.95 9.47505 9.95C8.92236 9.95 8.41198 9.76884 8.00005 9.46266V9.95L8.00005 11.425C8.00005 12.7919 6.89195 13.9 5.52505 13.9C4.15814 13.9 3.05005 12.7919 3.05005 11.425C3.05005 10.6183 3.43593 9.90184 4.03317 9.44999C3.43593 8.99814 3.05005 8.28163 3.05005 7.475C3.05005 6.66836 3.43594 5.95184 4.03319 5.5C3.43594 5.04815 3.05005 4.33163 3.05005 3.52499C3.05005 2.15808 4.15814 1.04999 5.52505 1.04999H7.00005ZM8.00005 2.04999V4.99999H9.47505C10.2897 4.99999 10.95 4.33961 10.95 3.52499C10.95 2.71037 10.2897 2.04999 9.47505 2.04999H8.00005ZM5.52505 8.94998H7.00005L7.00005 7.4788L7.00005 7.475L7.00005 7.4712V6H5.52505C4.71043 6 4.05005 6.66038 4.05005 7.475C4.05005 8.28767 4.70727 8.94684 5.5192 8.94999L5.52505 8.94998ZM4.05005 11.425C4.05005 10.6123 4.70727 9.95315 5.5192 9.94999L5.52505 9.95H7.00005L7.00005 11.425C7.00005 12.2396 6.33967 12.9 5.52505 12.9C4.71043 12.9 4.05005 12.2396 4.05005 11.425ZM8.00005 7.47206C8.00164 6.65879 8.66141 6 9.47505 6C10.2897 6 10.95 6.66038 10.95 7.475C10.95 8.28962 10.2897 8.95 9.47505 8.95C8.66141 8.95 8.00164 8.29121 8.00005 7.47794V7.47206Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
