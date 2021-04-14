import React, { Component, Fragment } from 'react';
import CreditCard from '../components/CreditCard';
import '../CSS/User.css';
import Button from 'react-bootstrap/Button';
import { Header } from "../components/Header";

const Overview = (props) => {
    
    return (
        <div>
            <br/>
            <form>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" defaultValue={props.name} />
                <br/><br/>

                <label htmlFor="surname">Surname:</label> 
                <input type="text" name="surname" defaultValue={props.name} />
                <br/><br/>

                <label htmlFor="email">Email:</label> 
                <input type="email" name="email" defaultValue={props.name} disabled/>
                <br/><br/>

                
                <Button variant="primary" onClick={props.resetPassword}>Reset Password</Button>

                <Button variant="success" type="submit">Update</Button>
            </form>
                
        </div>
        
    );

};

const Appointments = (props) => {
  
    return (
        <div>
            <input type="text" defaultValue={props.name} />
        </div>
    );

};

const Billing = (props) => {
  
    return (
        <div>
            <CreditCard />
        </div>
       
    );

}

const History = (props) => {
  
    return (
       <input type="text" defaultValue={props.name} />
    );

}



const Handler = (props) => {
    switch(props.id) {
        case 0:
            return <Overview name={props.name} resetPassword={props.resetPassword}/>;
        case 1:
            return <Appointments name={props.name}/>;
        case 2:
            return <Billing name={props.name}/>;
        case 3:
            return <History name={props.name}/>;
        default:
            return <Appointments name={props.name}/>;
    }
};
  

export class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0,
            data: [
              { id: 0, name: "Overview"},
              { id: 1, name: "Appointments"},
              { id: 2, name: "Billing"},
              { id: 3, name: "History"}
            ],
            email:"tinoathome@windowslive.com"
        };
        this.handleClick = this.handleClick.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
    }

    resetPassword = async e => {
        e.preventDefault();

        await fetch('/api/reset', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email: this.state.email
            }),
        });
        
        //const body = await response.text();
    
    };
      
      
    handleClick(currentTab) {
      this.setState({ currentTab });
    }
      
    render() {
        return (
    
            <div>
                <Header />
                <div className="tab">
                    {this.state.data.map((button, i) => (
                        <button key={button.name} className="tablinks" onClick={() => this.handleClick(i)}>{button.name}</button>
                     )
                    )
                    }
                </div>
            
                <div className="tabcontent">
                    {this.state.currentTab !== -1 &&
                        <Fragment>
                            <h3>{this.state.data[this.state.currentTab].name}</h3>

                            <Handler 
                                id={this.state.currentTab} 
                                name={this.state.data[this.state.currentTab].name} 
                                resetPassword={this.resetPassword}
                            />
                            

                        </Fragment>
                    }
                </div>
            </div>

        )
    }
  }