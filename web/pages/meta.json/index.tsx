import Meta from '../../meta.json';
import { GetServerSideProps } from 'next';

export default function Metadata() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(Meta));
  res.end();
  return {
    props: {}
  };
};
