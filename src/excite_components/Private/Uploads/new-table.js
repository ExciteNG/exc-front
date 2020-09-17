import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

const BasicTable = () => {
  return (
    <MDBTable responsive>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th>Heading</th>
          <th>Heading</th>
          <th>Heading</th>
          <th>Heading</th>
          <th>Heading</th>
          <th>Heading</th>
          <th>Heading</th>
          <th>Heading</th>
          <th>Heading</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>1</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
      </MDBTableBody>
    </MDBTable>
  );
}

export default BasicTable;