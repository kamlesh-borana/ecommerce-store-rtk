import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { fetchProducts, STATUSES } from "../store/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  //   const [products, setProducts] = useState([]);
  const { data: products, status } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchProducts());
    // const fetchProducts = async () => {
    //   const res = await fetch("https://fakestoreapi.com/products");
    //   const data = await res.json();
    //   setProducts(data);
    // };
    // fetchProducts();
    // eslint-disable-next-line
  }, []);
  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }
  if (status === STATUSES.ERROR) {
    return <h2>Something Went Wrong!</h2>;
  }
  return (
    <div className="productsWrapper">
      {products.map((product) => (
        <div className="card" key={product.id}>
          <img src={product.image} alt="" />
          <h4>{product.title}</h4>
          <h5>{product.price}</h5>
          <button
            className="btn"
            onClick={() => {
              dispatch(add(product));
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
