import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Footer from "../../components/Footer";
import logo from '../../assets/images/logo.png';
import product_logo from '../../assets/images/product_logo.png';
import warehouse from '../../assets/images/warehouse.jpg';
import { PRODUCT_CONSTANTS } from '../../constants/product';
import { useState } from "react";
import { IProduct } from "../../interfaces/IProduct";
import { create } from "../../services/product";

export function NewProduct() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('');

  const generalProducts = PRODUCT_CONSTANTS.filter(product => product.type === 'All');
  const productsByType = PRODUCT_CONSTANTS.filter(product => product.type === selectedType);

  const { register, handleSubmit, setError, clearErrors, reset, formState: { errors } } = useForm<any>();

  const selectType = (type: string) => {
    if (type !== '' || type !== null) clearErrors("type");
    setSelectedType(type);
  }

  const handleNewProduct = async (data: IProduct) => {
    const { name, price, sku, size, weight, height, width, length } = data;
    if (selectedType === '' || selectedType === null) {
      return setError("type", {
        type: "custom",
        message: "Please select a type"
      });
    }
    await create({ name, price, sku, type: selectedType, size, weight, height, width, length });
    navigate('/');
  }

  return(
    <main>
      <header>
        <div>
          <img src={logo} alt="" />
          <h1>Product Add</h1>
        </div>
        
        <div>
          <button style={{ color: 'red' }} onClick={() => {navigate('/')}} id="cancel">Cancel</button>
        </div>
      </header>

      <div>
        <form onSubmit={handleSubmit(handleNewProduct)} id="product_form">
          <div>
            <h1>New Product</h1>
            <img src={product_logo} alt="" />
          </div>
          
          {generalProducts.map(({ label, id, inputType }) => (
            <div key={id}>
              <label htmlFor="">{label}:</label>
              <input 
                type={`${inputType}`} 
                id={`${id}`}
                step="any"
                {...register(`${id}`, {
                  required: `${id} is required`
                  }
                )}
              />
              <p className="error-message">{ errors[`${id}`]?.message as any }</p>
            </div>
          ))}

          <div>
            <label htmlFor="">Type Switcher:</label>
            <select 
              id="productType" 
              onChange={(e) => selectType(e.target.value)}
            >
              <option value="">Type Switcher</option>
              <option value="DVD">DVD</option>
              <option value="Furniture">Furniture</option>
              <option value="Book">Book</option>
            </select>
            <p className="error-message">{ errors.type?.message as any }</p>
          </div>

          {productsByType.map(({ label, id, inputType })=> (
            <div key={id}>
              <label htmlFor="">{label}:</label>
              <input 
                type={`${inputType}`} 
                id={`${id}`}
                step="any"
                {...register(`${id}`, {
                  required: `${id} is required`
                  }
                )}
              />
              <p className="error-message">{ errors[`${id}`]?.message as any }</p>
            </div>
          ))}

          <button>Save</button>
        </form>

      </div>

      <Footer />
    </main>
  )
}