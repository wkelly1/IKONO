import Footer from '../../components/Footer/Footer';
import Author from '../../components/Markdown/Author';
import { Markdown } from '../../components/Markdown/Markdown';
import Navbar from '../../components/Navbar/Navbar';
import { getHeadings, headingToLink, removeMarkdown } from '../../lib/markdown';
import { getAllPostIds, getPostData, PostData } from '../../lib/posts';
import { GetStaticPaths, GetStaticProps } from 'next';

interface PostProps {
  postData: PostData;
}

interface BlogNavigationProps {
  content: string;
}
function BlogNavigation({ content }: BlogNavigationProps) {
  return (
    <div className="sticky top-5 px-5 dark:text-gray-300">
      <label className="mt-5 block pb-3 text-sm font-medium uppercase">
        On this page
      </label>
      <div className="flex flex-col gap-1">
        {getHeadings(content, 'h3').map(heading => (
          <a
            href={headingToLink(heading)}
            key={heading}
            className="hover:underline"
          >
            <h4 className="text-sm">{removeMarkdown(heading)}</h4>
          </a>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  };
};

const Post: React.FC<PostProps> = ({ postData }) => {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    year: 'numeric',
    month: 'long'
  });

  return (
    <div className="scroll-smooth">
      <Navbar active="Icons" hideBody />
      <hr className="mt-12 border-gray-50 dark:border-gray-600" />
      <main className="flex justify-center px-5 sm:px-16">
        <article className="container prose prose-stone relative px-5 py-6 dark:prose-invert prose-a:prose-headings:no-underline">
          <time
            dateTime={new Date(postData.date).toString()}
            className="mb-4 ml-[calc(-1.25rem)] block border-l-2 border-solid border-blue-600 pl-5 text-sm font-light text-gray-600 dark:text-gray-400"
          >
            {formatter.format(new Date(postData.date))}
          </time>
          <h1 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white">
            {postData.title}
          </h1>
          <Author
            name={postData.author}
            twitter={postData.twitter}
            className="mb-12"
          />
          <Markdown>{postData.content}</Markdown>
          <div className="absolute left-0 top-0 -z-10 h-full border border-dashed border-gray-100 dark:border-gray-600"></div>
        </article>
        <aside className="relative hidden lg:block">
          <BlogNavigation content={postData.content} />
          <div className="absolute left-0 top-0 -z-10 h-full border border-dashed border-gray-100 dark:border-gray-600"></div>
        </aside>
      </main>
      <Footer className="mt-0" />
    </div>
  );
};

export default Post;
