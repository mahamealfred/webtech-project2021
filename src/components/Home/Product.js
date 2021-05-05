import './Product.css'
import { Link } from 'react-router-dom'

const Product = () => {
    return (
        <div className="product">
            <img src="../static/images/products/pc1.jpg" alt="product name"/>
            <div className="product__info">
            <p className="info__name">Product 1</p>
                <p className="info__description">
                    this is our product one!
                </p>
                <p className="info__price">$400.99</p>
                <Link to={`/product/${1222}`} className="info__button">View</Link>
            </div>
               
         </div>
      
    )
}

export default Product
