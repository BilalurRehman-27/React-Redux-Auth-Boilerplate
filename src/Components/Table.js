import React, { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  root: {
    '&:hover ': {
      backgroundColor: '#eeeeee',
      transition: 'ease-in 200ms',
      cursor: 'pointer',
      '& button': {
        opacity: 1,
        transition: 'ease-in 200ms',
      },
    },
  },
  table: {
    minWidth: 650,
  },
});

export default function DenseTable(props) {
  const classes = useStyles();
  const key = useRef(null);
  const { selectedItems, handleQuantityChange } = props;
  const [quantity, setQuantity] = useState(0);
  const handleDelete = (event, item) => {
    debugger;
  };

  useEffect(() => {}, [quantity]);

  const handleChange = (value, row) => {
    const re = /^[0-9\b]+$/;
    if (value === '' || re.test(value)) {
      setQuantity(value);
      handleQuantityChange(value, row.id);
    }
  };

  const handleDecrement = (value, row) => {
    setQuantity(--value);
    handleQuantityChange(value, row.id);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell width='1%'></TableCell>
            <TableCell width='5%'>Name</TableCell>
            <TableCell width='1%' align='left'>
              Quantity
            </TableCell>
            <TableCell align='left' width='1%'>
              Price
            </TableCell>
            <TableCell align='left' width='1%'>
              Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedItems.map((row) => (
            <TableRow key={row.name} className={classes.root}>
              <TableCell align='center'>
                <DeleteIcon
                  onClick={(event) => handleDelete(event, row)}
                  style={{ color: 'red' }}
                />
              </TableCell>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='left'>
                <Box style={{ display: 'flex' }}>
                  <TextField
                    style={{ width: '100%' }}
                    id='outlined-basic'
                    variant='outlined'
                    value={row.quantity}
                    size='small'
                    color='primary'
                    ref={key}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => {
                      handleChange(e.target.value, row);
                    }}
                  />
                  <IconButton
                    onClick={() => handleDecrement(row.quantity, row)}
                  >
                    <RemoveCircleOutlineRoundedIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell align='left'>{row.tagRate}</TableCell>
              <TableCell align='left'>{row.quantity * row.tagRate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
