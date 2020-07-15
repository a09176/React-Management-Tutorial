import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
    img : {
      width: '100%'      
    },
    td1 : {
        width: '10%',
        borderRadius: 3
    },
    td2 : {
        width: '15%',
        alignItems: 'center'
    }  
  })
  
class Customer extends React.Component {
    
    render(){   
        const { classes } = this.props;   
        return(      
            
                <TableRow>
                    <TableCell className ={classes.td1} align="center">{this.props.id}</TableCell>
                    <TableCell className ={classes.td2}><img src={this.props.image} alt="profile" className ={classes.img}/></TableCell>
                    <TableCell>{this.props.name} </TableCell>
                    <TableCell>{this.props.birthday} </TableCell>
                    <TableCell>{this.props.gender} </TableCell>
                    <TableCell>{this.props.job} </TableCell>
                </TableRow>
            
        );
    }
}



export default (withStyles)(styles)(Customer);