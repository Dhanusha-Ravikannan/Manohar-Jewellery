
// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   Box,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import { RiAddCircleFill, RiDeleteBin6Line, RiEyeLine } from "react-icons/ri";
// import { useNavigate } from "react-router-dom";
// import "../Home/Home.css";
// import axios from "axios";

// const RoundedTextField = styled(TextField)({
//   maxWidth: 300,
//   backgroundColor: "#f9f9f9",
//   marginTop: "9rem",
//   "& .MuiOutlinedInput-root": {
//     borderRadius: "20px",
//     paddingLeft: "16px",
//     "& fieldset": {
//       borderColor: "#ccc",
//     },
//     "&:hover fieldset": {
//       borderColor: "#888",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#1976d2",
//     },
//   },
// });

// const StyledCard = styled(Card)({
//   backgroundColor: "#e3f2fd",
//   borderRadius: "15px",
//   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//   width: "180px",
//   margin: "10px",
//   "&:hover": {
//     boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
//   },
// });

// const StyledButton = styled(Button)({
//   borderRadius: "20px",
//   padding: "8px 20px",
//   fontSize: "16px",
// });

// const StyledDialog = styled(Dialog)({
//   "& .MuiDialog-paper": {
//     padding: "20px",
//     borderRadius: "15px",
//     backgroundColor: "#fff",
//   },
// });

// function Home() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [open, setOpen] = useState(false);
//   const [lotNumber, setLotNumber] = useState("");
//   const [lotNumbers, setLotNumbers] = useState([]);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
//   const [deleteIndex, setDeleteIndex] = useState(null);
//   const navigate = useNavigate(); // React Router hook for navigation


// // useEffect(() => {
// //   const fetchProducts = async () => {
// //     try {
// //       const response = await axios.get("http://localhost:5002/api/v1/lot");
// //       setLotNumbers(response.data);
// //     } catch (error) {
// //       console.error("Failed to fetch products:", error);
// //     }
// //   };
// //   fetchProducts();
// // }, []);
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setLotNumber("");
//   };

//   const handleLotNumberChange = (e) => {
//     const value = e.target.value.toUpperCase();
//     if (value === "" || /^[A-Z]{1}\d{0,2}$/.test(value)) {
//       setLotNumber(value);
//     }
//   };

//   const handleSaveLotNumber = async () => {
//     if (lotNumber) {
//       try {
//         const response = await fetch(
//           "http://localhost:5002/api/v1/lot/lot_info",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               lot_name: lotNumber,
//             }),
//           }
//         );

//         const result = await response.json();

//         if (response.ok) {
//           setLotNumbers((prev) => [...prev, lotNumber]);
//           setSuccessMessage("Lot created successfully!");
//           setLotNumber("");
//         } else {
//           console.error("Error:", result.msg);
//           setSuccessMessage(result.msg || "Error creating lot.");
//         }
//       } catch (error) {
//         console.error("Failed to save Lot No:", error);
//         setSuccessMessage("Failed to save Lot No.");
//       }
//     } else {
//       setSuccessMessage("Lot Name is required.");
//     }
//   };

//   const handleDeleteLotNumber = (index) => {
//     setDeleteIndex(index);
//     setDeleteConfirmationOpen(true);
//   };

//   const confirmDelete = () => {
//     const updatedLotNumbers = [...lotNumbers];
//     updatedLotNumbers.splice(deleteIndex, 1);
//     setLotNumbers(updatedLotNumbers);
//     setDeleteConfirmationOpen(false);
//     setSuccessMessage("Lot deleted successfully");
//   };

//   const handleCloseSnackbar = () => {
//     setSuccessMessage("");
//   };

//   const handleCloseDeleteDialog = () => {
//     setDeleteConfirmationOpen(false);
//     setDeleteIndex(null);
//   };

//   const handleViewLotDetails = (lotId) => {
//     // Navigate to Navbar page with the selected lot ID in the URL
//     navigate(`/Navbar/${lotId}`);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         mt: 4,
//       }}
//     >
//       <Box sx={{ display: "flex", alignItems: "center" }}>
//         <RoundedTextField
//           label="Search Lot No"
//           variant="outlined"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search Lot No"
//           fullWidth
//         />
//         <IconButton sx={{ ml: 1 }} onClick={handleClickOpen}>
//           <RiAddCircleFill
//             style={{ marginTop: "9rem", marginLeft: "5rem" }}
//             size={30}
//             color="#1976d2"
//           />
//         </IconButton>
//       </Box>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Add Lot No</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Lot No"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={lotNumber}
//             onChange={handleLotNumberChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSaveLotNumber}
//             color="primary"
//             variant="contained"
//           >
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <StyledDialog
//         open={deleteConfirmationOpen}
//         onClose={handleCloseDeleteDialog}
//         aria-labelledby="delete-lot-number-dialog"
//       >
//         <DialogTitle
//           sx={{ fontSize: "18px", fontWeight: "bold", color: "#1976d2" }}
//         >
//           Confirm Deletion
//         </DialogTitle>
//         <DialogContent>
//           <Typography variant="body1" sx={{ mb: 2 }}>
//             Are you sure you want to delete this Lot No?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <StyledButton
//             onClick={handleCloseDeleteDialog}
//             color="secondary"
//             variant="outlined"
//           >
//             Cancel
//           </StyledButton>
//           <StyledButton
//             onClick={confirmDelete}
//             color="primary"
//             variant="contained"
//           >
//             Yes, Delete
//           </StyledButton>
//         </DialogActions>
//       </StyledDialog>

//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           mt: 2,
//           maxWidth: "100%",
//         }}
//       >
//         {lotNumbers.map((lot, index) => (
//           <StyledCard key={index}>
//             <CardContent sx={{ textAlign: "center" }}>
//               <Typography
//                 variant="h6"
//                 sx={{
//                   fontWeight: "bold",
//                   color: "#0d47a1",
//                   mb: 1,
//                   fontSize: "1.2rem",
//                 }}
//               >
//                 {lot}
//               </Typography>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   px: 2,
//                 }}
//               >
//                 <IconButton onClick={() => handleDeleteLotNumber(index)}>
//                   <RiDeleteBin6Line color="#ff1744" size={20} />
//                 </IconButton>
//                 <IconButton onClick={() => handleViewLotDetails(lot)}>
//                   <RiEyeLine color="#1976d2" size={20} />
//                 </IconButton>
//               </Box>
//             </CardContent>
//           </StyledCard>
//         ))}
//       </Box>

//       {successMessage && (
//         <Snackbar
//           open={Boolean(successMessage)}
//           autoHideDuration={3000}
//           onClose={handleCloseSnackbar}
//         >
//           <Alert
//             onClose={handleCloseSnackbar}
//             severity={
//               successMessage === "Failed to save Lot No." ? "error" : "success"
//             }
//           >
//             {successMessage}
//           </Alert>
//         </Snackbar>
//       )}
//     </Box>
//   );
// }

// export default Home;




import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import { RiAddCircleFill, RiDeleteBin6Line, RiEyeLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "../Home/Home.css";
import axios from "axios";

const RoundedTextField = styled(TextField)({
  maxWidth: 300,
  backgroundColor: "#f9f9f9",
  marginTop: "9rem",
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    paddingLeft: "16px",
    "& fieldset": {
      borderColor: "#ccc",
    },
    "&:hover fieldset": {
      borderColor: "#888",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
    },
  },
});

const StyledCard = styled(Card)({
  backgroundColor: "#e3f2fd",
  borderRadius: "15px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  width: "180px",
  margin: "10px",
  "&:hover": {
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
  },
});

const StyledButton = styled(Button)({
  borderRadius: "20px",
  padding: "8px 20px",
  fontSize: "16px",
});

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    padding: "20px",
    borderRadius: "15px",
    backgroundColor: "#fff",
  },
});

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [lotNumber, setLotNumber] = useState("");
  const [lotNumbers, setLotNumbers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchLotNumbers = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/v1/lot");
        setLotNumbers(response.data);
        localStorage.setItem("lotNumbers", JSON.stringify(response.data)); 
      } catch (error) {
        console.error("Failed to fetch lot numbers:", error);
      }
    };

    const savedLotNumbers = localStorage.getItem("lotNumbers");
    if (savedLotNumbers) {
      setLotNumbers(JSON.parse(savedLotNumbers)); // Load from localStorage
    } else {
      fetchLotNumbers(); // If no local storage, fetch from the backend
    }
  }, []); 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLotNumber("");
  };

  const handleLotNumberChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (value === "" || /^[A-Z]{1}\d{0,2}$/.test(value)) {
      setLotNumber(value);
    }
  };

  const handleSaveLotNumber = async () => {
    if (lotNumber) {
      try {
        const response = await fetch(
          "http://localhost:5002/api/v1/lot/lot_info",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lot_name: lotNumber,
            }),
          }
        );

        const result = await response.json();

        if (response.ok) {
          const updatedLotNumbers = [...lotNumbers, lotNumber];
          setLotNumbers(updatedLotNumbers); 
          localStorage.setItem("lotNumbers", JSON.stringify(updatedLotNumbers)); 
          setSuccessMessage("Lot created successfully!");
          setLotNumber("");
        } else {
          console.error("Error:", result.msg);
          setSuccessMessage(result.msg || "Error creating lot.");
        }
      } catch (error) {
        console.error("Failed to save Lot No:", error);
        setSuccessMessage("Failed to save Lot No.");
      }
    } else {
      setSuccessMessage("Lot Name is required.");
    }
  };

  const handleDeleteLotNumber = (index) => {
    setDeleteIndex(index);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = () => {
    const updatedLotNumbers = [...lotNumbers];
    updatedLotNumbers.splice(deleteIndex, 1); 
    setLotNumbers(updatedLotNumbers);
    localStorage.setItem("lotNumbers", JSON.stringify(updatedLotNumbers)); 
    setDeleteConfirmationOpen(false);
    setSuccessMessage("Lot deleted successfully");
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
  };

  const handleCloseDeleteDialog = () => {
    setDeleteConfirmationOpen(false);
    setDeleteIndex(null);
  };

  const handleViewLotDetails = (lotId) => {
    
    navigate(`/Navbar/${lotId}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <RoundedTextField
          label="Search Lot No"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Lot No"
          fullWidth
        />
        <IconButton sx={{ ml: 1 }} onClick={handleClickOpen}>
          <RiAddCircleFill
            style={{ marginTop: "9rem", marginLeft: "5rem" }}
            size={30}
            color="#1976d2"
          />
        </IconButton>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Lot No</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Lot No"
            type="text"
            fullWidth
            variant="outlined"
            value={lotNumber}
            onChange={handleLotNumberChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveLotNumber}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <StyledDialog
        open={deleteConfirmationOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-lot-number-dialog"
      >
        <DialogTitle
          sx={{ fontSize: "18px", fontWeight: "bold", color: "#1976d2" }}
        >
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to delete this Lot No?
          </Typography>
        </DialogContent>
        <DialogActions>
          <StyledButton
            onClick={handleCloseDeleteDialog}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </StyledButton>
          <StyledButton
            onClick={confirmDelete}
            color="primary"
            variant="contained"
          >
            Yes, Delete
          </StyledButton>
        </DialogActions>
      </StyledDialog>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          mt: 2,
          maxWidth: "100%",
        }}
      >
        {lotNumbers.map((lot, index) => (
          <StyledCard key={index}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#0d47a1",
                  mb: 1,
                  textTransform: "uppercase",
                }}
              >
                {lot}
              </Typography>
              <IconButton
                onClick={() => handleViewLotDetails(lot)}
                color="primary"
                size="small"
              >
                <RiEyeLine size={18} />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteLotNumber(index)}
                color="secondary"
                size="small"
              >
                <RiDeleteBin6Line size={18} />
              </IconButton>
            </CardContent>
          </StyledCard>
        ))}
      </Box>

      {successMessage && (
        <Snackbar
          open={!!successMessage}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}

export default Home;




