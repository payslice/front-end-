import React, { useState } from "react";
import { Button } from "../../../components/Button/Button";
import { GreyButton } from "../../../components/Button/GreyButton";


export const Wallets = () => {
        return (
          <>

          <p className="text-[23px] font-bold">Wallet</p>

            <div className="flex w-full mt-5 justify-evenly handle_user_homepage_responsive">
              <div
                className="bg-blue-600 px-12 ml-5 py-6 rounded-xl border-solid border-2 border-grey-600 w-full 
                lg:w-1/3 handle_user_homepage_responsive_in2 bg-[#0000]">

                <div className="my-auto w-4/6">
                  <div className="text-semibold pb-1 text-[20px]">
                    Payslice Wallet
                  </div>
                  <h3 className="text-[26px] mb-0 font-bold">NGN 140,000</h3>
                  <div className="text-[#000]/[0.8] text-[13px]">
                    <span className="block text-[15px] font-medium">
                      Virtual Account
                    </span>
                    <span className="block">Acc. No : 7505519950 </span>
                    <span className="block">Acc. Name : payslice </span>
                    <span className="block">Bank : Providus Bank  </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600 flex px-12 ml-5 py-6 justify-evenly rounded-xl w-full lg:w-1/3 h-full handle_user_homepage_responsive_in2 bg-[#F4F5F7]">
										<div className="w-4/6">
											<div className="block text-[15px] font-medium">Time Period </div>
                        <span className="mt-2 block text-[13px]">From</span>
                        <span className="mt-3 block text-[15px] font-medium">2021-08-09</span>
										</div>

                    <div class="h-[50px] w-0.5 bg-gradient-to-tr 
                     from-transparent via-neutral-500 to-transparent align-center opacity-20 dark:opacity-100"></div>

											<div className="mt-7 ">
                        <span className="block text-[13px]">To</span>
                        <span className="mt-4 block text-[15px] font-medium">2021-08-09</span>
												
											</div>
								
									</div>

            </div>

            <div className="flex justify-evenly handle_user_homepage_responsive">
              <div className="ml-5">
                <div className="mt-5">
                  <Button buttonText="Download Statement" />
                </div>

                <div className="">
                  <GreyButton buttonText="Transfer Statement Others" />
                </div>

                <div className="flex justify-evenly handle_user_homepage_responsive mt-5">
              <div
                className="bg-blue-600 px-6 mr-5 py-6 rounded-xl border-solid border-2 border-grey-600 w-full 
                lg:w-1/3 handle_user_homepage_responsive_in2 bg-[#0000]">
                  <div className="my-auto w-4/6">

                        <img className='ml-1' src={require('../../../assets/imgs/Web.jpg')} 
                        alt=""
                        width="60"/>
                      Airtime
                  </div>
              </div>

              <div
                className="bg-blue-600 px-6 ml-5 py-6 rounded-xl border-solid border-2 border-grey-600 w-full 
                lg:w-1/3 handle_user_homepage_responsive_in2 bg-[#0000]">
                  <div className="my-auto w-4/6">
                    <img className='' src={require('../../../assets/imgs/Video.jpg')} 
                        alt=""
                        width="60"/>
                    Cable
                  </div>
              </div>

              <div
                className="bg-blue-600 px-6 ml-5 py-6 rounded-xl border-solid border-2 border-grey-600 w-full 
                lg:w-1/3 handle_user_homepage_responsive_in2 bg-[#0000]">
                  <div className="my-auto w-4/6">
                    <img className='' src={require('../../../assets/imgs/Video.jpg')} 
                        alt=""
                        width="60"/>
                    Cable
                  </div>
              </div>
            </div>
              </div>

              <div
                className="bg-blue-600 px-4 mb-5 py-6 rounded-xl w-full border-solid border-2 border-grey-600
                 lg:w-1/3 handle_user_homepage_responsive_in2 bg-[#0000]">

                      <div className="grid grid-cols-1 divide-y">
                        <div className="text-[16px] font-bold text-blue-600">Wallet History </div>
                        <span className="text-[14px] font-medium">₦30,000 has been withdrawn from wallet </span>
                      </div>
                        
                        <span className="text-[11px]">wed,24 may by you</span>

                      <div className="mt-4">
                      <span className="text-[14px] font-medium">₦12,000 has been Repaid from your debit card </span>
                      <span className="text-[11px]">wed,24 may by <thread className="text-blue-600">Payslice</thread></span>
                      </div>

                      <div className="mt-4">
                      <span className="text-[14px] font-medium">₦12,000 has been Repaid from your debit card </span>
                      <span className="text-[11px]">wed,24 may by <thread className="text-blue-600">Payslice</thread></span>
                      </div>

                      <div className="mt-4">
                      <span className="text-[14px] font-medium">₦12,000 has been Repaid from your debit card </span>
                      <span className="text-[11px]">wed,24 may by <thread className="text-blue-600">Payslice</thread></span>
                      </div>
                      
                      <div className="mt-4">
                      <span className="text-[14px] font-medium">₦12,000 has been Repaid from your debit card </span>
                      <span className="text-[11px]">wed,24 may by <thread className="text-blue-600">Payslice</thread></span>
                      </div>
              </div>
            </div>

          </>
        );
}