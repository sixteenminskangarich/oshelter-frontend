/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../layouts/SideBar';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { LineWave, Audio } from "react-loader-spinner";
import Property from '../../../cards/properties/Property';
import PropertyDetails from '../../../cards/properties/PropertyDetails';
import PropertyFiles from '../../../cards/properties/PropertyFiles';
import PropertyRules from '../../../cards/properties/propertyRules';
import { getPropertyById } from '../../../../utils/request';
import PropertyPricing from '../../../cards/properties/PropertyPricing';
import PropertyInformation from '../../../cards/properties/PropertyInformation';
import FinishPage from '../../../cards/properties/FinishPage';
import PropertyAmentites from '../../../cards/properties/propertyAmenities';

const EditProperty = () => {
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    let id = "";
    let { externalId, step } = useParams();
	const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    let properties = ""
    let next = "";
    let percent = "";

    if(externalId) {
        id = externalId
    }

    console.log(id)
    const {
        data: details,
        Loading,
        status1,
    } = useQuery({
        queryKey: ['properties', { id, token }],
        queryFn: () => getPropertyById(id, token),
    });



    properties = details

    if(properties != null) {
        if(properties?.data.marketType === "Sale" && step === "1") {
            step = 2
            next = 3
        }

        if(properties?.data.marketType === "Sale" && step === "2") {
            next = 3
        }

        if(step === "1") {
            percent = "20%";
        } else if(step === "2") {
            percent = "40%"
        } else if(step === "3") {
            percent = "60%"
        } else if(step === "4") {
            percent = "80%"
        } else if(step === "5") {
            percent = "100%"
        }

        console.log(properties)
    }

    const [alert, setAlert] = useState(false);
	return (
		<div className='flex font-josefin-sans'>
			<Sidebar />
            <div className='sm:ml-64 flex-1 p-4 mt-16'>
                <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    {loading ?
                        <Audio
                            height="300"
                            width="300"
                            radius="9"
                            color="blue"
                            ariaLabel="three-dots-loading" 
                            wrapperStyle
                            wrapperClass
                        />
                        :
                            <>
                                {
                                    externalId && (step == 1) ? (
                                        <PropertyRules externalId={externalId} properties={properties}/>
                                    ):
                                    externalId && (step == 2) ?
                                    (
                                        <PropertyDetails externalId={externalId} properties={properties} next={next}/>
                                        
                                    ) : externalId && (step == 3) ? 
                                    (
                                        <PropertyFiles externalId={externalId} properties={properties}/>
                                    ) : externalId && (step == 4) ? (
                                        <PropertyPricing externalId={externalId} properties={properties}/>
                                    ) : externalId && (step == 5) ?
                                    (
                                        <PropertyInformation externalId={externalId} properties={properties} />
                                    ): externalId && (step == 6) ? (
                                        <FinishPage />
                                    )
                                    : externalId && step == 0 ?
                                    (
                                        <PropertyAmentites externalId={externalId} properties={properties}/>
                                    )
                                    :
                                    (
                                        <Property externalId={externalId} properties={properties} />
                                    )
                                }
                               
                                {/* <PropertyDetails /> */}
                                {/* <PropertyOtherDetails /> */}
                            </>
                    }
                </div>
            </div>
		</div>
	);
};

export default EditProperty;