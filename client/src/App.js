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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';




const styles = theme => ({
  root: {
    width: '100%',
    minWidth:1080    
  },  
  paper:{
    marginLeft :18,
    marginRight : 18
  },
  tableTitle:{
    fontSize : '1.0rem'
  },
  progress:{
    marginTop: theme.spacing(1) * 2
  },
  menu:{
   marginTop : 15,
   marginBottom: 15,  
   display:'flex',
   justifyContent :'flex-end'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  }
})


class App extends Component {
  //변경이 되는 정보는 state로 가져온다. ex)고객정보
 constructor(props){
   super(props);
   this.state = {
     customers: '',
     completed: 0
   }
 }
  
 stateRefresh = () => {
    this.setState({
      customers:'',
      completed : 0 
     });
    this.callApi()
    .then(res => this.setState({customers : res}))
    .catch(err => console.log(err));
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
    const cellList = ["번호","프로필이미지","이름","생년월일","성별","직업","설정"];
  return (
    <div className = {classes.root}>
   
    <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            고객관리 시스템
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="검색하기"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.menu} >
      <CustomerAdd stateRefresh = {this.stateRefresh}/>
      </div>
      <Paper className={classes.paper}>
      <Table className = {classes.table}>
        <Tablehead>
          <TableRow>
            {cellList.map((c)=>{
               return <TableCell className={classes.tableTitle}>{c}</TableCell>
            })};
          
          </TableRow>
        </Tablehead>
        <Tablebody>
        {this.state.customers? this.state.customers.map(c => {return (<Customer key = {c.id} id = {c.id}  image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} stateRefresh={this.stateRefresh}/>);})
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
   
   </div>
  );
  }
}

export default (withStyles)(styles)(App);
