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