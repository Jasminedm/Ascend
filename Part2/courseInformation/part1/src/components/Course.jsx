import React from 'react';

const Course = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      <ul>
        {course.parts.map(part => (
          <li key={part.id}>
            {part.name}: {part.exercises}
          </li>
        ))}
      </ul>
      <p>
        <strong>
          Total number of exercises: {course.parts.reduce((sum, part) => sum + part.exercises, 0)}
        </strong>
      </p>
    </div>
  );
};

const Header = (props) => {
  return (
    <>
    <h1>{props.course}</h1>
    </>
  );
};

const Content = (props) => {
  const { parts } = props

  return ( 
  <>
  {parts.map((part) =>(
    <Part key={part.id} part={part.name} exercises={part.exercises} />
  ))}   
  </>
  );
};

const Part = (props => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
});


const Total = (props) => {
  const { parts } = props
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <>
    <p>Total number of exercises {totalExercises}</p>
    </>
  );
};

export default Course;