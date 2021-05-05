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
import {getProductsAction} from '../../redux/actions/productsAction';
import SettingsPassword from "../settings/SettingsPassword";
import { deleteUsersAction } from "../../redux/actions/deleteUserAction";
import {getUsersAction} from '../../redux/actions/userAction';


const UserListResult = ({ ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const deleteUsersState = useSelector((state) => state.deleteUsers);
  const usersState = useSelector((state) => state.users);
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [results, setResults] = useState({});
  const [search, setSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password,setPassword]=useState("");



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteUsersAction(userId));
    setOpen(false);
    await dispatch(getUsersAction());
  };

  
  
  useEffect(() => {
    if (!usersState.loading) {
      if (usersState.users) {
        setUsers(usersState.users);
      }
    }
  }, [usersState.users]);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

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
      for (var i = 0; i < users.length; i++) {
        for (var key in users[i]) {
          if (users[i][key] != null) {
            if (
              users[i][key].toString().toLowerCase().indexOf(toSearch) !=
              -1
            ) {
              if (!itemExists(results, users[i]))
                results.push(users[i]);
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
  console.log("po"+users);
  return (
    <Card {...rest}>

<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the user below "{userName}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            {deleteUsersState.loading? "Loading..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
     
      
      <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          {/* <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              
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
              placeholder="Search user"
              variant="outlined"
            />
          </Box> */}
          
        </CardContent>
      </Card>
    </Box>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Create Date</TableCell>
                <TableCell>Update Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {search ? (
                   <>
                   {results.slice(0, limit).map((user) => (
                     <TableRow
                       hover
                       key={user.id}
                       selected={selectedCustomerIds.indexOf(user.id) !== -1}
                     >
                       <TableCell>{user.id}</TableCell>
                       <TableCell>
                         <Box
                           sx={{
                             alignItems: "center",
                             display: "flex",
                           }}
                         >
                           <Typography color="textPrimary" variant="body1">
                             {user.fullName}
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
                             {user.email}
                           </Typography>
                         </Box>
                       </TableCell>
                       <TableCell>
                         {moment(user.createdAt).format("DD/MM/YYYY")}
                       </TableCell>
                       <TableCell>
                         {moment(user.updatedAt).format("DD/MM/YYYY")}
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
                  {users.slice(0, limit).map((user) => (
                    <TableRow
                      hover
                      key={user.id}
                      selected={selectedCustomerIds.indexOf(user.id) !== -1}
                    >
                      <TableCell>{user.id}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                            {user.fullName}
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
                            {user.email}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {moment(user.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(user.updatedAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell color="textPrimary" variant="body1">
                       
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={() => {
                            setUserId(user.id);
                            setFullName(user.fullName);
                            setEmail(user.email);
                            setPassword(user.password)
                            setOpen(true);
                          }}
                        >
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
        count={users.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

UserListResult.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UserListResult;
