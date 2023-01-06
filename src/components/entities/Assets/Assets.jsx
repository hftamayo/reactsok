import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }));

  const Assets = () => {
      const styles = useStyles();
      const [data, setData]=useState([]);
      const [modalInsert, setModalInsert]=useState(false);
      const [modalEdit, setModalEdit]=useState(false);
      const [modalDelete, setModalDelete]=useState(false);
      
      const [selectedAsset, setSelectedAsset]=useState({
        name: '',
        description:'',
        comments: '',
        commands: '',
        status: '',
        opsystem: '',
        subcat: '',
      });
      
      const handleChange=e=>{
        const {name, value}=e.target;
        setSelectedAsset(prevState=>({
          ...prevState,
          [name]: value
        }))
      }    

      const openCloseModalInsert=()=>{
        setModalInsert(!modalInsert);
      }
    
      const openCloseModalEdit=()=>{
        setModalEdit(!modalEdit);
      }
    
      const openCloseModalDelete=()=>{
        setModalDelete(!modalDelete);
      }
    
      const selectAsset=(assect, action)=>{
        setSelectedAsset(asset);
        (action==='Edit')?openCloseModalEdit():openCloseModalDelete()
      }      
      

  }

  export default Assets;