import React, { Component } from 'react';

import './App.css';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Tablehead from '@material-ui/core/Tablehead';
import Tablebody from '@material-ui/core/Tablebody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 5,
    overflowX : "auto"
  },
  table: {
    minWidth: 1080    
  },
  td: {
    minWidth: 1080    
  }
})

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
    const { classes } = this.props;
  return (
    <Paper className = {classes.root}>
      <Table className = {classes.table}>
        <Tablehead>
          <TableRow>
          <TableCell>번호</TableCell>
          <TableCell>이미지</TableCell>
          <TableCell>이름</TableCell>
          <TableCell>생년월일</TableCell>
          <TableCell>성별</TableCell>
          <TableCell>직업</TableCell>
          </TableRow>
        </Tablehead>
        <Tablebody>
        {customers.map(c => {return (<Customer key = {c.id} id = {c.id}  image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />);})}
        </Tablebody>
      </Table>
   </Paper>
  );
  }
}

export default (withStyles)(styles)(App);
