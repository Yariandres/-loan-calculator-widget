import React from 'react';
import Payments from './Payments';
import { Alert, Container, Label, Form, FormGroup, Button, Input, Row, Col } from 'reactstrap';

class LoanWidget extends React.Component {
  componentDidMount() {
    document.title = "Loan Widget Calculator"
  }

  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange = (e) => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;

    this.setState({
      fields
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      var loanDetails = this.calculateLoan();

      this.setState({
        monthlyIns: loanDetails.monthlyInstallment
      })

      this.resetForm();
      alert("Amount: " + this.state.fields.amount + " Duration: " + this.state.fields.years);
    }
  }

  calculateLoan = (numYear, LoanAmount) => {

    // with an API url I can do the following

    //  request: {"amount":"10000.00","duration":"5"} to be handled

    // fetch("API URL")
    // .then(response => response.json())
    // .then(json => return this.setState...)
    // .catch(...)

    // Returns: {"amount":"10000.00","duration":"5","monthlyInstallment":"5390.61"

    try {
      var loanDetails = {
        duration: numYear,
        amount: LoanAmount,
        monthlyInstallment: "5390.61"
      }
      return loanDetails;
    } catch {
      console.log("Notification for the user")
    }
  }

  resetForm = () => {
    let fields = {};
    fields["amount"] = "";
    fields["years"] = "";
    this.setState({ fields: fields });
  }

  // form validation
  validateForm = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    // if the there is no input
    if (!fields["amount"]) {
      formIsValid = false;
      errors["amount"] = <Alert color="warning">*Please enter a loan amount</Alert>;
    }

    // if input is > than the available amount
    if (fields["amount"] > 100.000) {
      formIsValid = false;
      errors["amount"] = <Alert color="danger">*Please enter a value between 1K to 100K</Alert>;
    }

    // if the there is no input
    if (!fields["years"]) {
      formIsValid = false;
      errors["years"] = <Alert color="warning">*Please enter the duration for the loan</Alert>;
    }

    // if input is > than the number of years available
    if (fields["years"] > 10) {
      formIsValid = false;
      errors["years"] = <Alert color="danger">*Please enter a value between 1 to 5 years</Alert>;
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  render() {
    return (
      <Container>
        <h1 className="text-center my-5 heading-main">Loan Payment Calculator</h1>
        <Row>
          <Col xs="12" sm="5" className="jumbotron">
            <Form method="post" onSubmit={this.handleSubmit} >
              <FormGroup>
                <Label className="lead">Loan amount:</Label>
                <Input
                  type="number"
                  name="amount"
                  value={this.state.fields.amount}
                  onChange={this.handleChange}
                  placeholder="Max: €100.000" />
                <div className="errorMsg">{this.state.errors.amount}</div>
              </FormGroup>

              <FormGroup>
                <Label className="lead">Number of years:</Label>
                <Input
                  type="number"
                  name="years"
                  value={this.state.fields.years}
                  onChange={this.handleChange}
                  placeholder="Max: 5 yrs" />
                <div className="errorMsg">{this.state.errors.years}</div>
              </FormGroup>

              <Button outline color="primary" type="submit">Calculate</Button>
            </Form>
          </Col>

          <Payments amount={this.state.fields.amount} duration={this.state.fields.years} monthlyIns={this.state.monthlyIns} />

        </Row>
      </Container>

    );
  }
}

export default LoanWidget;