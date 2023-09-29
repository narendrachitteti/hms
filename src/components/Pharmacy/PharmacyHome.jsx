import React, { Component } from 'react'
import PharmacyNav from './PharmacyNav'
import Phar1 from './images/phar1.jpg'

export default class PharmacyHome extends Component {
  render() {
    return (
      <div><PharmacyNav/>
     <img src={Phar1}  style={{ width: '100%', height: '580px' }} /> </div>
    )
  }
}
