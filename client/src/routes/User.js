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
                <input type="text" name="name" defaultValue={props.name} disabled/>
                <br/><br/>

                <label htmlFor="email">Email:</label> 
                <input type="email" name="email" defaultValue={props.email} disabled/>
                <br/><br/>

                
                <Button variant="primary" onClick={props.resetPassword}>Reset Password</Button>

            </form>
                
        </div>
        
    );

};

const Appointments = (props) => {
    

    function filterStatus(status,id){
        if(props.data.role!=="user"){
            if(status===0){
                return (
                    <div>
                        <button type="button" onClick={() => { props.approve(id,1)}}> Approve </button>
                        <button type="button" onClick={() => { props.approve(id,2)}}> Deny </button>
                    </div>
                )
            }else if(status===1){
                    return ("approved")
            }else if(status===2){
                    return ("denied")
            }
            
        }else{
            if(status===0){
                return "pending"
            }else if(status===1){
                return "approved"
            }else if(status===2){
                return "denied"
            }
        }
    }

    return (
        <div className="userDiv">
           <table>
                <thead>
                    <tr>
                        <th>
                            Date
                        </th>

                        <th>
                            {props.data.role=="user"?"Expert":"Client"}
                        </th>

                        <th>
                            Service
                        </th>

                        <th>
                            Price
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Link
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {props.data.appointments.map((row) => (
                        <tr>
                            <td>
                                {row.day+"/"+row.hour}
                            </td>

                            <td>
                                {props.data.role=="user"?row.expert_name:row.customer_name}
                            </td>

                            <td>
                                {row.service}
                            </td>

                            <td>
                                {row.price+"€"}
                            </td>

                            <td>
                                {filterStatus(row.status,row.appointment_id)}
                            </td>

                            <td>
                                <a href={"/room/"+row.appointment_id} style={{display:row.status==1? '':'none'}}> Click Here </a>
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

// const History = (props) => {
  
//     return (
//        <input type="text" defaultValue={props.name} />
//     );

// }



const Handler = (props) => {
    switch(props.id) {
        case 0:
            return <Overview name={props.user} email={props.email} resetPassword={props.resetPassword}/>;
        case 1:
            return <Appointments data={props.data} approve={props.approve}/>;
        case 2:
            return <Billing name={props.name}/>;
        // case 3:
        //     return <History name={props.name}/>;
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
              { id: 2, name: "Billing"}
            //   { id: 3, name: "History"}
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
    
    approveAppointment(id, status){
        fetch('/api/appointment/approve', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                id:id,
                status: status
              }),
          })
          .then(res => {
              if (res.status === 200) {
                window.location.href = "/settings"
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
                                user = {this.state.name}
                                email = {this.state.email}
                            />
                            

                        </Fragment>
                    }
                </div>
            </div>

        )
    }
  }