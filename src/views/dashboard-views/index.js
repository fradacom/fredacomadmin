import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from 'components/shared-components/Loading';

const Post = lazy(() => import(`./dashboard/posts`));
const Category = lazy(() => import(`./dashboard/category`));
const CreateCategory = lazy(() => import(`./dashboard/category/create`));
const CreatePosts = lazy(() => import(`./dashboard/posts/create`));
export const DashboardViews = () => {
  return (
    <Suspense fallback={<Loading cover="page"/>}>
      <div className="container">
        <Routes>
          <Route path="/posts" element={<Post />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/create" element={<CreateCategory />} />
          <Route path="/posts/create" element={<CreatePosts />} />
        </Routes>
      </div>
    </Suspense>
  )
}

export default DashboardViews;

