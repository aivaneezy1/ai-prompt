import React, { Suspense } from 'react';

import EditPost from '../Components/EditPost';
const EditPostPage = () => {
  return (
    <div className='mt-10 ml-5'>
      <h2 className='head_text text-left text-secondary'>Edit Post</h2>
      <h2 className='text-gray-500 text-left mt-5 '>Edit your post however you want.</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPost />
      </Suspense>
    </div>
  );
};

export default EditPostPage;
