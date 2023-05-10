/* eslint-disable no-unused-vars */
import React, { useState, useEffect,useContext, useMemo, useCallback } from 'react';
import { BiCalendarEvent } from 'react-icons/bi';
// import { Table } from 'antd';
import { CustomTag } from '../../../components/CustomTag';
import OptionsMenu from '../../../components/TableOptionMenu';
import { getTotalTransactions, getWithdrawalRequest } from '../../../utils/ApiRequests';
import { toast } from 'react-toastify';
import { truncateString, toCurrency } from '../../../utils/helpers';
import { useHistory } from 'react-router-dom'
import { Styles } from "../../../components/Styles";
import { useTable, usePagination, useRowSelect, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from 'react-icons/io'
import {AiOutlineUpload}  from 'react-icons/ai'
import {BsPlusLg}  from 'react-icons/bs'
import {GiPencil}  from 'react-icons/gi'
import {RiDeleteBinLine}  from 'react-icons/ri'
import {UpdateEmployeeContext} from '../../../routes/BusinessRoutes'
import { AiOutlineSearch, AiOutlineDown, AiOutlinePlus } from "react-icons/ai";
import { DotLoader } from "../../../components/Loaders/DotLoader";
import MiniLoader from "../../../components/Loaders/MiniLoader";



const IndeterminateCheckbox = React.forwardRef(
	({ indeterminate, ...rest }, ref) => {
	  const defaultRef = React.useRef()
	  const resolvedRef = ref || defaultRef
      
	  React.useEffect(() => {
	    resolvedRef.current.indeterminate = indeterminate
	  }, [resolvedRef, indeterminate])
      
	  return (
	    <>
	      <input type="checkbox" ref={resolvedRef} {...rest} />
	    </>
	  )
	}
      )
    
    
    // Define a default UI for filtering
    function GlobalFilter({
	preGlobalFilteredRows,
	globalFilter,
	setGlobalFilter,
      }) {
	const count = preGlobalFilteredRows.length
	const [value, setValue] = React.useState(globalFilter)
	const onChange = useAsyncDebounce(value => {
	  setGlobalFilter(value || undefined)
	}, 200)
      
	return (
	    <>
	    
		    <div className="border-b-2 border-black m-2 inline flex w-[200px]">
			    <AiOutlineSearch size={20} />
			    <input 
				className="px-2 focus:outline-none" 
				value={value || ""}
				onChange={e => {
				setValue(e.target.value);
				onChange(e.target.value);
				}}
				placeholder={`${count} records...`}
				style={{
				fontSize: '0.9rem',
				border: '0',
				}}
			    />
		    </div>
	    
	    </>
	)
      }

      
  const SeparateComp = ({children, linkto, deletee, inactive}) => {
	const history = useHistory()
	return (
	  <>
	  <div className={`${inactive && 'opacity-20 hover:pointer-events-none hover:bg-[#fff] hover:text-[#D0000C]'} disabled={inactive} border-2 border-[#1C6AF4] p-2 mr-3 text-[14px] hover:cursor-pointer hover:bg-[#1C6AF4] hover:text-white ${deletee && 'border-[#D0000C] hover:bg-[#D0000C] text-[#D0000C] hover:text-white'}`} title="please upload files here" onClick={() => history.push(`/business/payroll/${linkto}`)}>
	    {children}
	  </div>
	  </>
    
	)
      }

function Table({ columns, data }) {

	const {employeeUpateData, setEmployeeUpdateData} = useContext(UpdateEmployeeContext)
	const history = useHistory()
    
	const [submitting, setSubmitting] = useState(false)
	const [wholeData, setwholeData] = useState({
	  "selectedRowIds": {},
	  "selectedFlatRows[].original": []
	})
    
	// Use the state and functions returned from useTable to build your UI
	const {
	  getTableProps,
	  getTableBodyProps,
	  headerGroups,
	  rows,
	  prepareRow,
    
	  page,
	  canPreviousPage,
	  canNextPage,
	  pageOptions,
	  pageCount,
	  gotoPage,
	  nextPage,
	  previousPage,
	  setPageSize,
	  state: {pageIndex, pageSize, selectedRowIds},
    
	  state,
	  visibleColumns,
	  preGlobalFilteredRows,
	  setGlobalFilter,
    
	  selectedFlatRows
	} = useTable({
		columns,
		data,
		initialState: { pageIndex: 0, pageSize: 5},
		// filterTypes
	    },
	  useFilters,
	  useGlobalFilter,
	  useSortBy,      
	  usePagination,
	  useRowSelect,
	    
	    hooks => {
		hooks.visibleColumns.push(columns => [
		// Let's make a column for selection
		{
		    id: 'selection',
		    // The header can use the table's getToggleAllRowsSelectedProps method
		    // to render a checkbox
		    Header: ({ getToggleAllRowsSelectedProps }) => (
		    <div>
			<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
		    </div>
		    ),
		    // The cell can use the individual row's getToggleRowSelectedProps method
		    // to the render a checkbox
		    Cell: ({ row }) => (
		    <div>
			<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
		    </div>
		    ),
		},
		...columns,
		])
	    }
    
	)
    
	const tryit =  useCallback(() => {
	  
	    setwholeData(
	      {
		  'selectedRowIds': selectedRowIds,
		  'selectedFlatRows[].original': selectedFlatRows.map(
		  d => d.original
		  ),
	      })
	      console.log("wholeData")
	      console.log(wholeData['selectedFlatRows[].original'])
	}, [wholeData, selectedRowIds, selectedFlatRows])
    
    
    
	const altern = useMemo(() => {
    
	   setwholeData(
	    {
		'selectedRowIds': selectedRowIds,
		'selectedFlatRows[].original': selectedFlatRows.map(
		d => d.original
		),
	    })
	}, [ selectedRowIds, selectedFlatRows])
    
	console.log("wholeData")
	console.log(wholeData)
    
	//     const handleDeleteRow = async () => {
    
	// 	    // payrollDeleteRow()
	// 	    // console.log(wholeData['selectedFlatRows[].original'][0]?.paycode)
	// 	    if(wholeData['selectedFlatRows[].original'].length === 1){
	// 		    try {
	// 		    const {data} = await payrollDeleteRow({paycode: wholeData['selectedFlatRows[].original'][0]?.paycode});
			    
	// 		    if (data.status) {
	// 			    toast.success(data.message)
	// 			    setSubmitting(false);
	// 		    }
	// 		    else {
	// 			    toast.error(data.message)
	// 			    setSubmitting(false);
	// 		    }
		    
		    
	// 		    } catch (error) {
	// 		    toast.error(error)
	// 		    console.log(wholeData['selectedFlatRows[].original'][0]?.paycode)
	// 		    }
		    
	// 	    }
	//     }
	//     const handleUpdateRow = async () => {
    
	// 	    // payrollDeleteRow()
	// 	    // console.log(wholeData['selectedFlatRows[].original'][0]?.paycode)
	// 	    if(wholeData['selectedFlatRows[].original'].length === 1){
	// 		    setEmployeeUpdateData(wholeData['selectedFlatRows[].original'])
	// 		    history.push('/business/payroll/updateemployee')
	// 	    }
	//     }
	// useEffect(() => {
	//   tryit()
	// }, [])
    
      
	// Render the UI for your table
	return (
	    <>
	    {/*
	    **************************
	    details about page difference 
		<pre>
		<code>
		    {JSON.stringify(
		    {
			pageIndex,
			pageSize,
			pageCount,
			canNextPage,
			canPreviousPage,
		    },
		    null,
		    2
		    )}
		</code>
		</pre>
	    */}
		<div
		className="flex justify-between">
		    <GlobalFilter
			preGlobalFilteredRows={preGlobalFilteredRows}
			globalFilter={state.globalFilter}
			setGlobalFilter={setGlobalFilter}
		    />
		    <div className="flex">
			    <SeparateComp linkto="createemployee"><BsPlusLg size={20} /></SeparateComp>
			    
			    <div 
			//     onClick={()=> handleUpdateRow()}
			    >
				    <SeparateComp linkto="#fds" inactive={wholeData['selectedFlatRows[].original'].length === 0 || wholeData['selectedFlatRows[].original'].length > 1}
				    > <GiPencil size={20} /></SeparateComp>
			    </div>
    
			    <SeparateComp linkto="upload" ><AiOutlineUpload size={20}  /> </SeparateComp>
    
			    <div 
			    >
				    <SeparateComp linkto="#delete" deletee 
				    inactive={wholeData['selectedFlatRows[].original'].length === 0 || wholeData['selectedFlatRows[].original'].length > 1}>
				    {submitting ? <MiniLoader /> : <RiDeleteBinLine size={20}  />}
			    </SeparateComp>
			    </div>
			    
			    <select
				    value={pageSize}
				    onChange={e => {
					    setPageSize(Number(e.target.value))
				    }}
				    className="border-2 border-[#1C6AF4] p-2 text-[14px]"
			    >
				    {[5, 10, 20].map(pageSize => (
					    <option key={pageSize} value={pageSize}>
					    Employees {pageSize}
					    </option>
				    ))}
			    </select>
		    </div>
		</div>
		<table {...getTableProps()}>
		  <thead>
		    
		    {headerGroups.map(headerGroup => (
		      <tr {...headerGroup.getHeaderGroupProps()}>
			{headerGroup.headers.map(column => (
			  <th {...column.getHeaderProps(column.getSortByToggleProps())} className="">
				<span className="flex">
				{column.render('Header')}
				{/*indicator*/}
				<span>
				    {
					column.isSorted
					?
					<IoIosArrowRoundUp /> 
					:
					<IoIosArrowRoundDown /> 
				    }
				</span>
				
				</span>
			  </th>
			))}
		      </tr>
		    ))}
		    
		  </thead>
		  <tbody {...getTableBodyProps()}>
		    {page.map((row, i) => {
		      prepareRow(row)
		      return (
			<tr {...row.getRowProps()}>
			  {row.cells.map(cell => {
			    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
			  })}
			</tr>
		      )
		    })}
		  </tbody>
		</table>
		
	  <div className="pagination mt-5">
	  <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className={` text-[14px] border-2 border-[#f2f2f2] p-1 m-1 rounded-md w-[35px] ${canPreviousPage ? 'bg-[#1C6AF4]' : 'bg-[#85b0f9]'}  text-white`}>
	    {'<<'}
	  </button>{' '}
	  <button onClick={() => previousPage()} disabled={!canPreviousPage} className={` text-[14px] border-2 border-[#f2f2f2] p-1 m-1 rounded-md w-[35px] ${canPreviousPage ? 'bg-[#1C6AF4]' : 'bg-[#85b0f9]'}  text-white`}>
	    {'<'}
	  </button>{' '}
	  <button onClick={() => nextPage()} disabled={!canNextPage} className={` text-[14px] border-2 border-[#f2f2f2] p-1 m-1 rounded-md w-[35px] ${canNextPage ? 'bg-[#1C6AF4]' : 'bg-[#85b0f9]'}  text-white`}>
	    {'>'}
	  </button>{' '}
	  <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className={` text-[14px] border-2 border-[#f2f2f2] p-1 m-1 rounded-md w-[35px] ${canNextPage ? 'bg-[#1C6AF4]' : 'bg-[#85b0f9]'}  text-white`}>
	    {'>>'}
	  </button>{' '}
	  <span className="text-[15px]">
	    Page{' '}
	    <strong>
	      {pageIndex + 1} of {pageOptions.length}
	    </strong>{' '}
	  </span>
	  <span className="text-[15px]">
	    | Go to page:{' '}
	    <input
	      type="number"
	      defaultValue={pageIndex + 1}
	      onChange={e => {
		const page = e.target.value ? Number(e.target.value) - 1 : 0
		gotoPage(page)
	      }}
	      style={{ width: '100px' }}
	      className="border-2 border-[#ccc] mr-3 p-1 rounded"
	    />
	  </span>{' '}
	  <div>
	  
	    {/*
	    ******************************
	    selected data
	  <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
	    <pre>
		<code>
		    {JSON.stringify(
		    {
			selectedRowIds: selectedRowIds,
			'selectedFlatRows[].original': selectedFlatRows.map(
			d => d.original
			),
		    },
		    null,
		    2
		    )}
		</code>
	    </pre>
	    */}
	  </div>
	</div>
	{console.log("selectedFlatRows.original")}
	{console.log(JSON.stringify(
	  {
	      selectedRowIds: selectedRowIds,
	      'selectedFlatRows[].original': selectedFlatRows.map(
	      d => d.original
	      ),
	  },
	  null,
	  2
	  ))}
	    </>
	)
      }


const Withdrawals = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [fetchingData, setFetchingData] = useState(true);
	const [transactionData, setTransactionData] = useState();
	const history = useHistory();

	const handleClick = (param) => {};

	useEffect(() => {
		// const getTransactions = async () => {
		// 	try {
		// 		const res = await getWithdrawalRequest();
		// 		const resetData = res.data.payload.data?.map((withdrawal, i) => {
		// 			return {
		// 				key: i,
		// 				transactionID: truncateString(withdrawal.request_code, 15),
		// 				amount: toCurrency(withdrawal.amount),
		// 				charges: withdrawal.service_charge,
		// 				date: new Date(withdrawal.updated_at).toDateString(),
		// 				status: withdrawal.status,
		// 			};
		// 		});
		// 		setTransactionData(resetData);
		// 		setFetchingData(false);
		// 	} catch (error) {
		// 		toast.error('An error occurred');
		// 		setFetchingData(false);
		// 	}
		// };
		// getTransactions();
	}, []);

	const tableOptions = [
		// {
		//   name: "Download Payslip",
		//   onClick: handleClick,
		// },
	];


	const columns22 = React.useMemo(
		() => [
		  {
		    Header: 'Employees Payroll',
		    columns: [
		      {
			Header: 'Full Name',
			accessor: 'full_name',
		      },
		      {
			Header: 'Salary',
			accessor: 'salary',
		      },
		      {
			Header: 'Status',
			accessor: 'status',
		      },
		      {
			Header: 'Employee ID',
			accessor: 'paycode',
		      },
		      {
			Header: 'Email',
			accessor: 'email',
		      },
		      {
			Header: 'Phone Number',
			accessor: 'phone',
		      },
		      {
			Header: 'Account Number',
			accessor: 'account_number',
		      },
		      {
			Header: 'Bank Name',
			accessor: 'bank_name',
		      }
		    ],
		  },
		],
		[]
	      )

	return (
		<div>
			<div className="block lg:flex justify-between">
				<h2 className="text-lg mt-5 md:text-xl font-semibold">Transactions History </h2>
				<div className="block lg:flex justify-between pt-10 lg:pt-0">
					{/* <div className="tab flex rounded bg-gray-100 mr-5">
						<div
							className={`px-5 rounded py-3 cursor-pointer ${activeIndex === 0 && '__tab-active'}`}
							onClick={() => setActiveIndex(0)}
						>
							Day
						</div>
						<div
							className={`px-5 rounded py-3 cursor-pointer ${activeIndex === 1 && '__tab-active'}`}
							onClick={() => setActiveIndex(1)}
						>
							Week
						</div>
						<div
							className={`px-5 rounded py-3 cursor-pointer ${activeIndex === 2 && '__tab-active'}`}
							onClick={() => setActiveIndex(2)}
						>
							Month
						</div>
					</div> */}
					{/* <div className="tab flex rounded bg-gray-100 px-5 py-2 mt-5 lg:mt-0 mr-5 lg:mr-0">
					<div className="tab flex rounded bg-gray-100 px-5 py-2 mt-5 lg:mt-0 mr-5 lg:mr-0">
						<BiCalendarEvent size="20" className="my-auto" />
						<div className="px-3 my-auto">Jan, 2019 - Dec, 2019</div>
					</div> */}
				</div>
			</div>


			
			<div className=" ">
				<table style={{textAlign: 'left', width: '95%'}} >
					<tr className="font-semibold" style={{background: "#F9F9F9"}}>
						{/*{columns.map((data, i) => ( */}
							<th className='hidden lg:block py-5 px-5'>Transaction ID</th>
							<th className='py-5 px-5'>Amount</th>
							<th className='hidden lg:block py-5 px-5'>Charges</th>
							<th className='py-5 px-5'>Date</th>
							<th className='py-5 px-5'>Status</th>
							<th className='hidden lg:block py-5 px-5'>Action</th>
						{/* }))}*/}
					</tr>


					{transactionData?.slice(0, 4).map((data, index) => {
						return (
							<tr className='mt-10'>
								<td className='hidden lg:block px-5'>{data.transactionID}</td>
								<td className='px-5'>{data.amount}</td>
								<td className='hidden lg:block px-5'>{toCurrency(data.charges)}</td>
								<td className='px-5'>{data.date}</td>
								<td className='px-5'>
									<CustomTag
										text={data.status}
										isDanger={data.status === 'declined'}
										isSuccess={data.status === 'approved'}
										isWarning={data.status === 'pending'}
									/>
								</td>
								<td className='hidden lg:block px-5'>
									<div className="three_dot flex">
										<ul>
											<li></li>
											<li></li>
											<li></li>
										</ul>
										<span className="text-xs font-semibold"> Download Payslip</span>
									</div>
								</td>
							</tr>
						);
				})} 
				</table>

				<div className="transactionContainer">
				<div className="p-10 flex justify-center items-center capitalize">
					<p>No transaction available</p>
				</div>							
				<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="626.47693" height="457.63821" viewBox="0 0 380 457.63821" xmlnsXlink="http://www.w3.org/1999/xlink">
					<path d="M548.786,555.20605c20.66809-.58645,40.64336-8.51888,56.65-21.49681a90.95513,90.95513,0,0,0,32.00273-51.74665,97.24881,97.24881,0,0,0-7.703-61.51576,90.051,90.051,0,0,0-44.1148-42.78719,96.28983,96.28983,0,0,0-60.854-6.40643c-2.55469.59033-5.07733,1.30361-7.56834,2.12119-2.27612.74706-1.30155,4.35918.99406,3.60573,19.11574-6.274,40.03052-5.52437,58.91352,1.238a87.17555,87.17555,0,0,1,45.63872,37.11046,93.54677,93.54677,0,0,1,12.26169,58.51992,86.47957,86.47957,0,0,1-26.39119,52.09c-14.22912,13.589-32.928,22.81535-52.54505,25.02487-2.42024.2726-4.85.4343-7.28433.50337-2.40118.06814-2.41105,3.80771,0,3.7393Z" transform="translate(-286.76153 -221.18089)" fill="#2563eb"/>
					<path d="M512.99652,338.37993,479.41626,366.9314c-2.19525,1.8665-4.79986,3.79293-5.3929,6.79753a7.55479,7.55479,0,0,0,2.62247,6.84572c2.18018,2.07325,4.95563,3.39114,7.56418,4.82544l9.75961,5.36628,21.688,11.92507c2.11,1.16016,3.9988-2.06777,1.88729-3.22878-11.75274-6.4622-23.6801-12.68421-35.28365-19.4098-1.75678-1.01825-4.51921-2.66353-4.6241-4.97689-.11236-2.47834,3.269-4.51915,4.89613-5.90262l15.60773-13.2704L515.6406,341.024c1.836-1.561-.81991-4.19508-2.64408-2.64409Z" transform="translate(-286.76153 -221.18089)" fill="#2563eb"/>
					<path d="M382.69843,264.46c-25.15545,4.28174-48.19715,17.42084-65.51879,36.041-17.4575,18.76623-28.52929,43.104-30.18175,68.75516a120.01711,120.01711,0,0,0,20.0241,73.84419,111.13416,111.13416,0,0,0,61.28921,44.67691c24.60463,7.17929,51.4787,6.563,75.46927-2.66813,3.02-1.16206,5.97968-2.46883,8.88269-3.8976,2.65259-1.30552.83858-5.55146-1.8367-4.23477-22.27741,10.96426-47.9648,13.6558-72.20647,8.64933-24.32149-5.023-46.5763-18.07313-62.17225-37.477a115.44839,115.44839,0,0,1-25.07816-69.39689,106.72648,106.72648,0,0,1,23.26518-68.20682c15.04414-19.06025,36.30284-33.56042,59.894-39.64427,2.91054-.75059,5.85185-1.36731,8.81469-1.87162,2.92252-.49744,2.28953-5.06895-.645-4.56946Z" transform="translate(-286.76153 -221.18089)" fill="#2563eb"/>
					<path d="M463.83436,523.25034l36.11052-40.68252c2.36066-2.65955,5.21123-5.46294,5.41766-9.23688.18038-3.29771-1.80124-6.06811-4.38552-7.91319-3.02183-2.15747-6.64079-3.2892-10.07586-4.592l-12.852-4.87419-28.56-10.83154c-2.77852-1.05377-4.5299,3.2166-1.74935,4.27114,15.47665,5.86961,31.12525,11.41559,46.465,17.63281,2.32244.94129,5.982,2.47534,6.50917,5.28419.56481,3.00918-3.2152,6.08632-4.965,8.05761l-16.78376,18.90878-18.81815,21.20075c-1.97433,2.2243,1.72556,4.985,3.68717,2.775Z" transform="translate(-286.76153 -221.18089)" fill="#2563eb"/>
				</svg>
			</div>
			</div>
			{/* 

			<div className=" my-16">
				<Table columns={columns} dataSource={transactionData} loading={fetchingData} /> 
				
							<div className="mt-10 ">
								<div className="flex justify-between pt-4 pb-4 mb-5 px-8 font-semibold" style={{background: "#F9F9F9"}}>
									<div>
										<h4>Transaction ID</h4>
									</div>
									<div>
										<h4>Amount</h4>
									</div>
									<div>
										<h4>Charges</h4>
									</div>
									<div>
										<h4>Date</h4>
									</div>
									<div>
										<h4>Status</h4>
									</div>
									<div>
										<h4>Action</h4>
									</div>
								</div>
								{transactionData?.slice(0, 4).map((data, index) => {
									return (
										<div key={index} className="flex justify-between border-b pt-4 pb-10 px-8 text-sm lg:text-base font-medium lg:font-light">
											<div className="w-1/3 lg:w-1/5">
												<div className="font-medium">{data.transactionID}</div>
											</div>
											<div className="block lg:hidden">
												<div className="font-bold text-base text-normal">{data.amount}</div>
												<p>{toCurrency(data.charges)}</p>
											
											</div>

											<div className="font-bold text-normal hidden lg:block">{data.amount}</div>
											<div className="hidden lg:block">
												<p>{toCurrency(data.charges)}</p>
											</div>
											<div className="font-bold text-normal hidden lg:block">{data.date}</div>
											<div className="w-max">
												<CustomTag
													text={data.status}
													isDanger={data.status === 'declined'}
													isSuccess={data.status === 'approved'}
													isWarning={data.status === 'pending'}
												/>
											</div>
				
											<div className="hidden lg:block">
												<div className="three_dot flex">
													<ul>
														<li></li>
														<li></li>
														<li></li>
													</ul>
													<span className="text-xs font-semibold"> Download Payslip</span>
												</div>
											</div>
										</div>
									);
								})} 
							</div>
			</div>
			*/}
			<div className="pt-10">   
				<div className="w-full">
				</div>
			
			</div>
		</div>
	);
};

export default Withdrawals;