/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { BiCalendarEvent } from "react-icons/bi";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import styled from 'styled-components'
import { toast } from "react-toastify";
import {
    payrollGetStatsApi,
    payrollEmployeeListApi,
} from "../../../utils/ApiRequests";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { persistSelector } from "../../../slices/persist";
import { Button } from "../../../components/Button/Button";
import { CustomTag } from "../../../components/CustomTag";
import { AiOutlineSearch, AiOutlineDown, AiOutlinePlus } from "react-icons/ai";
import { DotLoader } from "../../../components/Loaders/DotLoader";
import { useTable, usePagination, useRowSelect, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from 'react-icons/io'
import {AiOutlineUpload}  from 'react-icons/ai'
import {BsPlusLg}  from 'react-icons/bs'
import {GiPencil}  from 'react-icons/gi'
import {RiDeleteBinLine}  from 'react-icons/ri'
// import matchSorter from 'match-sorter'

const Styles = styled.div`

    width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: auto;
  /* margin: 1rem; */

  table {
    border-spacing: 0;
    border-bottom: 1px solid #b3b3b3;
    width: '100%';

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
      :first-child {
        th {
        /* border-left: 1px solid #b3b3b3;   
        border-right: 1px solid #b3b3b3;    */
            background: none;
        }
      }
    }
    th {
        background-color: rgba(242, 242, 242, 0.5);
        font-size: 13px;
        color: rgba(17, 17, 17, 0.8);
        text-transform: capitalize;
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #E1E4E9;
      padding-top: 20px;
      padding-bottom: 20px;
        font-size: 12px;
      /* border-right: 1px solid #d9d9d9; */

      :last-child {
        border-right: 0;
      }
    }
  }
`

// IndeterminateCheckbox

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
  
  // const handlePayroll = () => {
  //   // history.push('/business/payroll/upload')
  // }

  const SeparateComp = ({children, linkto, deletee, inactive}) => {
    const history = useHistory()
    return (
      <>
      <div className={`${inactive && 'opacity-20'} border-2 border-[#1C6AF4] p-2 mr-3 text-[14px] hover:cursor-pointer hover:bg-[#1C6AF4] hover:text-white ${deletee && 'border-[#D0000C] hover:bg-[#D0000C] text-[#D0000C] hover:text-white'}`} title="please upload files here" onClick={() => history.push(`/business/payroll/${linkto}`)}>
        {children}
      </div>
      </>

    )
  }



function Table({ columns, data }) {


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

    useEffect(() => {
      tryit()
    }, [])

  
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
                <SeparateComp linkto="/" inactive> <GiPencil size={20}  /></SeparateComp>
                <SeparateComp linkto="upload" ><AiOutlineUpload size={20}  /> </SeparateComp>
                <SeparateComp linkto="/" deletee inactive><RiDeleteBinLine size={20}  /></SeparateComp>
                
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
  

const Payroll = () => {
    const { user } = useSelector(persistSelector);
    const [policyResponse, setPolicyResponse] = useState();
    const [acceptedEmployees, setAcceptedEmployees] = useState();
    const [paymentLogs, setPaymentLogs] = useState();
    const [activeTab, setActiveTab] = useState(0);
    const [clockInData, setClockInData] = useState();
    const [clockOutData, setClockOutData] = useState();
    const [submitting, setSubmitting] = useState()
    const [payrollState, setpayrollState] = useState()
    const [payrollEmployeeState, setpayrollEmployeeState] = useState({})
    const [payrollEmployeeState2, setpayrollEmployeeState2] = useState()

    const history = useHistory();
    
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

    
    const payrollGetStats = async () => {
        setSubmitting(true);
        try {
            const {data} = await payrollGetStatsApi();
            
            if (data.status) {
                toast.success(data.message)
                setpayrollState(data.data)
                setSubmitting(false);
            }
            else {
                toast.error(data.message)
                setSubmitting(false);
            }

        } catch (error) {
            toast.error(error)
            setSubmitting(false);
        }
        finally {
            setSubmitting(false);
        } 
    }

    const payrollEmployeeList = async () => {
        setSubmitting(true);
        try {
            const {data} = await payrollEmployeeListApi();

            console.log("payroll employee list")
            console.log(data.data)
            setpayrollEmployeeState(data.data)
            setpayrollEmployeeState2(data.data)
            
            if (data.status) {
                console.log("entered payroll employee list inside status")
                toast.success(data.message)
                setpayrollEmployeeState(data.data)
                console.log("payroll employee list inside status")
                console.log(data.data)
                setSubmitting(false);
            }
            else {
                toast.error(data.message)
                setSubmitting(false);
            }

        } catch (error) {
            toast.error(error)
            setSubmitting(false);
        }
        finally {
            setSubmitting(false);
        } 
    }

    useEffect(() => {
        payrollGetStats()
        payrollEmployeeList()
    }, []);


    const totalDue = paymentLogs
        ?.filter(data => typeof data.amount_remaining == "string")
        .reduce(
            (acc, num) => parseInt(acc) + parseInt(num.amount_remaining),
            0
        );

    return (
        <div>
            <div className='mt-10 lg:mt-0 cards'>
                
                <div>
                        <div className="block md:flex justify-between">
                        
                                <h2 className="font-semibold text-[21px] tracking-wide pb-10 md:pb-0">Employees payroll Report</h2>
                                <Button buttonText="schedule payout" />
                        </div>
                        
                        <br />

                </div>

                <div className='flex mobiles:block'>
                    <div className='w-1/3 h-[142px] mobiles:w-full mobiles:my-4 mr-5 rounded-[10px] border border-gray-200 p-6'>
                        <p className='text-lg font-bold text-gray-600'>
                                Active Company size
                        </p>
                        {
                            submitting
                            ?
                            <DotLoader/>
                            :
                            (
                                <>
                                    <p className='flex mt-2 text-sm font-light'>
                                    {/*
                                    {`${new Date(
                                        policyResponse?.updated_at
                                    ).toLocaleString("default", {
                                        month: "long",
                                    })} ${new Date(
                                        policyResponse?.updated_at
                                    ).getFullYear()} `}
                                    */}
                                    This Month
                                    </p>
                                    <h4 className='text-[28px] font-bold mt-1.5'>{payrollState?.company_size}</h4>
                                </>
                            )

                        }
                    </div>
                    <div className='w-1/3 h-[142px] mobiles:w-full mobiles:my-4 mr-5 rounded-[10px] border border-gray-200 p-6'>
                        <p className='text-lg font-bold text-gray-600'>
                                Active Payroll size 
                        </p>
                        
                        {
                            submitting
                            ?
                            <DotLoader />
                            :
                            (
                                <>
                                <p className='flex mt-2 text-sm font-normal mobiles:flex mobiles:justify-between'>
                                    {/*
                                    {`${new Date(
                                        policyResponse?.updated_at
                                    ).toLocaleString("default", {
                                        month: "long",
                                    })} ${new Date(
                                        policyResponse?.updated_at
                                    ).getFullYear()} `}
                                  */}
                                    This Month
                                    <span
                                        className='flex ml-2 font-bold'
                                        style={{ color: "#0B9B36" }}>
                                        0% <BsArrowUp className='my-auto' />
                                    </span>
                                </p>
                                <h4 className='text-[28px] font-bold flex justify-between items-center mt-1.5'>
                                {payrollState?.payroll_size}
                                    <span
                                        className='ml-2 text-sm font-bold text-gray-500 cursor-pointer'
                                        onClick={() => {/*history.push("/employee")*/}}
                                        >
                                        Manage{" "}
                                    </span>
                                </h4>
                                </>
                            )

                        }
                    </div>
                    <div className='w-1/3 h-[142px] mobiles:w-full mobiles:my-4 mr-5 rounded-[10px] border border-gray-200 p-6'>
                        <p className='text-lg font-bold text-gray-600'>
                            Upcoming payments
                        </p>
                        {
                            submitting
                            ?
                            <DotLoader />
                            :
                            (
                                <>
                                    <p className='flex mt-2 text-sm font-normal mobiles:flex mobiles:justify-between'>
                                        January 2021{" "}
                                        <span
                                            className='flex ml-2 font-bold'
                                            style={{ color: "#D0000C" }}>
                                            -3% <BsArrowDown className='my-auto font-bold' />
                                        </span>
                                    </p>
                                    <h4 className='text-[28px] font-bold flex justify-between items-center mt-1.5'>
                                    
                                        {payrollState?.upcoming_payment}
                                        <span
                                            className='ml-2 text-sm font-bold text-gray-500 cursor-pointer'
                                            onClick={() => {/*history.push("/payments")*/}}>
                                            Repay now
                                        </span>
                                    </h4>
                                </>
                            )

                        }
                    </div>
                </div>
                {/*
                <div>
                        <div className="block md:flex justify-between pt-10">
                                <div>
                                        <div className="inline">
                                                <button className="bg-[#F3F4F6] px-6 py-2 m-2 rounded ">create single staff <span className="px-2">+</span> </button>
                                        </div>
                                        <div className="inline">
                                                <button className="bg-[#F3F4F6] px-6 py-2 m-2 rounded">Upload in bulk</button>
                                        </div>
                                </div>
                                <div className="pt-3 flex">
                                        <div className="border-b-2 border-black m-2 inline flex">
                                                <AiOutlineSearch /><input type="text" placeholder="Type in to search" className="px-2" />
                                        </div>

                                        <div className="m-2 inline flex">
                                                <span className="pr-2">  Filter</span><AiOutlineDown />
                                        </div>
                                </div>
                        </div>
                </div>
                */}
                <div className="pt-10">   
                        <div className="w-full">
                            <Styles>
                                {
                                    payrollEmployeeState2
                                    &&
                                    payrollEmployeeState2.length !== 0
                                    &&
                                    <Table columns={columns22} data={payrollEmployeeState2} />
                                }
                            </Styles>
                        </div>
                
                </div>
            </div>

        </div>
    );
};

export default Payroll;
