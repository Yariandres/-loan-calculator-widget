import React from 'react';
import { Col } from 'reactstrap';

class Payments extends React.Component {

  render() {
    return (<>
      {this.props.monthlyIns && <Col xs="12" sm="7">
        <h2 className="lead text-center mt-4 result-heading">Your monthly payment:</h2>
        <p className="lead text-center mt-5" id="currency">€<span id="numeral">{this.props.monthlyIns}</span></p>
      </Col>}
      {!this.props.monthlyIns && <h1 className="text-center heading-main">Click calculate to get your monthly instalments</h1>}
      </>
    )
  }
}
export default Payments;