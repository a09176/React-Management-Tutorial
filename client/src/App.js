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
    marginTop: theme.spacing(1) * 3,
    overflowX : "auto"
  },
  table: {
    minWidth: 1080    
  }
})


class App extends Component {
  //변경이 되는 정보는 state로 가져온다. ex)고객정보
  state = {
    customers: ""
  }
  
  componentDidMount(){
    this.callApi()
    .then(res => this.setState({customers : res}))
    .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

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
        {this.state.customers? this.state.customers.map(c => {return (<Customer key = {c.id} id = {c.id}  image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />);})
        : ""
        }
        </Tablebody>
      </Table>
   </Paper>
  );
  }
}

export default (withStyles)(styles)(App);
