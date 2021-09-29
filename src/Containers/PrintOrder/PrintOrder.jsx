import React, { Component } from 'react';
import moment from 'moment';

export default class PrintOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: props.selectedItems,
    };
  }
  render() {
    const { selectedItems, orderNo, isEditMode, tablesList, selectedTable,remarks } =
      this.props;
    const selectedTableDetails =
      tablesList &&
      tablesList.data.find((item) => {
        return item.tableCode === selectedTable;
      });
    return (
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <b>Nisa Sultan (KOT)</b>
        </div>
        <hr />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isEditMode ? 'Updated Order' : 'New Order'}&nbsp; -&nbsp;
          {moment().format('L')}&nbsp;:&nbsp;{moment().format('LT')}
        </div>
        <hr />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Order No:{' '}
          {isEditMode
            ? selectedItems && selectedItems.length && selectedItems[0].scono
            : orderNo}
          &nbsp;:&nbsp;
          {isEditMode
            ? selectedItems &&
              selectedItems.length &&
              selectedItems[0].tableName
            : selectedTableDetails
            ? selectedTableDetails.name
            : ''}
        </div>
        <hr />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Waiter Name: {this.props.loggedInUserName}
        </div>
        <hr />
        <div
          style={{
            display: 'flex',
            alignItems: 'left',
            justifyContent: 'left',
          }}
        >
          Remarks: {remarks}
        </div>
        <hr />
        <hr />
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <table>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Item Name </th>
                <th></th>
                <th style={{ textAlign: 'left' }}>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems &&
                selectedItems.map((item) => {
                  return (
                    <tr key={item.pk}>
                      <td style={{ textAlign: 'left' }}>{item.name}</td>
                      <td></td>
                      <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
