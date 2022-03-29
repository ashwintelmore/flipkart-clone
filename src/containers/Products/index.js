
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import Layout from '../../components/Layouts'
import { addProduct, allCategoryData, createCategoryItem } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/UI/Input'
import NewModel from '../../components/UI/Model'
import './style.css'
/**
* @author
* @function ProductPage
**/

const ProductPage = (props) => {
    const [show, setShow] = useState(false);
    const [showDetailsProduct, setShowDetailsProduct] = useState(false);
    const [DetailsProduct, setDetailsProduct] = useState(null);
    const [categoryParentId, setCategoryParentId] = useState('');

    const [Name, setName] = useState('');
    const [quantity, setQuantity] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryID] = useState('')
    const [price, setPrice] = useState('')
    const [productPicture, setProductPicture] = useState([]);


    const dispatch = useDispatch();
    const handleShow = () => setShow(true);
    const category = useSelector(state => state.category)
    const product = useSelector(state => state.product)

    const handleClose = () => {

        const form = new FormData();

        form.append('name', Name);
        form.append('quantity', quantity);
        form.append('description', description);
        form.append('category', categoryId);
        form.append('price', price);

        for (const pic of productPicture) {
            form.append('productPicture', pic);
        }
        dispatch(addProduct(form));
        setShow(false);
    }


    const createCategoryList = (categories, options = []) => {

        // let ;
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name
            })
            if (category.SubCategory.length > 0) {
                createCategoryList(category.SubCategory, options)
            }
        }
        return options;
    }

    const handleProductsImage = (e) => {
        setProductPicture([
            ...productPicture,
            e.target.files[0]
        ])
    }
    // //console.log.log(productPicture);

    const handleShowDetailsProduct = (product) =>{
        setShowDetailsProduct(true);
        setDetailsProduct(product);
        //console.log.log(product);
    }

    const handleCloseDetailsProduct = () =>{
        setShowDetailsProduct(false);
    }

    const renderProductDetailsModel =()=>{
// *****************IMP************
        if(!DetailsProduct){
            return null
        }
// ******************IMP************
        return (
            <NewModel
             size="lg"
             show={showDetailsProduct}
             handleClose={handleCloseDetailsProduct}
             ModelTitle = "Details of Product"
            >
            <Row>
                <Col md='6'>
                    <label className="key">Name</label>
                    <p className="value"> {DetailsProduct.name}</p>
                </Col>
                <Col md='6'>
                    <label className="key">Price</label>
                    <p className="value"> {DetailsProduct.price}</p>
                </Col>
            </Row>
            <Row>
                <Col md='6'>
                    <label className="key">Quantity</label>
                    <p className="value"> {DetailsProduct.quantity}</p>
                </Col>
                <Col md='6'>
                    <label className="key">Category</label>
                    <p className="value">{DetailsProduct.category.name}</p>
                </Col>
            </Row>
            <Row>
                <Col md='12'>
                    <label className="key">Description</label>
                    <p className="value"> {DetailsProduct.description}</p>
                </Col>
            </Row>
            <Row>
                <Col >
                        <label className="key">Product Images</label>
                    <div style={{display:'flex'}}>
                        {DetailsProduct.productPictures.map(image => 
                        <div className='productImgContainer'> 
                            <img src={image.img} />
                        </div>
                       )}
                    </div>
                </Col>
            </Row>
            </NewModel>
        )
    }

    const renderProductTable = () => {
       return( 
       <Table responsive="sm" style={{fontSize:'12px'}}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>category</th>
                </tr>
            </thead>
            <tbody>
                {
                   product.products.length > 0 ? 
                   product.products.map(product=>
                    <tr onClick={() => handleShowDetailsProduct(product)} key= {product._id} >
                        <td>1</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        {/* <td>.</td> */}
                        {/* {//console.log.log()} */}
                        <td>{product.category.name}</td>
                     </tr>) : null
                }
               
            </tbody>
        </Table>
       )
    }
// //console.log.log(product);
    const renderProductModel = () =>{
        return (
            <NewModel
            ModelTitle="Add New Product"
            handleClose={handleClose}
            show={show}
            // handleShow={handleShow}
        >
            <Input
                lebel={Name}
                placeholder="Product Name"
                value={Name}
                onChange={(e) => { setName(e.target.value) }}
            />
            <Input
                placeholder="Price"
                value={price}
                onChange={(e) => { setPrice(e.target.value) }}
            />
            <Input
                placeholder="Description"
                value={description}
                onChange={(e) => { setDescription(e.target.value) }}
            />
            <Input
                placeholder="quantity"
                value={quantity}
                onChange={(e) => { setQuantity(e.target.value) }}
            />
            <select
                className="form-control"
                value={categoryId}
                onChange={(e) => { setCategoryID(e.target.value) }}
            >
                <option >select category</option>
                {
                    createCategoryList(category.categoryList).map(option =>
                        <option key={option.value} value={option.value}>{option.name}</option>
                    )
                }
            </select>
            {productPicture.length > 0 ? productPicture.map(pic => <div>{pic.name}</div>) : null}

            <input type="file" name="productPictures" onChange={handleProductsImage} />

        </NewModel>
        )
    }

   


    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Products</h3>
                            <button onClick={handleShow}>ADD</button>
                        </div>
                    </Col>
                    <Col md={12}>
                        {renderProductTable()}
                    </Col>
                </Row>

               {renderProductModel()}

              {renderProductDetailsModel()}
            </Container>
        </Layout>
    )

}

export default ProductPage