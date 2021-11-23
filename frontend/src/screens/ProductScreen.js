import React, {useState, useEffect} from 'react'
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import { Link, useParams} from 'react-router-dom'
import Rating from '../components/Rating'
import axios from 'axios'
const ProductScreen = () => {

    const [product, setProduct] = useState([])
    let { slug } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            const {data} = await axios.get(`/api/product/${slug}`)
            setProduct(data)
        }
        fetchProduct();
    }, [])
   
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name}></Image>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating
                            value={product.rating}
                            text={`${product.numReviews} reviews`}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price:${product.price}
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
                                        Price
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
                                        <strong>${product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                   <Button className='btn-block' 
                                   type='button'
                                   disabled={product.countInStock === 0}
                                   >
                                        Add To Cart
                                   </Button>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen
