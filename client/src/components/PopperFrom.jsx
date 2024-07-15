import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

const isValidMobileNumber = (number) => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(number);
};

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

const PopperForm = ({ open, setOpen, editData, addData, updateData }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    mobile: "",
    dob: "",
    age: "",
  });

  const [errors, setErrors] = useState({});

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
      age: name === "dob" ? calculateAge(value) : prevValues.age,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = formValues.name ? "" : "Name is required";
    tempErrors.mobile =
      formValues.mobile && isValidMobileNumber(formValues.mobile)
        ? ""
        : "Valid Indian mobile number is required";
    tempErrors.dob = formValues.dob ? "" : "Date of Birth is required";
    tempErrors.age = formValues.age >= 18 ? "" : "Age must be at least 18";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };
  console.log("editData", !!editData?.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      !!editData.name
        ? updateData(editData._id, formValues)
        : addData(formValues);
      console.log(formValues);
      handleClose();
    }
  };

  useEffect(() => {
    setFormValues(editData);
    /*eslint-disable-next-line */
  }, [editData]);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              textTransform: "Uppercase",
              fontWeight: "bolder",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!!editData.name ? "edit Details" : "create details"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Mobile Number"
              name="mobile"
              type="number"
              value={formValues.mobile}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.mobile}
              helperText={errors.mobile}
            />
            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              value={formValues.dob}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.dob}
              helperText={errors.dob}
            />
            <TextField
              label="Age"
              name="age"
              type="number"
              value={formValues.age}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="normal"
              disabled
              error={!!errors.age}
              helperText={errors.age}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default PopperForm;
