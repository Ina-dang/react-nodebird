import React from 'react';
import PropType from 'prop-types';
import Link from 'next/link';

const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((post, index) => {
        if (post.match(/(#[^\s#]+)/)) {
          return (
            <Link href={`/hashtag/${post.slice(1)}`} key={index}>
              {post}
            </Link>
          );
        }
        return post;
      })}
    </div>
  );
};

PostCardContent.propTypes = { postData: PropType.string.isRequired };

export default PostCardContent;
