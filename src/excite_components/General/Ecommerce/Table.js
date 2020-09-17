import React from 'react';
import axios from "axios";
import {  notification ,mesaage} from 'antd';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faHamburger } from "@fortawesome/free-solid-svg-icons";
 

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;


const openNotification = (msg) => {
  notification.open({
    message: 'Alert!',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}

export default function OrderTable(props) {

  const removeItem = async (id) =>{
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    console.log()
   
      await axios.get(`https://backend-entr.herokuapp.com/retail/remove-item/${id}/`)
      .then(res =>{
        if (res.status == 200){
          openNotification(res.data['Message'])
        }else{

        }
      })
  
  }
  

  const classes = useStyles();

  const {data,order} = props
  const cutomerOrder = order
  const extra = [12,3,4]
  let iden = 1
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
          
            <TableCell align="center" colSpan={4}>
              Details
            </TableCell>
            <TableCell align="left">Price</TableCell>

          </TableRow>

          <TableRow>
          <TableCell>S/N</TableCell>
            <TableCell>Product</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="left">Sum</TableCell>
            <TableCell align="left">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
              {data.map((row) => (
                <TableRow key={iden}>
                <TableCell>{iden++}</TableCell>
                  <TableCell>{row.Item}</TableCell>
                  <TableCell align="left">{row.Quantity}</TableCell>
                  
                  <TableCell align="left">{ccyFormat(row.total_item_price)}</TableCell>
                  
                  <TableCell align="left">
                  <FontAwesomeIcon 
                    onClick={()=>{removeItem(row.id)}}
                    icon={faTrash} />
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>
            <TableRow>
              <TableCell rowSpan={4} />
              <TableCell colSpan={2}>Order Date</TableCell>
              <TableCell align="left">{cutomerOrder.OrderedDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cart Amount</TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left">{data.length}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="left">
                <p
                style={{fontSize:25}}
                className="totalCount">
                ₦ {cutomerOrder.total}
                </p>
              </TableCell>
            </TableRow>
        
      </Table>
    </TableContainer>
  );
}
