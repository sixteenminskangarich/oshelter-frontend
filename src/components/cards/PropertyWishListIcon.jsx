import { FaHeart } from "react-icons/fa"
import { addWishListProperty, findWishListItem } from "../../utils/request"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

export default function PropertyWishListIcon({ token, user, property_id, numberOfProperty}) {
    const [checked, setChecked] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    let user_id = ""
    if(user === null) {
        user_id = "00"
    }else {
        user_id = user.id
    }

    async function findItemInWishList (token, user_id, property_id)  {
        try {
            const response = await findWishListItem(property_id, user_id, token)
            if(response?.message === true) {
                setChecked(true)
            }else {
                setChecked(false)
            }
        } catch (error) {
            console.log(error)
            localStorage.removeItem('user');
			localStorage.removeItem('token');
        }
    }
    
    async function handleAddWishLIst (event)  {
        setLoading(true)
        const externalId = event.currentTarget.value;
        try {
            if (user && token) {
                const response = await addWishListProperty(externalId, token)
                if(response?.success === true) {
                    toast.success(response?.message);
                    setLoading(false)
                    findItemInWishList(token, user_id, property_id)
                }
            } else {
                const currentUrl = window.location.pathname + window.location.search;
                navigate(`/login?redirect=${encodeURIComponent(currentUrl)}`);
            }
        } catch (error) {
            setLoading(true)
            console.log(error)
        }
    }

    if(user && token){
        findItemInWishList(token, user_id, property_id)
    }
    let assignClass = ""
    if(numberOfProperty <= 2) {
        assignClass = "-bottom-[82px] ml-4"
    } else {
        assignClass = "-bottom-[74px] ml-4"
    }
    return(
        <>
            <div className="flex justify-start items-start">
                <button disabled={loading} className={`relative ${assignClass} xl:-bottom-[65px] lg:-bottom[65px] xl:ml-7 lg:ml-7 xl:w-10 xl:h-10 w-8 h-8 ${loading === true ? 'bg-gray-200' : 'bg-white'} rounded-full z-20`} value={property_id} onClick={handleAddWishLIst}>
                    {
                        checked === true ? (
                            <FaHeart className={`relative ml-1.5 top-0.5 text-md xl:size-[27px] pointer ${loading === true ? 'text-red-500' : 'text-red-500 pointer'}`} style={{fontSize: '20px' }}></FaHeart>
                        ) : (
                            <FaHeart className={`relative ml-1.5 top-0.5 xl:size-[27px] text-md ${loading === true ? 'text-gray-500' : 'text-bg-color pointer'}`} style={{ fontSize: '20px' }}></FaHeart>
                        )
                    }
                </button>
            </div>
        </>
    )
}