import BlogIndex from '../../../components/BlogIndex';
import { getAllPosts, getAllTags } from '../../../lib/posts';

export function getStaticPaths() {
  return {
    paths: getAllTags().map((tag) => ({ params: { tag: tag.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const tags = getAllTags();
  const active = tags.find((t) => t.slug === params.tag);
  const posts = getAllPosts().filter((p) => p.tags.some((t) => t.slug === params.tag));
  return { props: { posts, tags, active } };
}

export default BlogIndex;
