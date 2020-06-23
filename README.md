# Using useCallback and useMemo Hooks

## Setup 
 1 - Run
> yarn

 2 - After run yarn to install all dependences, you must to run
> yarn start

## Examples

### 1 - Using useCallback to Get all post and render in _li_

```javascript
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';


const PostList = ({ posts, query }) => {
  const data = posts.filter((post) => post.title.toLowerCase().includes(query.toLowerCase()));
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

```


### 2 - Using useCallback and useMemo to Get all post and render in _li_ and filter results withou to re-render

```javascript
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

```

### 3 - Using useCallback and memo to increment and decrement 

```javascript
import React, { memo, useState, useCallback} from 'react';

const Reset = memo(({resetCount, makeThing}) => {
  console.log('Re-render Reset')
  return (
    <div>
      <button onClick={resetCount}>Reset</button>
      <button onClick={() => makeThing()}>Make thing</button>
    </div>
  )
});

function Count() {
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState('')
  console.log('Re-render Parent');

  const resetCount = useCallback(() => {
    setCount(0);
  }, [setCount]);

  const makeThing = useCallback(() => {
    setQuery('asda')
  }, [setQuery])

  return (
    <>
      <input type="text" onChange={(e) => setQuery(e.target.value)}/>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <Reset resetCount={resetCount} makeThing={makeThing}/>
    </>
  );
}

export default Count;

```


### 3 - Basic Example using useCallback

```javascript
import React, { useState, useCallback} from 'react';

const Counter = () => {

    const [ score, updateScore ] = useState(0)

    const callback = useCallback(() => updateScore(1), [ 1 ])

    return (
        <>
            <h1>Counter: { score }</h1>
            <button onClick={ callback }>Update score</button>
        </>
    )

}

```

In this example, our Counter will be updated only once (on the first call). Then, as we are always passing the value 1, useCallback is smart and has memorized this parameter. So, until it changes, the updateScore function will not be called:

### 4 - Example using memo and useCallback to increment age and salary withou re-render 

```javascript
import React, {memo, useState, useCallback} from 'react';


const Title = memo(({title}) => {
  console.log('Render Title');
  return (
    <>
      <h1>{title}</h1>
    </>
    );
});

const Show = memo(({show, text}) => {
  console.log('Render Show - ', text);
  return (
    <div>
      <span> {text} - {show}</span>
    </div>
  )
});

const Button = memo(({handleClick, text}) => {
  console.log('Render Button - ', text);
  return (
    <button onClick={handleClick}>{text}</button>
  );
});

function Parents() {

  const [age, setAge] = useState(20);
  const [salary, setSalary] = useState(2500);

  const handleClickAge = useCallback(() => {
    setAge(age + 5);
  }, [age]);

  const handleClickSalary = useCallback(() => {
    setSalary(salary + 500);
  }, [salary]);


  // // without useCallback
  // const handleClickAge = () =>{
  //   setAge(age + 5)
  // };

  // const handleClickSalary = () => {
  //   setSalary(salary + 500);
  // };

  return (
    <div>
      <Title title="Title"/>
      <Show show={age} text="Show Age"/>
      <Button handleClick={handleClickAge} text="Add Age"/>
      <Show show={salary} text="Show Salary"/>
      <Button handleClick={handleClickSalary} text="Add Salary"/>
    </div>
  );
}

export default Parents;

```


# When I need to use _useCallback_ and _useMemo_

#### useCallback
 - Used to return memoized callbacks. In short, a slightly more “intelligent” function will return, which will only be executed again if one of its parameters changes. With this, we managed to avoid unnecessary renderings in our components, optimizing the performance of the application (similar to shouldComponentUpdate).

### useMemo
 - Unlike useEffect, RuseMemo doesn't trigger every time you change one of its dependencies.

A memoized function will first check to see if the dependencies have changed since the last render. If so, it executes the function and returns the result. If false, it simply returns the cached result from the last execution.

This is good for expensive operations like transforming API data or doing major calculations that you don't want to be re-doing unnecessarily

```javascript

useCallback(FUNCTION, PARAMETERS) // returns a function
useMemo(() => FUNCTION, PARAMETERS) // return a value

```