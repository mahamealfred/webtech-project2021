import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { useState, useEffect } from "react";
import { Search as SearchIcon } from 'react-feather';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addCategoryAction} from '../../redux/actions/addCategoryAction';
import { useDispatch, useSelector} from 'react-redux';
import {getCategoriesAction} from '../../redux/actions/categoriesAction';

const CustomerListToolbar = (props)=>{
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const dispatch=useDispatch();
  const addCategory=useSelector((state) => state.addCategory)


  const handleAdd = async ()=>{
    console.log("added")
    if(!name){
    return alert("Name is required")
    }
    await dispatch(addCategoryAction({name}))
    setOpen(false);
    setName('')
    await dispatch(getCategoriesAction())
  }

  
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdate= ()=>{
     
  }
  const handleCloseUpdate=()=>{
    setOpenUpdate(false);
  }
  
  return (<Box {...props}>
    <Dialog
     open={open}
     onClose={handleClose}
     aria-labelledby="alert-dialog-title"
     aria-describedby="alert-dialog-description"
   >
     <DialogTitle id="alert-dialog-title">{"Add Category"}</DialogTitle>
     <DialogContent>
          <TextField
            fullWidth
            label="Category Name"
            margin="normal"
            name="name"
            onChange={(e)=> setName(e.target.value)}
            type="text"
            value={name}
            variant="outlined"
          />
       
     </DialogContent>
     <DialogActions>
       <Button onClick={handleClose} color="primary">
         Cancel
       </Button>
       <Button onClick={handleAdd} color="primary" autoFocus>
         {addCategory.loading ? "Loading..." : "Add Category"}
       </Button>
     </DialogActions>
   </Dialog>
  
 <Box
   sx={{
     display: 'flex',
     justifyContent: 'flex-end'
   }}
 >
   <Button
     color="primary"
     variant="contained"
     onClick={()=> {
      setOpen(true);
  }}
   >
     Add category
   </Button>
 </Box>
 </Box>
);
}

export default CustomerListToolbar;