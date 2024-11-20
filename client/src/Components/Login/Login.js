import React from 'react';
import '../../Components/Login/Login.css';
import { useNavigate } from 'react-router-dom';
import Navbarr from '../Navbarr/Navbarr';
import images from '../../Components/Logo/nec.avif'


 
const Login = () => {
  const navigate= useNavigate()

  const handleClick=  () => {
    navigate('/home')

   }
 
  return (
    <>
    
      <div className='ggg'>
      <Navbarr />
      
          <img src={images} alt='jewellery' className='img' onClick={handleClick} />    
          
          <div className='sty' onClick={handleClick}>
            <div className='genie' onClick={handleClick}>
              Sign in to Manohar Jewellery  
            </div>
            <div className='log'>
            <h3 >Login </h3> </div> 

          
            
          </div>
      
          
       

       
      </div>
    </>
  );
};
 
export default Login;