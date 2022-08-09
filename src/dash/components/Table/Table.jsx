import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import moment from 'moment';

function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}

const rows = [
  createData("Lasania Chiken Fri", 18908424, "2 March 2022", "Approved"),
  createData("Big Baza Bang ", 18908424, "2 March 2022", "Pending"),
  createData("Mouth Freshner", 18908424, "2 March 2022", "Approved"),
  createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
];


const makeStyle=(status)=>{
  if(status === 'Approved')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 'Pending')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function BasicTable(props) {
  console.log('table',props.data)
  let data = props.data
  
  return (
      <div className="Table">
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029",marginLeft:'3%',marginTop:'2%' }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
              <TableRow >
                <TableCell style={{color:'#000'}}>Txn hash</TableCell>
                <TableCell align="left" style={{color:'#000'}}>Date</TableCell>
                <TableCell align="left" style={{color:'#000'}}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {data.map((row,index) => {
                let date = new Date(Number(row.time) * 1000);
                let now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),date.getUTCDate(), date.getUTCHours(),date.getUTCMinutes(), date.getUTCSeconds());
                return(<TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" style={{color:'#000'}} scope="row">{String(row.hash).slice(0,16)+"..."}</TableCell>
                  <TableCell align="left" style={{color:'#000'}}>{ moment.utc(date).format("DD/MM/YYYY hh:mm:ss")}</TableCell>
                  <TableCell align="left" style={{color:'blue'}}><a href={"https://www.bscscan.com/tx/"+row.hash} target="_blank"><div>View Transaction</div></a></TableCell>
                </TableRow>)
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
