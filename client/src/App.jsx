import React, { useEffect, useState } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { Box, useMediaQuery } from "@mui/material";
import Alert from "./components/Alert";
import DataTable from "./components/DataTable";
import PopperForm from "./components/PopperFrom";
import { Button } from "@mui/material";

const App = () => {
  const [datas, setDatas] = useState([]);
  const [editData, setEditData] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const mobileScreen = useMediaQuery("(max-width:600px)");

  const addData = async (formValues) => {
    try {
      const res = await axios.post("/api/datas", { data: formValues });
      if (res.status === 201) {
        setOpenAlert(true);
        setAlertMessage(`${formValues.name} was added!`);
        setDatas([...datas, { ...res.data.data, _id: res.data._id }]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (id, newData) => {
    try {
      const res = await axios.put(`/api/datas/${id}`, { datas: newData });
      if (res.status === 200) {
        const selectedData = datas.find((data) => data._id === id);
        setOpenAlert(true);
        setAlertMessage(`${selectedData.name} was updated!`);
        setDatas(
          datas.map((data) => (data._id === id ? { ...newData } : data))
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEditData({ name: "", mobile: "", dob: "", age: "" });
    }
  };

  const deleteData = async (id) => {
    try {
      const res = await axios.delete(`/api/datas/${id}`);
      if (res.status === 200) {
        const selectedData = datas.find((data) => data._id === id);
        setOpenAlert(true);
        setAlertMessage(`${selectedData.name} was deleted!`);
        setDatas(datas.filter((data) => data._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getDatas = async () => {
      try {
        const res = await fetch("/api/datas");
        const data = await res.json();
        setDatas(data.map((i) => ({ ...i.data, _id: i._id })));
      } catch (error) {
        console.log(error);
      }
    };
    getDatas();
  }, []);

  const handleEdit = (row) => {
    setOpenForm(true);
    setEditData(row);
  };

  const handleDelete = (row) => {
    deleteData(row._id);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h1>Nursing Management System</h1>
      <Box sx={{ width: "80%" }}>
        <DataTable
          data={datas}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          openForm={openForm}
          setEditData={setEditData}
        />
      </Box>
      <Button
        variant="contained"
        onClick={() => {
          setEditData({ name: "", mobile: "", dob: "", age: "" });
          setOpenForm(!openForm);
        }}
        startIcon={<AddIcon />}
      >
        Add
      </Button>
      <PopperForm
        setOpen={setOpenForm}
        open={openForm}
        editData={editData}
        addData={addData}
        updateData={updateData}
      />
      <Alert
        vertical={mobileScreen ? "bottom" : "top"}
        horizontal={"right"}
        message={alertMessage}
        open={openAlert}
        handleClose={() => setOpenAlert(false)}
      />
    </Box>
  );
};

export default App;
