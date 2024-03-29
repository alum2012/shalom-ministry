import React from 'react';
import { toast } from 'react-toastify';
import Form from '../../common/form';
import Joi from 'joi-browser';
import { CWATregister } from '../../../services/userService';
import CWATpPlan from '../../../assets/Register/Payment-Plan--CWAT-Registration-Page-trnsprnt.png';
import qrCode from '../../../assets/Register/Cashapp-Code--CWAT-Registration-Page-trnsprnt.png';
import './CWATregisterForm.css';

class CWATRegister extends Form {
  state = {
    data: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      allergies: '',
      questions: '',
      discover: '',
      emergencyFullName: '',
      emergencyEmail: '',
      emergencyPhone: '',
      ticketOption: '',
    },
    errors: {},
    bool: false,
  };

  ticketOptions = [
    {
      name: 'tierOne',
      value: 'Tier 1 - $500 - Villa Lodging (single room) - Lodging Meals - Program - SOLD OUT!!',
      disabled: true,
    },
    {
      name: 'tierTwo',
      value: 'Tier 2 - $300 - Villa Lodging (shared room) - Lodging Meals - Program',
    },
    {
      name: 'tierThree',
      value: 'Tier 3 - $250 - Non Villa Lodging (hotel nearby) - Lodging Meals - Program',
    },
  ];

  schema = {
    _id: Joi.string(),
    firstname: Joi.string().required().label('First Name'),
    lastname: Joi.string().required().label('Last Name'),
    email: Joi.string().email().required().label('Email'),
    phone: Joi.string().required().label('Phone'),
    allergies: Joi.string().label('Allergies').allow(''),
    questions: Joi.string().label('Questions').allow(''),
    discover: Joi.string().label('How you did you hear about Shalom Ministry').allow(''),
    emergencyFullName: Joi.string().required().label('Emergency Full Name'),
    emergencyEmail: Joi.string().email().required().label('Emergency Last Name'),
    emergencyPhone: Joi.string().required().label('Emergency Phone'),
    ticketOption: Joi.string().required().label('Choose Your Ticket'),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      this.setState({ bool: true });
      setTimeout(
        async () => {
          this.setState({ bool: false });
          await CWATregister(data);
          toast.success('Registration submitted!');
        },
        Promise.reject ? 2000 : 1000
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <div className="cwatRegister">
        <div className="content">
          <h1>CONFERENCE WITH A TWIST</h1>

          <form onSubmit={this.handleSubmit}>
            <div className="cwat-title-container">
              <h2 className="cwat-header">YOUR INFO</h2>
              <h2 className="cwat-header">EMERGENCY CONTACT</h2>
            </div>
            <div className="cwat-contact-info cwat-bg-right">
              <div className="cwat-your-info">
                {this.renderCustomInput('firstname', 'First Name')}
                {this.renderCustomInput('lastname', 'Last Name')}
                {this.renderCustomInput('email', 'Email', 'email')}
                {this.renderCustomInput('phone', 'Phone #', 'phone')}
              </div>

              <div className="cwat-emergency-contact">
                {this.renderCustomInput('emergencyFullName', 'Full Name')}
                {this.renderCustomInput('emergencyEmail', 'Email', 'email')}
                {this.renderCustomInput('emergencyPhone', 'Phone #', 'phone')}
              </div>

              <aside className="cwat-background-image cwat-pPlan">
                <img src={CWATpPlan} alt="cwat-pPlan" />
              </aside>
            </div>

            <hr></hr>

            <div className="cwat-questions-container cwat-bg-left">
              <h2 className="cwat-header">A FEW QUESTIONS</h2>
              {this.renderTextarea(
                'allergies',
                'Do you have any food allergies or dietary restrictions?'
              )}
              {this.renderTextarea('questions', 'Do you have any questions for us?')}
              {this.renderTextarea('discover', 'How did you hear about Shalom Ministry?')}

              <div className="ticket-tiers">
                {this.renderDropdown('ticketOption', 'Choose Your Ticket', this.ticketOptions)}
              </div>

              <aside className="cwat-background-image cwat-qrcode">
                <img src={qrCode} alt="" />
              </aside>
            </div>

            {this.renderButton('SUBMIT', this.state.bool, 'send-btn')}
          </form>
        </div>
      </div>
    );
  }
}

export default CWATRegister;
