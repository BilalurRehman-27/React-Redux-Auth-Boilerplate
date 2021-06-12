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
    return (
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <b>NISA SULTAN</b>
        </div>
        <hr />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {this.props.isEditMode ? 'Updated Order' : 'New Order'}&nbsp; -&nbsp;
          {moment().format('L')}&nbsp;:&nbsp;{moment().format('LT')}
        </div>
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
                <th style={{ textAlign: 'right' }}>Item Name </th>
                <th></th>
                <th style={{ textAlign: 'left' }}>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {this.props.selectedItems.map((item) => {
                return (
                  <tr key={item.pk}>
                    <td style={{ textAlign: 'right' }}>{item.name}</td>
                    <td></td>
                    <td>{item.quantity}</td>
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
