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
				<h2 className="text-lg md:text-xl font-semibold">Transactions History </h2>
				<div className="block lg:flex justify-between pt-10 lg:pt-0">
					<div className="tab flex rounded bg-gray-100 px-5 py-2 mt-5 lg:mt-0 mr-5 lg:mr-0">
						<BiCalendarEvent size="20" className="my-auto" />
						<div className="px-3 my-auto">Jan, 2019 - Dec, 2019</div>
					</div>
				</div>
			</div>


			
			<div className=" my-16">
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