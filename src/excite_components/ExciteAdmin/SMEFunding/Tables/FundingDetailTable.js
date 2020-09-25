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

var host = 'http://127.0.0.1:8000'

export default function FundingDetailTableDrag(props) {
  const classes = useStyles();
  const  token = props.token
  const i = props.data
   
  var indexNumber = 1
 
  return (
        <>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell >S/N</TableCell>
          
          <TableCell align="left">Business Name </TableCell>  

          <TableCell align="left">Duration</TableCell> 
              
              <TableCell align="left">Amount Requested </TableCell>
              <TableCell align="left">Granted Status</TableCell>
              <TableCell align="left">Inteest</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow key={i.id}>
                    <TableCell >{indexNumber++}</TableCell>
                    <TableCell align="left">{i.BusinessName}</TableCell>
                    <TableCell align="left">{i.LoanDuration}</TableCell>
                    <TableCell align="left">
                       {i.AmoutRequested}
                    </TableCell>
                    <TableCell align="left">
                        {
                            i.Permitted? (
                                <p className="completed-task">
                                  Loan Granted
                                </p>
                            ) : (
                                <p className="unCompleted-task">
                                    Pending 
                                </p>
                            )
                        }
                    </TableCell>
                    <TableCell align="left">
                        {
                          i.Permitted ? (
                            <p className="completed-task">
                            {i.Intrest}

                            </p>
                          ) : (
                            <p className="unCompleted-task">
                              Please Update
                            </p>
                          )
                        }
                    </TableCell>
                    </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

    
        </>
  );
}


