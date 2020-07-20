import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
class CustomerDelete extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            open : false
        }
    }


    deleteCustomer(id){
        const url = "/api/customers/"+id;
        fetch(url,{
            method:'DELETE'
        });
        this.props.stateRefresh();
    }

    handleClickOpen = () => {
        this.setState({
            open : true
        })
    }

    handleClickClose = () => {
        this.setState({
            open : false 
        });
    }

    render(){
        return(
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen} >삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle onClose={this.handleClickClose}>
                        삭제경고!
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                             해당 고객을 삭제하시겠습니까?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                    <Button variant="contained" color="primary" onClick={(e)=>{this.deleteCustomer(this.props.id)}}>삭제</Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClickClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
            
        );
    }

}

export default CustomerDelete;