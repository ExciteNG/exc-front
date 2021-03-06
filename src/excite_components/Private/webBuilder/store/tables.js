import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {InputNumber  ,notification  } from 'antd';
import { Link, } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


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

var host = 'http://127.0.0.1:8000'


 

export default function PortalWebTable(props) {

  const redirect = (item_id)=>{
    props.history.push(`/admin-campaign-detail/${item_id}`)
  }
  const classes = useStyles();
  const  token = props.token
  const data = props.websiteList
  let indexNumber = 0
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell >S/N</TableCell>
          
            <TableCell align="left">Preview  </TableCell>
            <TableCell align="left">Created  </TableCell>
            <TableCell align="left">Open  </TableCell>
         
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row.id}>
                 <TableCell align="left" >{indexNumber++}</TableCell>
               <TableCell align="left" >
                 <a href={row.DomainName}
                 target="__blank" >
                   {row.DomainName}
                 </a>
               </TableCell>
              <TableCell align="left">{row.Created}</TableCell>
              <TableCell align="left">
                  <Link to={`/vendor-template/${row.id}`}>
                    Open
                  </Link>
              </TableCell>
            


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


