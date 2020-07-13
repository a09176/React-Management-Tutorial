import React, { Component } from 'react';

import './App.css';
import Customer from './components/Customer';

const customers = [{
'id' : 1,
'image' : 'https://placeimg.com/64/64/1', 
'name' : '김하나',
'birthday': '010206',
'gender' : '여',
'job' : '개발자'
},
{
  'id' : 2,
  'image' : 'https://placeimg.com/64/64/2', 
  'name' : '김둘',
  'birthday': '010204',
  'gender' : '남',
  'job' : '직장인'
  },
  {
    'id' : 3,
    'image' : 'https://placeimg.com/64/64/3', 
    'name' : '김셋',
    'birthday': '010203',
    'gender' : '여',
    'job' : '선생님'
  } 
]
class App extends Component {
  render() {
  return (
    <div>
      {customers.map(c => {return (<Customer key = {c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />);})}
   </div>
  );
  }
}

export default App;
