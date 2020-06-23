import React, { useCallback, useEffect, useState, useMemo } from 'react';
import axios from 'axios';


const PostList = ({ posts, query }) => {
  const data = useMemo(() => {
    return posts.filter((post) => post.title.toLowerCase().includes(query.toLowerCase()));
  }, [posts, query])
  
  return data.map((post) => <li key={post.id}>{post.title}</li>);
};


function Posts() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');

  
  const getPosts = useCallback(async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setPosts(data);
  }, []);


  useEffect(() => {
    getPosts()
  }, [getPosts]);


  return (
    <>
      <input type="text" onChange={(e) => setQuery(e.target.value)} />
      <ul>
        <PostList posts={posts} query={query}/>
      </ul>
    </>
  );
}

export default Posts;