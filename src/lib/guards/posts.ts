import type { Post } from '@/types';
import { POST_FRONTMATTER } from '@/lib/constants';

export function isPost(post: Post): post is Post {
  const requiredProperties = new Set(POST_FRONTMATTER);
  const { frontmatter } = post;
  for (const requiredProp of requiredProperties.values()) {
    if (!frontmatter[requiredProp]) return false;
  }
  return true;
}
