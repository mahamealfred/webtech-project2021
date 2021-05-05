import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import Button from '@material-ui/core/Button';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Search as SearchIcon } from "react-feather";
import getInitials from "src/utils/getInitials";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import IconButton from "@material-ui/core/IconButton";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deleteProductAction } from '../../redux/actions/deleteProductAction';
import { updateProductAction } from "../../redux/actions/updateProductAction";
import {getOrdersAction} from '../../redux/actions/orderAction';
import { deleteOrderAction } from '../../redux/actions/deleteOrderAction';

const OrderListResult = ({ ...rest }) => {

  const ordersState = useSelector((state) => state.orders);
  const deleteOrderState = useSelector((state) => state.deleteOrderState);
//   const updateProductState = useSelector((state) => state.updateProduct);
   const [orders, setOrders] = useState([]);
   const [open, setOpen] = useState(false);
   const dispatch = useDispatch()
   const [results, setResults] = useState({});
   const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
    const [search, setSearch] = useState(false);
//   const [openUpdate, setOpenUpdate] = useState(false);
    const [orderId, setOrderId] = useState(0);
  
//   const [categoryId, setcategoryId] = useState('');
//   const [price, setPrice] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [description, setDescription] = useState('');
  
  const handleClickOpen = () => {
    setOpen(true);
  };

//   const handleUpdate = async () => {
//     if (!name) {
//       return alert("name is required");
//     }
//     await dispatch(updateProductAction({ name,categoryId,price,quantity,imageUrl,description, id: productId }));
//     setOpenUpdate(false);
//     setName("");
//     setcategoryId("");
//     setPrice("");
//     setQuantity("");
//     setImageUrl("");
//     setDescription("");
//     setSearch(false)
//     await dispatch(getProductsAction());
//   };
//   const handleCloseUpdate = () => {
//     setOpenUpdate(false);
//   };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    if (!ordersState.loading) {
      if (ordersState.orders) {
        setOrders(ordersState.orders);
      }
    }
  }, [ordersState.orders]);

  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
const [orderName, setOrderName]= useState('');
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async () =>{
    await dispatch(deleteOrderAction(orderId))
    setOpen(false);
    window.location.reload();
  }
  const trimString = (s) => {
    var l = 0,
      r = s.length - 1;
    while (l < s.length && s[l] == " ") l++;
    while (r > l && s[r] == " ") r -= 1;
    return s.substring(l, r + 1);
  };
  const compareObjects = (o1, o2) => {
    var k = "";
    for (k in o1) if (o1[k] != o2[k]) return false;
    for (k in o2) if (o1[k] != o2[k]) return false;
    return true;
  };
  const itemExists = (haystack, needle) => {
    for (var i = 0; i < haystack.length; i++)
      if (compareObjects(haystack[i], needle)) return true;
    return false;
  };
  const searchHandle = async (e) => {
    setSearch(true);
    const searchKey = e.target.value;
    // console.log(e.target.value)

    try {
      var results = [];
      const toSearch = trimString(searchKey); // trim it
      for (var i = 0; i < orders.length; i++) {
        for (var key in orders[i]) {
          if (orders[i][key] != null) {
            if (
                orders[i][key].toString().toLowerCase().indexOf(toSearch) !=
              -1
            ) {
              if (!itemExists(results, orders[i]))
                results.push(orders[i]);
            }
          }
        }
      }
      setResults(results);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(results);
  return (
    <Card {...rest}>
        <DialogContentText id="alert-dialog-description">
          List of User 
          </DialogContentText>
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete the order below ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            {deleteOrderState? "Loading..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

    
      <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              onChange={(e) => searchHandle(e)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search orders"
              variant="outlined"
            />
          </Box>
          
        </CardContent>
      </Card>
    </Box>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Id</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Create Date</TableCell>
                <TableCell>Update Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {search ? (
                   <>
                   {results.slice(0, limit).map((order) => (
                     <TableRow
                       hover
                       key={order.id}
                       selected={selectedCustomerIds.indexOf(order.id) !== -1}
                     >
                       <TableCell>{order.id}</TableCell>
                       <TableCell>
                         <Box
                           sx={{
                             alignItems: "center",
                             display: "flex",
                           }}
                         >
                           <Typography color="textPrimary" variant="body1">
                        {order.user.fullName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {order.product.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {order.product.quantity}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {order.product.price}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                       <TableCell>
                         {moment(order.createdAt).format("DD/MM/YYYY")}
                       </TableCell>
                       <TableCell>
                         {moment(order.updatedAt).format("DD/MM/YYYY")}
                       </TableCell>
                       <TableCell color="textPrimary" variant="body1">
                         <IconButton
                           aria-label="update"
                           onClick={() => {
                             
                           }}
                         >
                           <BorderColorIcon />
                         </IconButton>
                         <IconButton
                           aria-label="delete"
                           color="secondary"
                           onClick={() => {
                            
                           }}
                         >
                           <DeleteIcon />
                         </IconButton>
                       </TableCell>
                     </TableRow>
                   ))}
                 </>
               
              ) : (
              <>
              {orders.slice(0, limit).map((order) => (
                <TableRow
                  hover
                  key={order.id}
                  selected={selectedProductIds.indexOf(order.id) !== -1}
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {order.user.fullName
                        }
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {order.product.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {order.product.quantity}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {order.product.price}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    {moment(order.createdAt).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    {moment(order.updatedAt).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell color="textPrimary" variant="body1">
                 
                    <IconButton aria-label="delete" color="secondary" onClick={()=> {
                     setOrderId(order.id);
                     
                     setOpen(true);
                 }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
               </>
              )}
            </TableBody>
           
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={orders.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

OrderListResult.propTypes = {
  orders: PropTypes.array.isRequired,
};

export default OrderListResult;
