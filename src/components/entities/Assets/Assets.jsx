import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Modal,
  Button,
  TextField,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

const Assets = () => {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [selectedAsset, setSelectedAsset] = useState({
    name: "",
    description: "",
    comments: "",
    commands: "",
    status: "",
    opsystem: "",
    subcat: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedAsset((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const openCloseModalInsert = () => {
    setModalInsert(!modalInsert);
  };

  const openCloseModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const openCloseModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const selectAsset = (assect, action) => {
    setSelectedAsset(asset);
    action === "Edit" ? openCloseModalEdit() : openCloseModalDelete();
  };

  const newRecord = async () => {
    fireDb.child("assets").push(state, (err) => {
      if (err) {
        toast.error(err);
      } else {
        toast.success("Record added successfully");
      }
    });
    openCloseModalInsert();
  };

  const updateRecord = async () => {
    fireDb.child(`assets/${id}`).set(state, (err) => {
      if (err) {
        toast.error(err);
      } else {
        toast.success("Record updated successfully");
      }
    });
    openCloseModalInsert();
  };

  const deleteRecord = async () => {
    fireDb.child(`assets/${id}`).remove(state, (err) => {
      if (err) {
        toast.error(err);
      } else {
        toast.success("Record deleted successfully");
      }
    });
    openCloseModalDelete();
  };

  useEffect(() => {
    fireDb.child("assets").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    };
  }, []);

  const bodyInsert = (
    <div className={styles.modal}>
      <h3>Adding an Asset</h3>
      <TextField
        name="name"
        className={styles.inputMaterial}
        label="Name"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="description"
        className={styles.inputMaterial}
        label="Description"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="comments"
        className={styles.inputMaterial}
        label="Comments"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="commands"
        className={styles.inputMaterial}
        label="Commands"
        onChange={handleChange}
      />
      <br />
      <label htmlFor="status">Status</label>
      <input
        type="number"
        id="status"
        name="status"
        placeholder="Status"
        value={status || ""}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="opsystem">Related to</label>
      {/* <select value={equipment || ""} onChange={handleInputChange}> */}
      <select name="opsystem" onChange={handleChange}>
        <option value="">Please choose a value</option>
        <option value="popOS">popOS</option>
        <option value="Kali">Kali</option>
        <option value="Android">Android</option>
      </select>
      <br />
      <label htmlFor="subcat">Sub-Category</label>
      {/* <select value={equipment || ""} onChange={handleInputChange}> */}
      <select name="subcat" onChange={handleChange}>
        <option value="">Please choose a value</option>
        <option value="infosec">InfoSec</option>
        <option value="web3">Web 3</option>
        <option value="backend">BackEnd Dev</option>
        <option value="frontend">FrontEnd Dev</option>
        <option value="devops">DevOps</option>
        <option value="machinelearning">Machine Learning</option>
      </select>
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => newRecord()}>
          Save
        </Button>
        <Button onClick={() => openCloseModalInsert()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEdit = (
    <div className={styles.modal}>
      <h3>Updating Asset Info</h3>
      <TextField
        name="name"
        className={styles.inputMaterial}
        label="Name"
        onChange={handleChange}
        value={selectedAsset && selectedAsset.name}
      />
      <br />
      <TextField
        name="description"
        className={styles.inputMaterial}
        label="Description"
        onChange={handleChange}
        value={selectedAsset && selectedAsset.description}
      />
      <br />
      <TextField
        name="comments"
        className={styles.inputMaterial}
        label="Comments"
        onChange={handleChange}
        value={selectedAsset && selectedAsset.comments}
      />
      <br />
      <TextField
        name="commands"
        className={styles.inputMaterial}
        label="Commands"
        onChange={handleChange}
        value={selectedAsset && selectedAsset.commands}
      />
      <br />
      <label htmlFor="status">Status</label>
      <input
        type="number"
        id="status"
        name="status"
        placeholder="Status"
        value={(selectedAsset && selectedAsset.status) || ""}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="opsystem">Related to</label>
      {/* <select value={equipment || ""} onChange={handleInputChange}> */}
      <select name="opsystem" onChange={handleChange}>
        <option value="">Please choose a value</option>
        <option value="popOS">popOS</option>
        <option value="Kali">Kali</option>
        <option value="Android">Android</option>
      </select>
      <br />
      <label htmlFor="subcat">Sub-Category</label>
      {/* <select value={equipment || ""} onChange={handleInputChange}> */}
      <select name="subcat" onChange={handleChange}>
        <option value="">Please choose a value</option>
        <option value="infosec">InfoSec</option>
        <option value="web3">Web 3</option>
        <option value="backend">BackEnd Dev</option>
        <option value="frontend">FrontEnd Dev</option>
        <option value="devops">DevOps</option>
        <option value="machinelearning">Machine Learning</option>
      </select>
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => updateRecord()}>
          Save
        </Button>
        <Button onClick={() => openCloseModalEdit()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyDelete = (
    <div className={styles.modal}>
      <p>
        The bellow asset will be deleted, press OK for confirmation{" "}
        <b>{selectedAsset && selectedAsset.name}</b> ?{" "}
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => deleteRecord()}>
          OK
        </Button>
        <Button onClick={() => openCloseModalDelete()}>Cancel</Button>
      </div>
    </div>
  );

  return (
    <div className="App">
      <br />
      <Button onClick={() => openCloseModalInsert()}>New Asset</Button>
      <br />
      <br />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Belongs To</TableCell>
              <TableCell>SubCategory</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map(console=>(
              <TableRow key={console.id}>
                <TableCell>{console.osID}</TableCell>
                <TableCell>{console.subCatID}</TableCell>
                <TableCell>{console.name}</TableCell>
                <TableCell>{console.status}</TableCell>
                <TableCell>
                  <Edit className={styles.iconos} onClick={()=>selectedAsset(console, 'Edit')}/>
                  &nbsp;&nbsp;&nbsp;
                  <Delete className={styles.iconos} onClick={()=>selectedAsset(console, 'Delete')}/>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
    </div>
  );
};

export default Assets;
