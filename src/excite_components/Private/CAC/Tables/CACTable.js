import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux"; 
import {InputNumber  ,notification,  } from 'antd';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faHamburger } from "@fortawesome/free-solid-svg-icons";


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

var host = 'https://backend-entr.herokuapp.com'

export default function CACTableSimple(props) {
  const classes = useStyles();
  const  token = props.token
  const row = props.data
   
  var indexNumber = 1
 
  return (
        <>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell >S/N</TableCell>
          <TableCell align="left">Business Name </TableCell>          
              <TableCell align="left">Verified </TableCell>
              <TableCell align="left">Payment Status</TableCell>
              <TableCell align="left">Date Registered</TableCell>
              <TableCell align="left">View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
            {
                row.map((i)=>(
                    <>
                    <TableRow key={row.id}>
                    <TableCell >{indexNumber++}</TableCell>
                    <TableCell align="left">{i.Name}</TableCell>
                    <TableCell align="left">{i.DateCreated}</TableCell>
                    <TableCell align="left">
                        {
                            i.Verified ? (
                                <p>
                                  Verification Complete  
                                </p>
                            ) : (
                                <p>
                                Pending Review
                                </p>
                            )
                        }
                    </TableCell>
                    <TableCell align="left">
                        {
                            i.Paid? (
                                <p>
                                    Payment Made
                                </p>
                            ) : (
                                <p>
                                    Pending Payment
                                </p>
                            )
                        }
                    </TableCell>
                    <TableCell align="left">
                        <Link to={`/business-data/${i.id}`}>
                            Open
                        </Link>
                    </TableCell>
                    </TableRow>
                    </>
                ))
            }
       
        </TableBody>
      </Table>
    </TableContainer>

    
        </>
  );
}


