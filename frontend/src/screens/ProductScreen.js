import React,{useState,useEffect} from 'react'
import {Link,useParams,useNavigate} from 'react-router-dom';
import {Row,Col,Image,ListGroup,Button,Card,Form} from 'react-bootstrap';
//import products from '../products'
import Rating from '../components/Rating';
import {useDispatch,useSelector} from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader'
import Message from '../components/Message';
import axios from 'axios';
import { createProductReview } from '../actions/productActions';
import { productReviewCreateReset } from '../store/product_CreateReview';
function ProductScreen({}) {
  const {id}=useParams();
  //const product=products.find((p)=>p._id==id)

  //const [product,setProduct]=useState([]);
//   useEffect(()=>{

// async function fetchProduct() {
//   const response=await axios.get(`/api/products/${id}`) 

//   const data=await response.data; 

//   setProduct(data);

// }
// fetchProduct();
//   },[])

const [qty,setQty] = useState(1);
const [rating,setRating] = useState(0)
const [comment,setComment] = useState('');




const dispatch=useDispatch();


const productDetails=useSelector(state=>state.productDetail)
const {loading,error,product}=productDetails ;


const userLogin=useSelector(state=>state.userLogin)
const {userInfo}=userLogin ;


const productReviewCreate=useSelector(state=>state.productCreateReview)
const {success:successReviewCreate,error:errorReviewCreate,loading:loadingReviewCreate} = productReviewCreate;


 const navigate=useNavigate();

useEffect(()=>{

   if(successReviewCreate){
    setRating(0)
    setComment('')
    dispatch(productReviewCreateReset())
   }

    dispatch(listProductDetails(id))
    },[dispatch,id,successReviewCreate])



    const addToCartHandler=()=>{
      navigate(`/cart/${id}?qty=${qty}`)
      //here id is optional so we added ? but query parameter is still there even if  id not present
    }

    const submitHandler=(e)=>{
      e.preventDefault();
      dispatch(createProductReview(
        id,
        {
          rating: rating,
          comment: comment
        }
      ));
    }
  return (
    <div>
      <Link to='/' className='btn btn-light my-3' style={{ textDecoration: 'none' }}>Go Back</Link>
       {loading?
       <Loader/>
       :error
          ?<Message variant='danger'>{error}</Message>
       :(<div>
        <Row>
        <Col md={6}>
           <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
        {/* Standard ListGroup: By default, a ListGroup component has borders and padding around each list item.
        Flush Variant: When you use variant='flush', it removes the borders and padding between the list group items, making the list items sit flush against each other and the container they are in. This results in a cleaner, more minimalistic look. */}
            <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    price:${product.price}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Description:${product.description}
                  </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                <ListGroup.Item>
                     <Row>
                        <Col>
                        Price:
                        </Col>
                        <Col>
                        <strong>${product.price}</strong>
                        </Col>
                     </Row>
                  </ListGroup.Item>   


                  <ListGroup.Item>
                     <Row>
                        <Col>
                        Status:
                        </Col>
                        <Col>
                             {product.countInStock>0?'In Stock':'Out of Stock'}
                        </Col>
                     </Row>
                  </ListGroup.Item> 


                  {product.countInStock>0 &&(
                       <ListGroup.Item>
                        <Row>
                          <Col>
                          QTY
                          </Col>
                          <Col xs='auto' className='my-1'>
                          <Form.Control as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                            {
                              [...Array(product.countInStock).keys()].map((x)=>(
                                //if count is 3 we aill get [0,1,2] these are keys

                                <option key={x+1} value={x+1}>
                                  {x+1}
                                </option>
                              ))
                            }
                          </Form.Control>
                          </Col>
                        </Row>
                       </ListGroup.Item>   
     
                  )}

                  <ListGroup.Item>
                     <Button className='btn-block'onClick={addToCartHandler} disabled={product.countInStock===0} type='button'>Add to Cart</Button>
                  </ListGroup.Item>   


                </ListGroup>
            </Card>
        </Col>
      </Row>

      <Row className='my-4'>
        <Col md={6}>
        <h4>
          Reviews
        </h4>
        {product.reviews.length===0 && <Message variant='info'>No reviews yet</Message>}
        <ListGroup variant='flush'>
          {product.reviews.map(review=>(
            <ListGroup.Item key={review._id}>
              <strong>{review.name}</strong>
              <Rating value={review.rating} color='#f8e825'/>
              <p>{review.createdAt.substring(0,10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))}

          <ListGroup.Item>
            <h4>Write a Review</h4>
           
            {loadingReviewCreate && <Loader />}
            {errorReviewCreate && <Message variant='danger'>{errorReviewCreate}</Message>}
            {successReviewCreate && <Message variant='success'>Review submitted successfully</Message>}
            {userInfo ? (
              <Form onSubmit={submitHandler}>
                 <Form.Group controlId='rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control as='select' value={rating} onChange={(e)=>setRating(e.target.value)}>
                    <option value=''>Select...</option>
                      <option value='1'>1-Poor</option>
                      <option value='2'>2-Fair</option>
                      <option value='3'>3-Good</option>
                      <option value='4'>4-Very Good</option>
                      <option value='5'>5-Excellent</option>
                    </Form.Control>
 
                 </Form.Group>

                 <Form.Group controlId='comment' className='my-4'>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as='textarea' rows={3} value={comment} onChange={(e)=>setComment(e.target.value)} />
                 </Form.Group>

                 <Button type='submit' variant='primary' disabled={loadingReviewCreate}>Submit</Button>
                

              </Form>
            ) : (
            <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
            )}
          </ListGroup.Item>
        </ListGroup>
        </Col>
      </Row>
      </div>)
      }

      
    </div>
  )
}

export default ProductScreen;
