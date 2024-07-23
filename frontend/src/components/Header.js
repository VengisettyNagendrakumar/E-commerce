import react from "react";
import { Navbar,Nav,Container,Row, NavDropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { userLogout} from "../store/user-slice";
import { userDetailReset } from '../store/user-details';
import SearchBox from "./SearchBox";
export function Header(){
   const userLogin=useSelector(state=>state.userLogin)
   const {userInfo}=userLogin
  const dispatch =useDispatch();
   const logoutHandler=()=>{
    dispatch(userLogout())
    dispatch(userDetailReset()); //after lagout the details must be reset
   }


    return(
        
    <header>
    {/* The variant prop is used to specify the color scheme of the Navbar. React-Bootstrap offers two variants for the navbar:
dark: Applies a dark background and light text.
light: Applies a light background and dark text. */}
<Navbar bg="dark"  variant="dark"expand="lg" collapseOnSelect> {/*collapseonSelect makes navbar more responsive */}
  <Container>
  {/* <Navbar.Brand href="/">Proshop</Navbar.Brand> */}
  <LinkContainer to="/">
  <Navbar.Brand >Proshop</Navbar.Brand>

  </LinkContainer>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <SearchBox />
    <Nav className="ml-auto ml-4">

      <LinkContainer to="/cart">
      <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
      
      
      </LinkContainer>
      {userInfo ?(
        <NavDropdown title={userInfo.name} id='username'>
          <LinkContainer to="/profile">
          <NavDropdown.Item ><i className="fas fa-user"></i>Profile</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={logoutHandler} ><i className="fas fa-sign-out-alt"></i>Logout</NavDropdown.Item>
        </NavDropdown>
      ):<LinkContainer to="/login">
      <Nav.Link ><i className="fas fa-user"></i>Login</Nav.Link>

      </LinkContainer>}
      
  
      {userInfo && userInfo.isAdmin &&(
        <NavDropdown title='Admin' id='adminmenu'>
        <LinkContainer to="/admin/userlist">
        <NavDropdown.Item >Users</NavDropdown.Item>
        </LinkContainer>

        <LinkContainer to="/admin/productlist">
        <NavDropdown.Item >Products</NavDropdown.Item>
        </LinkContainer>

        <LinkContainer to="/admin/orderlist">
        <NavDropdown.Item >Orders</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>
      )}
      
    </Nav>
    
  </Navbar.Collapse>
  </Container>


</Navbar>

            </header>
        
    )
}
export default Header;