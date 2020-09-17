import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import axios from "axios";
import { connect } from "react-redux"; 
import {InputNumber  ,notification } from 'antd';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBoxOpen } from "@fortawesome/free-solid-svg-icons";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const  openNotification = (msg) => {
    notification.open({
      message: 'Notification Title',
      description:msg,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
    }

export default function InvoiceOrderCartTable (props){
    console.log('The Users', props.data) 
    const classes = useStyles();
    const  token = props.token
    const cartData = props.data
    let indexNumber = 1
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell >S/N</TableCell>
          <TableCell align="left">Client Name</TableCell>            
            <TableCell align="left"> Client Email </TableCell>
            <TableCell align="left"> Created</TableCell>
            <TableCell align="left"> Total</TableCell>
       
            <TableCell align="left">View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
        { 
          cartData.map((row) => (
            <TableRow key={row.id}>
            <TableCell >{indexNumber++}</TableCell>
              <TableCell align="left">{row.ClientName}</TableCell>
              <TableCell align="left">{row.ClientEmail}</TableCell>
              <TableCell align="left">{row.OrderedDate}</TableCell>
              <TableCell align="left">
              {row.getOrderCost}
               </TableCell>
              
            </TableRow>
          ))
          }

        </TableBody>
      </Table>
     
    </TableContainer>
  );


} 