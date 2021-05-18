import React, { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';

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
  customRows: {
    '&> .MuiTableCell-root': {
      borderBottom: '0px solid rgba(224, 224, 224, 1)',
    },
  },
  table: {
    minWidth: 650,
  },
  button: {
    padding: 10,
    display: 'flex',
    justifyContent: 'flex-start',
  },
});

export default function DenseTable(props) {
  const classes = useStyles();
  const key = useRef(null);
  const {
    handleSave,
    selectedItems,
    selectedTable,
    selectedSalePerson,
    deleteSelectedItem,
    handleQuantityChange,
  } = props;
  const [quantity, setQuantity] = useState(0);
  const totalAmount =
    selectedItems &&
    selectedItems.length &&
    selectedItems.reduce(
      (accumulator, current) =>
        accumulator + current.quantity * current.tagRate,
      0
    );

  const handleDelete = (event, item) => {
    deleteSelectedItem(item);
  };

  const handleSaveRecord = () => {
    handleSave();
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
            <TableCell width='1%'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedItems.map((row) => (
            <TableRow key={row.name} className={classes.root}>
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
                    style={{ color: 'red' }}
                  >
                    <RemoveCircleOutlineRoundedIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell align='left'>{row.tagRate}</TableCell>
              <TableCell align='left'>{row.quantity * row.tagRate}</TableCell>
              <TableCell align='center'>
                <DeleteIcon
                  onClick={(event) => handleDelete(event, row)}
                  style={{ color: 'red' }}
                />
              </TableCell>
            </TableRow>
          ))}
          {selectedItems.length ? (
            <>
              <TableRow className={classes.customRows}>
                <TableCell scope='row'>
                  <Box></Box>
                </TableCell>
                <TableCell scope='row'></TableCell>
                <TableCell
                  scope='row'
                  style={{
                    fontSize: '15px',
                    fontWeight: 'bold',
                    backgroundColor: '#ff0c0033',
                  }}
                >
                  Total :
                </TableCell>
                <TableCell
                  scope='row'
                  style={{
                    fontSize: '15px',
                    fontWeight: 'bold',
                    backgroundColor: '#ff0c0033',
                  }}
                >
                  {`Rs ${totalAmount}`}
                </TableCell>
                <TableCell scope='row'></TableCell>
              </TableRow>
              <TableRow className={classes.customRows}>
                <TableCell scope='row'>
                  <Box></Box>
                </TableCell>
                <TableCell scope='row'></TableCell>
                <TableCell
                  scope='row'
                  style={{
                    fontSize: '15px',
                    fontWeight: 'bold',
                    backgroundColor: '#17cf6a40',
                  }}
                >
                  GST:
                </TableCell>
                <TableCell
                  scope='row'
                  style={{
                    fontSize: '15px',
                    fontWeight: 'bold',
                    backgroundColor: '#17cf6a40',
                  }}
                >
                  {`Rs ${Math.floor(totalAmount + totalAmount * 0.16)}`}
                </TableCell>
                <TableCell scope='row'></TableCell>
              </TableRow>
            </>
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
      {selectedItems.length ? (
        <Box className={classes.button}>
          <Button
            color='primary'
            variant='contained'
            onClick={handleSaveRecord}
            disabled={!(!!selectedSalePerson && !!selectedTable)}
          >
            Save
          </Button>
        </Box>
      ) : (
        <></>
      )}
    </TableContainer>
  );
}
