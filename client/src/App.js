import React, { Component } from 'react';

import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Tablehead from '@material-ui/core/Tablehead';
import Tablebody from '@material-ui/core/Tablebody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1) * 3,
    overflowX : "auto"
  },
  table: {
    minWidth: 1080    
  },
  progress:{
    marginTop: theme.spacing(1) * 2
  }
})


class App extends Component {
  //변경이 되는 정보는 state로 가져온다. ex)고객정보
  state = {
    customers: "",
    completed: 0
  }
  
  componentDidMount(){
    this.timer = setInterval(this.progress,20);
    this.callApi()
    .then(res => this.setState({customers : res}))
    .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }
  progress = () => {
    const {completed} = this.state;
    this.setState({
      completed : completed >= 100 ? 0 : completed + 1 
    });
  }
  render() {
    const { classes } = this.props;
  return (
    <div>
    <Paper className = {classes.root}>
      <Table className = {classes.table}>
        <Tablehead>
          <TableRow>
          <TableCell align="center">번호</TableCell>
          <TableCell align="center">이미지</TableCell>
          <TableCell align="center">이름</TableCell>
          <TableCell align="center">생년월일</TableCell>
          <TableCell align="center">성별</TableCell>
          <TableCell align="center">직업</TableCell>
          </TableRow>
        </Tablehead>
        <Tablebody>
        {this.state.customers? this.state.customers.map(c => {return (<Customer key = {c.id} id = {c.id}  image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />);})
        : 
        <TableRow>
          <TableCell colSpan="6" align="center">
            <CircularProgress className="{classes.progress}" variant="determinate" value={this.state.completed}/>
          </TableCell>
        </TableRow>
        }
        </Tablebody>
      </Table>
   </Paper>
   <CustomerAdd/>
   </div>
  );
  }
}

export default (withStyles)(styles)(App);
