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
      <Navbar active="Icons" hideBody />
      <hr className="mt-12 border-gray-50 dark:border-gray-600" />
      <main className="flex h-full flex-grow flex-col px-5 sm:px-16">
        <div className="relative mx-auto  h-full max-w-[65ch] flex-grow  px-5">
          <h1 className="py-14 text-3xl">Blog</h1>
          <ul className="flex flex-col gap-10">
            {allPostsData.map(({ id, date, title }) => (
              <li key={id}>
                <Link href={`/blog/${id}`}>
                  <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
                    {title}
                  </h2>
                </Link>
                <time
                  dateTime={new Date(date).toString()}
                  className="ml-[calc(-1.25rem)] block border-l-2 border-solid border-blue-600 pl-5 text-sm font-light text-gray-600 dark:text-gray-400 "
                >
                  {formatter.format(new Date(date))}
                </time>
              </li>
            ))}
          </ul>
          <div className="absolute left-0 top-0 -z-10 h-full border border-dashed border-gray-100"></div>
        </div>
      </main>
    </div>
  );
};

export default Blog;
