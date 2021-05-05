import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addProductAction} from '../../redux/actions/addProductAction';
import {getProductsAction} from '../../redux/actions/productsAction';


const ProductListToolbar = (props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const dispatch=useDispatch();
  const addProduct=useSelector((state) => state.addProduct)


  const handleAdd = async ()=>{
 
    if(!name){
    return alert("Name is required")
    }
    await dispatch(addProductAction({name,categoryId,price,quantity,imageUrl,description}))
    setOpen(false);
    setName(''),
    setCategoryId(''),
    setPrice(''),
    setQuantity(''),
    setImageUrl(''),
    setDescription(''),
    await dispatch(getProductsAction())
    console.log("added")
  }

  
  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(event) {
    setImageUrl(event.target.files[0].name);
  }

 
  return (<Box {...props}>
      <Dialog
     open={open}
     onClose={handleClose}
     aria-labelledby="alert-dialog-title"
     aria-describedby="alert-dialog-description"
   >
     <DialogTitle id="alert-dialog-title">{"Add Product"}</DialogTitle>
     <DialogContent>
          <TextField
            fullWidth
            label="Product Name"
            margin="normal"
            name="name"
            onChange={(e)=> setName(e.target.value)}
            type="text"
            value={name}
            variant="outlined"
          />
       
    
     
          <TextField
            fullWidth
            label="Category Id"
            margin="normal"
            name="categoryId"
            onChange={(e)=> setCategoryId(e.target.value)}
            type="text"
            value={categoryId}
            variant="outlined"
          />
       
    
    
          <TextField
            fullWidth
            label="Price"
            margin="normal"
            name="price"
            onChange={(e)=> setPrice(e.target.value)}
            type="text"
            value={price}
            variant="outlined"
          />
       
     
          <TextField
            fullWidth
            label="Quantity"
            margin="normal"
            name="quantity"
            onChange={(e)=> setQuantity(e.target.value)}
            type="text"
            value={quantity}
            variant="outlined"
          />
       
   
  
          <TextField
            fullWidth
            label="Image"
            margin="normal"
            name="imageUrl"
            onChange={(e) => handleChange(e)}
            type="file"
            // value={imageUrl}
            variant="outlined"
          />
       
     
    
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            name="description"
            onChange={(e)=> setDescription(e.target.value)}
            type="text"
            value={description}
            variant="outlined"
          />
       
     </DialogContent>
     <DialogActions>
       <Button onClick={handleClose} color="primary">
         Cancel
       </Button>
       <Button onClick={handleAdd} color="primary" autoFocus>
       {addProduct.loading ? "Loading..." : "Add Product"}
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
        }
      }
      >
        Add product
      </Button>
    </Box>
  
  </Box>
);
            }

export default ProductListToolbar;
