import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { useSelector, useDispatch } from 'react-redux'
import { ProductList } from '../../actions'
import "./styles.css"

/**
* @author
* @function ProductListBySlug
**/
const ProductListBySlug = (props) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const getProductPriceRange = {
      under5k : "5000",
      under10k : "10000",
      under15k : "15000",
      under20k : "20000",
      under30k : "30000",
    }
    useEffect(() => {
        const { match } = props;
        console.log(match.params.slug);
        dispatch(ProductList(match.params.slug));
    }, [])

    
  return(
      <Layout>
       {
        Object.keys(product.productsByPrice).map((key , index)=>{
          console.log(key + " " + index);
          return (
            <div className="card">
              <div className="cardHeader">
                  <div style={{textTransform:"capitalize"}}>{props.match.params.slug} product under {getProductPriceRange[key]}</div>
                  <button>View All</button>
              </div>
              <div style={{display:"flex"}}>
                {
                  // ******************NOTE******************
                  product.productsByPrice[key].map(product => (
                   // ******************NOTE******************
                  <div className="productContainer">
                      <div className='productImgContainer'>
                        <img src={product.productPictures[0].img} alt=''/>
                      </div>
                      <div className="productInfo">
                        <div>{product.name}</div>
                        <div>
                          <span>4.2</span>
                          <span>(3234)</span>
                        </div>
                        <div className="productPrice">{product.price}</div>
                      </div>
                  </div>
                  ))
                }
              </div>
            </div>
          );
        })
        }
      </Layout>
   )

 }

export default ProductListBySlug