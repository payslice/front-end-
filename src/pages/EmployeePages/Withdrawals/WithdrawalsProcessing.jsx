import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "../../../components/Button/Button";


const WithdrawalsProcessing = () => {
  return (
    <>
     
     <div className="w-full mt-10 flex justify-center withdraww" style={{color: 'rgba(17, 17, 17, 0.6)'}}>
      <div className="relative">
        <Link to="/user/dashboard">
        <div className="absolute right-36 flex" style={{ width: '90px'}}>
          <svg className="mt-12" style={{marginTop: '5px'}} width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.99182 10.5734L3.16183 6.2472L7.47744 1.40778L5.99065 0.0790062L0.336276 6.40578L6.66305 12.0602L7.99182 10.5734Z" fill="#737A91"/>
          </svg>
          <span className="font-normal text-base pl-5" style={{}} >
            Go back
          </span>
        </div>
        </Link>
      </div>

      <div>
      <Link to="/user/dashboard">
        <div className="lg:hidden flex mb-12">
          <svg className="mt-12" style={{marginTop: '5px'}} width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.99182 10.5734L3.16183 6.2472L7.47744 1.40778L5.99065 0.0790062L0.336276 6.40578L6.66305 12.0602L7.99182 10.5734Z" fill="#737A91"/>
          </svg>
          <span className="font-normal text-base pl-5" style={{}} >
            Go back
          </span>
        </div>
        
      </Link>

            <div className='mb-10'>
                <h3 className='font-bold text-lg'>Your funds are currently being processed </h3>
                <p className='text-xs'> Funds usually take  between 24-48 hours to arrive your  account </p>
            </div>

            <img className='ml-16' src={require('../../../assets/imgs/Vector.jpg')} 
            alt=""
            width="130"
            />

            <Button
            buttonText="Contact Support"
            fullwidth
            type="submit"
            className="py-4 mt-10 mr-5"
            
            />
     </div>
    </div>
        
    </>
  )
}

export default WithdrawalsProcessing
