import BlogIndex from '../../components/BlogIndex';
import { getAllPosts, getAllTags } from '../../lib/posts';

export function getStaticProps() {
  return { props: { posts: getAllPosts(), tags: getAllTags() } };
}

export default BlogIndex;
