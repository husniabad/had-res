import React,{Component} from 'react';
import { Jumbotron, Navbar, Nav, NavbarToggler, Collapse, NavbarBrand, NavItem ,
        Button ,Modal, ModalHeader, ModalBody, Label,Row,Col} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import {LocalForm,Errors,Control} from 'react-redux-form';

const required = (val) => val && val.length;
const userNameSpace =(val) => !(val) || !/\s/.test(val);
const useCap = (val) => !(val) || !/[A-Z]/.test(val);

class Header extends Component {

    constructor(props) {
        super(props);
        this.toggleNav = this.toggleNav.bind(this);
        this.toggaleModal = this.toggaleModal.bind(this);   
        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggaleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(values) {
        
        alert("Submitted: " + JSON.stringify(values) );
    }
  
    render() {
        return(
            <React.Fragment>
                <Navbar dark expand="md" >
                    <div className="container text-white ">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto " href="/"> 
                            <img src="assets/images/logo.png" height="30" width="41" 
                            alt="Ristorante Con Fusion" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link " to="/home">
                                        <span className="fa fa-home fa-lg"></span> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus">
                                        <span className="fa fa-info fa-lg"></span> About Us
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/menu">
                                        <span className="fa fa-list fa-lg"></span> Menu
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus">
                                        <span className="fa fa-address-card fa-lg"></span> Contact Us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline onClick={this.toggaleModal}>
                                        <span className='fa fa-sign-in fa-lg'></span> Login
                                    </Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className='container'>
                        <div className='row row-header'>
                            <div className='col-12 col-sm-6'>
                                <h1>Ristorante Con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggaleModal}>
                    <ModalHeader toggle={this.toggaleModal}>Login</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleLogin}>
                            <Row className="form-group">
                                <Label htmlFor="username" md={2}> Username</Label>
                                <Col md={8}>
                                    <Control.text model=".username" id="username" name="usesrname" placeholder="Enter Username"
                                    className='form-control'
                                    validators={{
                                        required,userNameSpace
                                        ,useCap
                                    }}
                                     />
                                     <Errors 
                                     className="text-danger"
                                     model=".username"
                                     show="touched"
                                     messages={{
                                         required:" Enter username",
                                         userNameSpace: "dont use space ",
                                         useCap:" Dont use Caps"
                                        }
                                     }
                                     />

                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="password" md={2}> Password</Label>
                                <Col md={8}>
                                    <Control.password model=".password" id="password" name="password" placeholder="Enter Password"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                     />
                                     <Errors 
                                     className="text-danger"
                                     model=".password"
                                     show="touched"
                                     messages={{
                                         required:" Enter password"
                                        }
                                     }
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label check>
                                    <Control.checkbox model=".checkbox" name="remember"
                                     />
                                    Remember
                                </Label>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" value="submit" color="primary">
                                        Login
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
            
        );
    }
}

export default Header;