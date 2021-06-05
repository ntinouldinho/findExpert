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
    

    function filterStatus(status,id){
        if(props.data.role!=="user"){
            if(!status){
                let OnClick = "approveAppointment("+id+")";
                return (
                    <button type="button" onClick={() => { props.approve(id)}}> Approve </button>
                )
            }else{
                return (
                    "approved"
                )
            }
        }else{
            return status?"confirmed":"pending";
        }
    }

    return (
        <div className="userDiv">
           <table>
                <thead>
                    <tr>
                        <th>
                            {props.data.role=="user"?"expert":"client"}
                        </th>

                        <th>
                            service
                        </th>

                        <th>
                            status
                        </th>

                        <th>
                            link
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {props.data.appointments.map((row) => (
                        <tr>
                            <td>
                                {props.data.role=="user"?row.expert_name:row.customer_name}
                            </td>

                            <td>
                                idk
                            </td>

                            <td>
                                {filterStatus(row.status,row.appointment_id)}
                            </td>

                            <td>
                                <a href={"/room/"+row.appointment_id}> Click Here </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
               
           </table>
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
            return <Appointments data={props.data} approve={props.approve}/>;
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
            email:"",
            appointments:[],
            role:"",
            name:""
        };
        this.handleClick = this.handleClick.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
    }

    async componentWillMount() {

        // const response = await fetch(`/api/decode`);
        // const json = await response.json();
        // const user = json.user;


        fetch('/api/decode')
        .then(response => response.json())
        .then(data => {
            this.setState({email:data.email})
            fetch('/api/user/get?appointments=1&user='+data.user)
            .then(res => res.json())
            .then(person => { 
               this.setState({
                   email:person.email,
                   role:person.role,
                   name:person.name,
                   appointments:person.appointments
               })
            })
              .catch(err => {
                console.error(err);
                alert('Error logging in please try again');
              });
        });

       
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
    
    approveAppointment(id){
        fetch('/api/appointment/approve', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                id:id
              }),
          })
          .then(res => {
              if (res.status === 200) {
                window.location.href = "/user"
              } else {
                const error = new Error(res.error);
                throw error;
              }
            })
            .catch(err => {
              console.error(err);
              alert('Error logging in please try again');
            });
    }
      
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
                                data = {this.state}
                                approve = {this.approveAppointment}
                            />
                            

                        </Fragment>
                    }
                </div>
            </div>

        )
    }
  }