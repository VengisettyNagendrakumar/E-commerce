import React,{useState,useEffect} from 'react'
// import products from '../products';
import {Row,Col} from 'react-bootstrap'
import Product from '../components/Product';
import { useDispatch,useSelector } from 'react-redux';
import  axios from 'axios';
import Loader from '../components/Loader'
import Message from '../components/Message';
import {listProducts} from '../actions/productActions'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousel';
function HomeScreen() {
  //const [products,setProducts]=useState([]);
//   useEffect(()=>{

// async function fetchProducts() {
//   // const response=await axios.get('http://127.0.0.1:8000/api/products/') 
//   const response=await axios.get('/api/products/') //in package .json we added proxy url chcek by default port is 3000 we changed to 8000 to work for django

//   const data=await response.data; //data is present in axios when result is stored in response when we nned to access result we should give response.data or simple we ca destructure   const {data}=await axios.get('http://127.0.0.1:8000/api/products/')

//   setProducts(data);

// }
// fetchProducts();

//   },[])
const dispatch=useDispatch();
const productList=useSelector(state=>state.product)
const {loading,error,products}=productList

const navigate=useNavigate()
const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const keyword = queryParams.get('keyword') || '';
useEffect(()=>{
      dispatch(listProducts(keyword));
 
    },[dispatch,keyword])
  return (
    <div>
      {!keyword && <ProductCarousel/>}
      
      <h1>Latest Products</h1>
      {loading ?<Loader/>
        :error ? <Message variant='danger'>{error}</Message>
          :
          <div>

          <Row>
            {products.map((product)=>(
                <Col key={product._id}sm={12} md={6} lg={4} xl={3}>
                  {/*based on scrren we are making responsive i.e for small screen we will get 12 col */}
                <Product product={product}/>
                </Col>
            ))}
          </Row>
          </div>
          }
      {/* <Row>
        {products.map((product)=>(
            <Col key={product._id}sm={12} md={6} lg={4} xl={3}> */}
               {/*based on scrren we are making responsive i.e for small screen we will get 12 col */}
            {/* <Product product={product}/>
            </Col>
        ))}
      </Row> */}

    </div>
  )
}

export default HomeScreen
