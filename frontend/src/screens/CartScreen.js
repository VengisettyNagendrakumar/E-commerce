import React, { useEffect } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { useParams,useLocation } from 'react-router-dom'
import {Row,Col,ListGroup,Image,Button,Card,Form} from 'react-bootstrap'
import {addToCart, removeFromCart} from '../actions/cartActions'
import Message from '../components/Message';

function CartScreen() {
  const {id}=useParams();
  const location=useLocation(); //to get the query parameter we  will use useLocation
  const searchParams = new URLSearchParams(location.search);
  const qty = searchParams.get('qty');
  const dispatch=useDispatch();
  const cart=useSelector(state=>state.cart);
  const {cartItems}=cart;
  useEffect(()=>{
    if(id){
      dispatch(addToCart(id,qty))
    }
  },[dispatch,id,qty])
  const removeFromCartHandler=(id)=>{
    dispatch(removeFromCart(id))
  }
  const navigate = useNavigate();

  const checkoutHandler=()=>{
    navigate('/login?redirect=/shipping') //redirec=shipping is Query Parameter here saying if logged in go to shipping page
    //The query string redirect=shipping is often used to specify that, after a successful login, the user should be redirected to the /shipping page. This is useful in scenarios where users need to be authenticated before they can proceed to certain pages (in this case, the shipping page).
  }

  return (
    <Row>
    <Col md={8}>
    <h1>Shopping cart</h1>
    {cartItems.length===0?(
      <Message variant='info'>
        Your cart is empty <Link to="/">Go Back</Link>
      </Message>
    ):(
      <ListGroup variant='flush'>
         {cartItems.map(item=>(
          <ListGroup.Item key={item.product}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={3}>
                  <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}>{item.name}</Link>
                </Col>
                <Col md={2}>
                  ${item.price}
                </Col>
                <Col md={3}>
                <Form.Control as='select' value={item.qty} onChange={(e)=>dispatch(addToCart(item.product, Number(e.target.value)))}>
                            {
                              [...Array(item.countInStock).keys()].map((x)=>(

                                <option key={x+1} value={x+1}>
                                  {x+1}
                                </option>
                              ))
                            }
                          </Form.Control> 

                </Col>
                <Col md={1}>
                  <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item.product)}>
                    <i className='fas fa-trash'></i>
                  </Button>
                </Col>
                
              </Row>
          </ListGroup.Item>
         ))}
      </ListGroup>
    )}
    </Col>

    <Col md={4}>
         <Card>
          <ListGroup variant='flush'>
          <ListGroup.Item>
  <h2>Subtotal ({cartItems.reduce((acc,item)=>acc+parseInt(item.qty),0)}) items</h2>
  <h4>${cartItems.reduce((acc,item)=>acc+parseInt(item.qty)*item.price,0).toFixed()}</h4>
</ListGroup.Item>


              <ListGroup.Item>
                <Button type='button' 
                className='btn-block' 
                disabled={cartItems.length===0}
                onClick={checkoutHandler}>
                  Proceed to checkout
                </Button>
              </ListGroup.Item>
          </ListGroup>
          </Card>         
    </Col>
    
    </Row>
  )
}

export default CartScreen;
