/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../layouts/SideBar';
import SmsImage from '../../../../assets/images/sms.png';
import { fetchBooking, fetchBookings, fetchUserBookings, rejectBookings, updateBookings } from '../../../../utils/request';
import { useQuery } from 'react-query';
import { useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';
import Spinner from '../../../Spinner';
import { Link } from 'react-router-dom';
import { Modal } from "flowbite-react";
import { RiHomeOfficeLine } from "react-icons/ri";
import { RiUserLine } from "react-icons/ri";
import preview from '../../../../assets/images/property.png'
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from 'react-toastify';
import { ImSpinner9 } from 'react-icons/im';

const MySpaces = () => {
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
    const pathname = useLocation();
    const [key, setKey] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [modalSize, setModalSize] = useState('xl');
    const [isCancelled, setIsCancelled] = useState(false);

    const inputRef = useRef(null);
    const [image, setImage] = useState("");

    let w = window.innerWidth;

    const {
		data: bookings,
		isLoading,
		status,
	} = useQuery({
		queryKey: ['bookings', { token }],
		queryFn: () => fetchUserBookings(token),

		refetchInterval: 5000,
	});

    const handleClick = (event) => {
        setKey(null)
        setImage(null)
        const externalId = event.currentTarget.value;
        const firstData = fetchBooking(token, externalId);
        firstData.then((result) => {
            setKey(result)
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        });
        setOpenModal(true)
    };

    const handleUpdateBooking = (event) => {
        const externalId = event.currentTarget.value;
        const data = {
            status: "approved",
        };
        if (user && token) {
            const response = updateBookings(data, token, externalId)
            response.then((result) => {
                if(result?.success === true) {
                    setOpenModal(false)
                    navigate(`/dashboard/properties/bookings`);
                }
            })
            .catch((error) => {
                console.log(error)
            });
        } else {
            // User is not logged in, append the current page URL to the login route
            const currentUrl = window.location.pathname + window.location.search;
            navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
        }
    }

    const handleRejectBooking = async(orderId) => {
        setIsCancelled(true)
        if(user && token) {
            const response = await rejectBookings(orderId, token);
            if(response?.success === true) {
                setIsCancelled(false)
                setOpenModal(false)
                toast.success('Booking cancelled successfully');
                navigate(`/dashboard/myspaces`);
            }else {
                toast.error('Booking rejected failed');
                setIsCancelled(false)
            }
        }
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file)
        setImage(url)
    }

    function selectFile() {
        inputRef.current.click();
    }
    const results = bookings?.data;
    console.log(results)

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day},${month} ${year}`;
    }

    function formatMonth(month) {
        const year = Math.floor(month / 12);
        if(year > 1) {
            return `${year} years`;
        }
        
        return `${year} year`;
    } 

    const diffBetweenTwoDate = (date1, date2) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
      
        let diff = d2.getTime() - d1.getTime();
      
        let days = diff / (1000 * 60 * 60 * 24);
        return days;
    }

    return(
        <div className='flex font-josefin-sans'>
            <Sidebar />
            <div className='p-4 sm:ml-64 flex-1 mt-16 overflow-y-scroll h-[700px]'>
                <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">Booked Homes</h3>
                    <br />
                    {
                        isLoading === true ? (
                            <>
                                <div className="flex">
                                    <AiOutlineLoading className="animate-spin text-bg-color mr-2"/>
                                    <p className="animate-bounce text-bg-color">Loading</p>
                                </div>
                            </>
                        ) : (
                            results ? (
                                w <= 789 || w <= 810 ? (
                                    (
                                        <div className="flow-root">
                                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 mb-20">
                                                {
                                                    results ? (
                                                        results?.map((bookings, index) => (
                                                            <>
                                                                <li className="mt-4 sm:py-4 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700">
                                                                    <div className="flex">
                                                                        <div className="flex-1 min-w-0 ms-4 mt-4">
                                                                            <p className="flex text-sm font-medium tracking-wider text-gray-900 truncate dark:text-white mb-2">
                                                                                <RiHomeOfficeLine className="mr-1" /> 
                                                                                <span className='relative bottom-1'>
                                                                                    {bookings.property} 
                                                                                </span>
    
                                                                                <span className='flex justify-end rounded-full tracking-wider ml-4'>
                                                                                    <div className="relative top-0.5 w-3 h-3 bg-bg-color rounded-full mx-1 property-badge"></div>
                                                                                    <span className='font-medium' style={{ color: 'gray', fontSize: '12px' }}>{bookings.marketType}</span>
                                                                                </span>
                                                                            </p>
                                                                            
                                                                            <p className="flex text-md tracking-wider text-gray-500 dark:text-gray-400">
                                                                                
    
                                                                                {bookings.status === "PENDING" ? (
                                                                                    <span className="text-bg-color text-xs font-medium me-2 px-2.5 py-[1px] rounded-full border border-bg-color">Your booking is pending approval</span>
                                                                                ) : bookings.status === "rejected" ? (
                                                                                    <span className=" text-red-800 text-xs font-medium me-2 px-2.5 py-[1px] rounded-full border border-red-800">Your booking has been rejected</span>
                                                                                ): bookings.status === "cancelled" ? (
                                                                                    <span className=" text-red-800 text-xs font-medium me-2 px-2.5 py-[1px] rounded-full border border-red-800">Your booking has been cancelled</span>
                                                                                )
                                                                                : (
                                                                                    <span className="bg-green-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-[1px] rounded-full border border-indigo-400">Approved</span>
                                                                                )}
                                                                            </p>
                                                                            <br />
                                                                            
                                                                            <p className="flex text-sm text-black font-thin tracking-wider dark:text-gray-400 -mt-4 mb-2">
                                                                                <RiUserLine />
                                                                                <span className='relative bottom-1'>
                                                                                    {bookings.requestedUser} 
                                                                                </span>
                                                                            </p>
    
                                                                            <div className="flex justify-end mr-2">
                                                                                <button type="button" value={bookings?.id } onClick={handleClick} className="bg-transparent relatve mb-6 hover:bg-blue-500 text-bg-color font-semibold hover:text-white py-0.5 px-4 border border-bg-color hover:border-transparent rounded-xl">
                                                                                    view
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                </li>
                                                            </>
                                                        ))
                                                    ) : (
                                                        "Loading"
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    )
                                ) : (
                                    <>
                                        <div className="relative overflow-x-auto">
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3">
                                                            Property
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Market Type
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Base Property
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Requested By
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            STATUS
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            ACTION
                                                        </th>
                                                    </tr>
                                                </thead>
    
                                                <tbody className='items-center'>
                                                    {
                                                        results?.map((row, index) => (
                                                            <>
                                                                <tr className="bg-white uppercase border-b dark:bg-gray-800 dark:border-gray-700">
                                                                    <td className="px-6 py-4">
                                                                        {row?.property}
                                                                    </td>
                                                                    <td className="mr-4 py-4">
                                                                        {row.marketType}
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {row.type}
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {row.requestedUser}
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {row.status === "PENDING" ? (
                                                                            <span className="bg-white text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-gray-700 dark:text-green-400 border border-indigo-400">PENDING</span>
                                                                        ) : row.status === "rejected" ? (
                                                                            <span className="bg-white text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-gray-700 dark:text-red-400 border border-red-400">Rejected</span>
                                                                        ): row.status === "cancelled" ? (
                                                                            <span className="bg-white text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-gray-700 dark:text-red-400 border border-red-400">Cancelled</span>
                                                                        )
                                                                        : (
                                                                            <span className="bg-green-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-gray-700 dark:text-green-400 border border-indigo-400">Approved</span>
                                                                        )}
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        <button type="button" value={row?.id } onClick={handleClick} className="bg-transparent hover:bg-blue-800 text-blue-800 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded-lg">
                                                                            view
                                                                        </button>&nbsp;
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                )
                            ) : (
                                "No data found"
                            )
                        )
                    }
                </div>
            </div>

            <Modal show={openModal} size={modalSize} onClose={() => setOpenModal(false)}>
                {
                    key ? (
                        <>
                            <Modal.Header className='items-center'>Booking information</Modal.Header>
                            <Modal.Body style={{ height: 'auto', backgroundColor: 'white'}} className="rounded-xl">
                                {
                                    key && (
                                        <div className="p-4 md:p-5 space-y-4">
                                            <h6 className="text-md -mt-8 font-semibold text-gray-900 dark:text-white">
                                                Property Title: {key?.property}
                                            </h6>

                                            
                                            {
                                                key.status === "approved" && (user.accountType === "visitor" || user.accountType === "serviceprovider") ? (
                                                    <>
                                                        <span className="bg-green-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-indigo-400 mb-3">awaiting payment</span>
                                                        <h5 className="mb-2 text-lg font-thin tracking-tight text-gray-900 dark:text-white">Upload payment proof</h5>
                                                        <div className="">
                                                            <div onClick={selectFile} style={{ cursor: 'pointer' }}>
                                                                {
                                                                    image ? (
                                                                        <img src={image} alt={image.name} className="h-52 w-48 rounded-lg"/>
                                                                    ) : (
                                                                        <img src={preview} alt="Preview" className="h-52 w-48 rounded-lg"/>
                                                                    )
                                                                }
                                                                <input type="file" className="file" onChange={handleImageChange} name="photos" ref={inputRef} style={{ display: "none" }} />
                                                            </div>
                                                        </div>
                                                    </>
                                                ) 
                                                :
                                                (
                                                    <>
                                                        {
                                                            key.marketType === "Rent" ? (
                                                                <>
                                                                    <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                                                        Duration: <span className="font-thin">{key?.duration >= 12 ? formatMonth(key?.duration) : '6 months'}</span>
                                                                    </h6>
            
                                                                    <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                                                        Number Of Children: <span className="font-thin">{key?.numberOfChildren}</span>
                                                                    </h6>
            
                                                                    <h6 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
                                                                        Number Of Adult: <span className="font-thin">{key?.numberOfAdult}</span>
                                                                    </h6>
                                                                </>
                                                            ) : key.marketType === "Sale" ? (
                                                                <>
                                                                    <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                                                        Date Of Appointment:
                                                                    </h6>
                                                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                        {formatDate(key?.dateOfAppointment)}
                                                                    </p>
            
                                                                    <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                                                        Time Of Appointment:
                                                                    </h6>
                                                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                        {key?.timeOfAppointment}
                                                                    </p>
                                                                </>
                                                            )
                                                            : key.marketType === "Renting" ? (
                                                                <>
                                                                    <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                                                        Date Of Event: {formatDate(key?.dateOfAppointment)}
                                                                    </h6>
            
                                                                    <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                                                        Start Time For Event: {key?.startTime}
                                                                    </h6>

                                                                    <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                                                        End Time For Event: {key?.endTime}
                                                                    </h6>
                                                                </>
                                                            )
                                                            :
                                                            (
                                                                <>
                                                                    <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                                                        Checkin Date: <span className="font-thin">{formatDate(key?.checkin)}</span>
                                                                    </h6>
            
                                                                    <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                                                        Checkout Date: <span className="font-thin">{ formatDate(key?.checkout) }</span>
                                                                    </h6>

                                                                    <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                                                        Duration of stay: <span className="font-thin">{diffBetweenTwoDate(key?.checkin, key?.checkout)}{diffBetweenTwoDate(key?.checkin, key?.checkout) > 1 ? ' days' : ' day'}</span>
                                                                    </h6>
            
                                                                    <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                                                        Number Of Children: <span className="font-thin">{key?.numberOfChildren}</span>
                                                                    </h6>
            
                                                                    <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                                                        Number Of Adult: <span className="font-thin">{key?.numberOfAdult}</span>
                                                                    </h6>
                                                                </>
                                                            )
                                                        }
                                                    {
                                                        key?.status === "approved" ? (
                                                            <>
                                                                <span className="relative top-3 bg-green-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl dark:bg-gray-700 dark:text-green-400 border border-indigo-400">approved awaiting payment</span>
                                                                {
                                                                    key?.marketType === "Renting" && (
                                                                        <>
                                                                            <div className="border border-blue-500 p-4 rounded-md" style={{ marginTop: '32px' }}>
                                                                                <h6 className="text-md font-semibold text-gray-900 dark:text-white">
                                                                                    Additional Notes:
                                                                                </h6>
                                                                                <p className="text-base leading-relaxed text-gray-800 dark:text-gray-400">
                                                                                    20% payment of {key?.currency}{key?.amount} should be made as deposit
                                                                                </p>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                }
                                                            </>
                                                        ) : key?.status === "rejected" ? (
                                                            <span className="relative top-3 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl border border-red-400">Your booking has been rejected</span>
                                                        ): key?.status === "cancelled" ? (
                                                            <span className="relative top-3 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-xl border border-red-400">Your booking has been cancelled</span>
                                                        )
                                                        : (
                                                            <span className="relative top-3 bg-green-100 mb-7 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-indigo-400">Kindly wait while your booking is being processed</span>
                                                        )
                                                    }
                                                    </>
                                                )
                                            }
                                        </div>
                                    )
                                }
                                <br />
                                <div className="flex justify-end">
                                    {
                                        key?.status === "approved" ? (
                                            <>
                                                {
                                                    key.marketType === "Renting" ? (
                                                        <button type="button" value={key?.id }  className="text-white items-center bg-blue-800 font-medium text-sm rounded-lg px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Make Payment</button>
                                                    ) : (
                                                        <button type="button" value={key?.id }  className="text-white items-center bg-blue-800 font-medium text-sm rounded-lg px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload Proof</button>
                                                    )
                                                }
                                            </>
                                        ) : (key?.status === "rejected" || key?.status === "cancelled") ?<></> :
                                        (
                                            <button 
                                                type="button" 
                                                onClick={() => handleRejectBooking(key?.id)}
                                                disabled={isCancelled} 
                                                className={`flex text-white items-center ${isCancelled === true ? 'bg-blue-300' : 'bg-blue-800'} font-medium text-sm rounded-lg px-5 py-2 text-center`}>
                                                    {isCancelled === true ? (<><ImSpinner9 className="animate-spin"/><span className="ml-3">Cancelling booking</span></>) : (<><span className="ml-3">Cancel Booking</span></>)}
                                            </button>
                                        )
                                    }&nbsp;
                                    <button type="button" onClick={() => setOpenModal(false)} className="text-white items-center bg-red-800 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Close</button>
                                </div>
                            </Modal.Body>
                        </>
                    ) : ("Loading")
                }
            </Modal>
        </div>
    );
};

export default MySpaces;