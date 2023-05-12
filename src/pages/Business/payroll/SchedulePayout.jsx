/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo, useCallback,useContext, createContext } from "react";
import { BiCalendarEvent } from "react-icons/bi";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { toast } from "react-toastify";
import {
        businessSchedulePayoutApi,
        businessScheduleDeleteApi,
    businessPendingSchedulesApi
} from "../../../utils/ApiRequests";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { persistSelector } from "../../../slices/persist";
import { Button } from "../../../components/Button/Button";
import { CustomTag } from "../../../components/CustomTag";
import { AiOutlineSearch, AiOutlineDown, AiOutlinePlus } from "react-icons/ai";
import { DotLoader } from "../../../components/Loaders/DotLoader";
import MiniLoader from "../../../components/Loaders/MiniLoader";
import { useTable, usePagination, useRowSelect, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from 'react-icons/io'
import {AiOutlineUpload}  from 'react-icons/ai'
import {BsPlusLg}  from 'react-icons/bs'
import {GiPencil}  from 'react-icons/gi'
import {RiDeleteBinLine}  from 'react-icons/ri'
import {UpdateEmployeeContext} from '../../../routes/BusinessRoutes'
import { Styles } from "../../../components/Styles";
import EarnasPayroll from './EarnasPayroll'
import PayrollHistory from './PayrollHistory'
import { InputField } from "../../../components/Input";
import { useForm } from "react-hook-form";
// import {Tabs} from 'antd';
// import matchSorter from 'match-sorter'


// IndeterminateCheckbox

const ContextForTable = createContext()


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

  const SeparateComp = ({children, linkto, deletee, inactive, invert}) => {
    const history = useHistory()
    return (
      <>
      <div className={`${inactive && 'opacity-20 hover:pointer-events-none hover:!bg-[#fff] hover:text-[#D0000C]'} 
                ${invert && 'bg-[#1C6AF4] text-[#fff] hover:!bg-[#fff] hover:!text-[#1C6AF4]'} disabled={inactive} flex rounded border-2 border-[#1C6AF4] p-2 mr-3 text-[14px] hover:cursor-pointer hover:bg-[#1C6AF4] hover:text-white 
                ${deletee && 'border-[#D0000C] hover:bg-[#D0000C] text-[#D0000C] hover:text-white'}`} title="please upload files here" 
                onClick={() => history.push(`/business/payroll/${linkto}`)}>
        {children}
      </div>
      </>

    )
  }

  const SeparateComp2 = ({children, linkto, deletee, inactive, invert}) => {
    return (
      <>
      <div className={`${inactive && 'opacity-20 hover:pointer-events-none hover:!bg-[#fff] hover:text-[#D0000C]'} 
                ${invert && 'bg-[#1C6AF4] text-[#fff] hover:!bg-[#fff] hover:!text-[#1C6AF4]'} disabled={inactive} flex rounded border-2 border-[#1C6AF4] p-2 mr-3 text-[14px] hover:cursor-pointer hover:bg-[#1C6AF4] hover:text-white 
                ${deletee && 'border-[#D0000C] hover:bg-[#D0000C] text-[#D0000C] hover:text-white'}`} title="please upload files here" 
                >
        {children}
      </div>
      </>

    )
  }


function Table({ columns, data, setPopup }) {

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

        const handleDeleteRow = async () => {
                // payrollDeleteRow()
                console.log(wholeData['selectedFlatRows[].original'][0]?.transaction_ref)
                if(wholeData['selectedFlatRows[].original'].length === 1){
                        try {

                                
                                const {data} = await businessScheduleDeleteApi({transaction_ref: wholeData['selectedFlatRows[].original'][0]?.transaction_ref});
                                
                                if (data.status) {
                                        toast.success(data.message)
                                        setSubmitting(false);
                                }
                                else {
                                        toast.error(data.message)
                                        setSubmitting(false);
                                }
                
                
                        } catch (error) {
                        toast.error(error)
                        console.log(wholeData['selectedFlatRows[].original'][0]?.paycode)
                        }
                
                }
        }

        const handleUpdateRow = async () => {

                // payrollDeleteRow()
                // console.log(wholeData['selectedFlatRows[].original'][0]?.paycode)
                if(wholeData['selectedFlatRows[].original'].length === 1){
                        setEmployeeUpdateData(wholeData['selectedFlatRows[].original'])
                        history.push('/business/payroll/updateemployee')
                }
        }
    // useEffect(() => {
    //   tryit()
    // }, [])

  
    // Render the UI for your table
    return (
        <>
        <div className="flex justify-end mb-5"> 
        </div>
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
                        <span onClick={() => setPopup(true)}>
                                <SeparateComp2 ><BsPlusLg size={20} /></SeparateComp2>
                        </span>


                        
                        {/*
                        <div onClick={()=> handleUpdateRow()}>
                                <SeparateComp linkto="#fds" inactive={wholeData['selectedFlatRows[].original'].length === 0 || wholeData['selectedFlatRows[].original'].length > 1}
                                > <GiPencil size={20} /></SeparateComp>
                        </div>
                        <SeparateComp linkto="upload" ><AiOutlineUpload size={20}  /> </SeparateComp>
                        */}

                        <div onClick={()=> handleDeleteRow()}>
                                <SeparateComp2 deletee 
                                        inactive={wholeData['selectedFlatRows[].original'].length < 1}>
                                        {submitting ? <MiniLoader /> : <RiDeleteBinLine size={20}  />}
                                </SeparateComp2>
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
  

const SchedulePayout = () => {
    const { user } = useSelector(persistSelector);
    const [policyResponse, setPolicyResponse] = useState();
    const [acceptedEmployees, setAcceptedEmployees] = useState();
    const [paymentLogs, setPaymentLogs] = useState();
    const [activeTab, setActiveTab] = useState(0);
    const [clockInData, setClockInData] = useState();
    const [clockOutData, setClockOutData] = useState();
    const [submitting, setSubmitting] = useState() 
    const [submitting2, setSubmitting2] = useState() 
    const [payrollState, setpayrollState] = useState()
    const [payrollEmployeeState, setpayrollEmployeeState] = useState({})
    const [payrollEmployeeState2, setpayrollEmployeeState2] = useState()
    const [popup, setPopup] = useState(false); 
    const [salaryMonth, setsalaryMonth] = useState(); 
    const [scheduleDate, setscheduleDate] = useState(); 
    const [comments, setComments] = useState(); 
    const [reloadTrigger, setreloadTrigger] = useState(false); 
    const history = useHistory();

    const {register} = useForm()
    
  const columns22 = React.useMemo(
    () => [
          {
            Header: 'Total Payout Amount',
            accessor: 'total_payout_amount',
          },
          {
            Header: 'Salary',
            accessor: 'salary_month',
          },
          {
            Header: 'Paid Employees',
            accessor: 'paid_employees',
          },
          {
            Header: 'UnPaid Employees',
            accessor: 'unpaid_employees',
          },
          {
            Header: 'Payout Date',
            accessor: 'payout_date',
          },
          {
            Header: 'Comment',
            accessor: 'comment',
          },
        ],
    []
  )
    const businessPendingSchedules = async () => {
        setSubmitting(true);
        try {
            const {data} = await businessPendingSchedulesApi();

            console.log("payroll employee list")
            console.log(data.data)
            setpayrollEmployeeState(data.data)
            setpayrollEmployeeState2(data.data)
            
            if (data.status) {
                console.log("entered payroll employee list inside status")
                // toast.success(data.message)
                setpayrollEmployeeState(data.data)
                console.log("payroll employee list inside status")
                console.log(data.data)
                setSubmitting(false);
            }
            else {
                // toast.error(data.message)
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

    const businessSchedulePayout = async () => {
        setSubmitting(true);


        try {
            const {data} = await businessSchedulePayoutApi({comment:comments, salary_month:salaryMonth, payout_date:scheduleDate});

            
            if (data.status) {
                toast.success(data.message)
                setSubmitting(false);
                setPopup(false)
                setreloadTrigger(true)
            }
            else {
                toast.error(data.message)
                setSubmitting(false);
                setPopup(false)
            }

        } catch (error) {
            toast.error(error)
            setSubmitting(false);
            setPopup(false)
        }
        finally {
            setSubmitting(false);
        } 
    }
    const businessSchedulePayout2 = async () => {
        setSubmitting2(true);
        try {
            const {data} = await businessSchedulePayoutApi({comment:comments, salary_month:salaryMonth, payout_date:scheduleDate});

            
            if (data.status) {
                toast.success(data.message)
                setSubmitting2(false);
                setPopup(false)
                setreloadTrigger(true)
            }
            else {
                toast.error(data.message)
                setSubmitting2(false);
                setPopup(false)
            }

        } catch (error) {
            toast.error(error)
            setSubmitting2(false);
            setPopup(false)
        }
        finally {
            setSubmitting2(false);
            setPopup(false)
        } 
    }

    useEffect(() => {
        businessPendingSchedules()
    }, [reloadTrigger]);

    return (
        <ContextForTable.Provider value={{popup ,setPopup}}>
        <div>
            <div className='mt-10 lg:mt-0 cards'>
                
                <div>
                        <div className="block md:flex justify-between">
                        
                                <h2 className="font-semibold text-[21px] tracking-wide pb-10 md:pb-0 border-b-2 border-[#12464a]">Schedule Payout</h2>
                        </div>
                        
                        <br />

                </div>

                <div>

                        <div className="pt-10">   
                                <h2 className="font-bold text-[18px]">Pending Schedules</h2>
                                <div className="w-full">
                                        <Styles>
                                        {
                                                payrollEmployeeState2
                                                &&
                                                payrollEmployeeState2.length !== 0
                                                &&
                                                <Table columns={columns22} data={payrollEmployeeState2} setPopup={setPopup} />
                                        }
                                        </Styles>
                                </div>
                        
                        </div>
                </div>

            </div>
            
            {popup &&
            <div className="">
            <div className="transalte-x-1/2 transalte-y-1/2 w-full absolute bottom-0 top-[20%] left-[0%] md:left-[50%] z-50 p-4">
            <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal"
                                onClick={() => setPopup(false)}
                    >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                            <div className="block">
                                    <label className="block">Salary Month</label>
                                    <input
                                        type="date"
                                        className="bg-gray-100 my-5 text-[#000]/[0.7] py-4 px-6 rounded-lg"
                                        onChange={(e) => setsalaryMonth(e.target.value)}
                                    />
                            </div>
                            <div className="block">
                                    <label className="block">Schedule Date</label>
                                    <input
                                        type="date"
                                        className="bg-gray-100 my-5 text-[#000]/[0.7] py-4 px-6 rounded-lg"
                                        onChange={(e) => setscheduleDate(e.target.value)}
                                    />
                            </div>
                            <InputField
                                    type="text"
                                    label="Comments"
                                    placeholder=""
                                    onChange={(e) => setComments(e.target.value)}
                            />
                            <div className="w-full justify-between">
                                <span className="pr-5">
                                <Button buttonText="Schedule" loading={submitting} onClick={businessSchedulePayout}  /> 
                                
                                </span>
                                <Button buttonText="Pay now" loading={submitting2} onClick={businessSchedulePayout2}  />
                            </div>
                    </div>
                    </div>
            </div>
            </div> 
    
            </div>
                }

        </div>
        </ContextForTable.Provider>
    );
};

export default SchedulePayout;
