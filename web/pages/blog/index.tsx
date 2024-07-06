import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import { getSortedPostsData, PostData } from '../../lib/posts';
import { GetStaticProps } from 'next';
import Link from 'next/link';

interface BlogProps {
  allPostsData: PostData[];
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  };
};

const Blog: React.FC<BlogProps> = ({ allPostsData }) => {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    year: 'numeric',
    month: 'long'
  });
  return (
    <div className="flex min-h-full flex-col">
      <Navbar active="Blog" hideBody />
      <hr className="mt-12 border-gray-200 dark:border-gray-600" />
      <main className="flex h-full flex-grow flex-col px-5 sm:px-16">
        <div className="relative mx-auto h-full max-w-[65ch] flex-grow px-5">
          <h1 className="pt-14 text-3xl font-semibold">Blog</h1>
          <p className="pb-14 pt-2 text-sm font-light">
            The latest updates from IKONO.
          </p>
          <ul className="flex flex-col gap-10">
            {allPostsData.map(({ id, date, title }) => (
              <li key={id}>
                <Link href={`/blog/${id}`}>
                  <h2 className="mb-2 text-xl font-bold text-gray-800 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                    {title}
                  </h2>
                </Link>
                <time
                  dateTime={new Date(date).toString()}
                  className="ml-[calc(-1.25rem)] block border-l-2 border-solid border-blue-600 pl-5 text-sm font-light text-gray-600 dark:border-blue-400 dark:text-gray-400"
                >
                  {formatter.format(new Date(date))}
                </time>
              </li>
            ))}
          </ul>
          <div className="absolute left-0 top-0 -z-10 h-full border border-dashed border-gray-200 dark:border-gray-600"></div>
        </div>
      </main>
      <Footer className="mt-0" />
    </div>
  );
};

export default Blog;
