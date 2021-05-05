import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import Button from "@material-ui/core/Button";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import getInitials from "src/utils/getInitials";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { deleteCategoriesAction } from "../../redux/actions/deleteCategoryAction";
import { updateCategoryAction } from "../../redux/actions/updateCategoryAction";
import { getCategoriesAction } from "../../redux/actions/categoriesAction";

const CustomerListResults = ({ ...rest }) => {
  const categoriesState = useSelector((state) => state.categories);
  const deleteCategoriesState = useSelector((state) => state.deleteCategories);
  const updateCategoryState = useSelector((state) => state.updateCategory);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState(false);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!categoriesState.loading) {
      if (categoriesState.categories) {
        setCategories(categoriesState.categories);
      }
    }
  }, [categoriesState.categories]);

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [categoryName, setcategoryName] = useState("");
  const [categoryId, setcategoryId] = useState(0);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [results, setResults] = useState({});
  const [name, setName] = useState("");
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async () => {
    await dispatch(deleteCategoriesAction(categoryId));
    setOpen(false);
    await dispatch(getCategoriesAction());
  };

  const handleUpdate = async () => {
    if (!name) {
      return alert("name is required");
    }
    await dispatch(updateCategoryAction({ name, id: categoryId }));
    setOpenUpdate(false);
    setName("");
    setSearch(false)
    await dispatch(getCategoriesAction());
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
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
      for (var i = 0; i < categories.length; i++) {
        for (var key in categories[i]) {
          if (categories[i][key] != null) {
            if (
              categories[i][key].toString().toLowerCase().indexOf(toSearch) !=
              -1
            ) {
              if (!itemExists(results, categories[i]))
                results.push(categories[i]);
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the category below "{categoryName}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            {deleteCategoriesState.loading ? "Loading..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Update Category"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Category Name"
            margin="normal"
            name="name"
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary" autoFocus>
            {updateCategoryState.loading ? "Loading..." : "Update Category"}
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                //  value={search}
                onChange={(e) => searchHandle(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search Categories"
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
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Create Date</TableCell>
                <TableCell>Update Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {search ? (
                   <>
                   {results.slice(0, limit).map((category) => (
                     <TableRow
                       hover
                       key={category.id}
                       selected={selectedCustomerIds.indexOf(category.id) !== -1}
                     >
                       <TableCell>{category.id}</TableCell>
                       <TableCell>
                         <Box
                           sx={{
                             alignItems: "center",
                             display: "flex",
                           }}
                         >
                           <Typography color="textPrimary" variant="body1">
                             {category.name}
                           </Typography>
                         </Box>
                       </TableCell>
                       <TableCell>
                         {moment(category.createdAt).format("DD/MM/YYYY")}
                       </TableCell>
                       <TableCell>
                         {moment(category.updatedAt).format("DD/MM/YYYY")}
                       </TableCell>
                       <TableCell color="textPrimary" variant="body1">
                         <IconButton
                           aria-label="update"
                           onClick={() => {
                             setcategoryId(category.id);
                             setName(category.name);
                             setOpenUpdate(true);
                           }}
                         >
                           <BorderColorIcon />
                         </IconButton>
                         <IconButton
                           aria-label="delete"
                           color="secondary"
                           onClick={() => {
                             setcategoryId(category.id);
                             setcategoryName(category.name);
                             setOpen(true);
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
                  {categories.slice(0, limit).map((category) => (
                    <TableRow
                      hover
                      key={category.id}
                      selected={selectedCustomerIds.indexOf(category.id) !== -1}
                    >
                      <TableCell>{category.id}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                            {category.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {moment(category.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(category.updatedAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell color="textPrimary" variant="body1">
                        <IconButton
                          aria-label="update"
                          onClick={() => {
                            setcategoryId(category.id);
                            setName(category.name);
                            setOpenUpdate(true);
                          }}
                        >
                          <BorderColorIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={() => {
                            setcategoryId(category.id);
                            setcategoryName(category.name);
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
        count={categories.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default CustomerListResults;
