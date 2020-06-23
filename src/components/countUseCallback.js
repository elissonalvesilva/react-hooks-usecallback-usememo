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