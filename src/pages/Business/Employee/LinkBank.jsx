import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "../../../components/Button/Button";

const LinkBank = () => {
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

            <div className='mb-5'>
                <h3 className='font-bold text-lg'>Link Account Details With MONO  </h3>
                <p className='text-sm mt-5'> Please Connect Your Account To Mono For Account <br /> 
                 Statemtent And Direct Debit </p>
            </div>

            <Button
            buttonText="Connect Bank "
            type="submit"
            className=""
            />

            <img className='mt-12' src={require('../../../assets/imgs/Momo.jpg')} 
            alt=""
            width=""
            />
     </div>
    </div>
    </>
  )
}

export default LinkBank
