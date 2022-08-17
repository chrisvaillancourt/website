import type { Post } from '@/types';
import { isPost } from '../guards';

export function validPosts(posts: Post[]): Post[] {
  /*
  It would be better to define this with a generic
  but we get a type error if we define this fn signature with:
  `export function validPosts<T extends Post[]>(posts: T): T`
  */
  return posts.filter((post) => {
    const isValid = isPost(post);
    if (!isValid)
      console.warn(
        `post: ${JSON.stringify(post)} is missing a required property.`,
      );
    return isValid;
  });
}
