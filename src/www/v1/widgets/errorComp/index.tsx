import React, { Component } from 'react';

export class ErrorComp extends Component {
  render() {
    throw new Error('WhBt');
    return <div></div>;
  }
}
