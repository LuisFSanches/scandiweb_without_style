import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/IProduct";
import { list, deleteMany } from "../../services/product";

import logo from '../../assets/images/logo.png';

export function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>();

  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const getProducts = async () => {
    const response = await list();
    setProducts(response.data);
  }

  const selectProduct = (id: number) => {
    setSelectedProducts([...selectedProducts, id]);
  }

  const deleteProducts = async (ids: number[]) => {
    await deleteMany(ids);
    return getProducts();
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <main>
      <header>
        <div>
          <img src={logo} alt="" />
          <h1>Product List</h1>
        </div>
        <div>
          <button id="add" style={{ color: 'black' }} onClick={()=> { navigate("/addproduct") } }>ADD</button>
          <button id="delete-product-btn" style={{ color: 'black' }} onClick={() => deleteProducts(selectedProducts)}>MASS DELETE</button>
        </div>
      </header>

      <div className="product-container">
        {products && products?.map((product) => (
          <ProductCard data={product} selectProduct={selectProduct} key={product.id}/>
        ))}
      </div>
      <Footer />
    </main>
  )
}