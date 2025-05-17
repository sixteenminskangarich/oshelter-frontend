/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../layouts/SideBar';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { LineWave, Audio } from "react-loader-spinner";
import Property from '../../../cards/properties/Property';
import PropertyAmentites from '../../../cards/properties/propertyAmenities';
import PropertyDetails from '../../../cards/properties/PropertyDetails';
import PropertyFiles from '../../../cards/properties/PropertyFiles';
import PropertyRules from '../../../cards/properties/propertyRules';
import { getPropertyById } from '../../../../utils/request';
import PropertyPricing from '../../../cards/properties/PropertyPricing';
import PropertyInformation from '../../../cards/properties/PropertyInformation';
import FinishPage from '../../../cards/properties/FinishPage';
import NewProperty from '../../../cards/properties/newProperty';

const AddProperty = () => {
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    let id = "";
    let { externalId, step } = useParams();
	const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    let properties = ""
    let next = "";
    const [records, setRecords] = useState([])

    if(externalId) {
        id = externalId
    }

    const {
        data: details,
        Loading,
        status1,
    } = useQuery({
        queryKey: ['amentites', { id, token }],
        queryFn: () => getPropertyById(id, token),
    });

    properties = details

    if(properties != null) {
        if(properties?.data.marketType === "Sale" && step === "1") {
            step = 2
        }

        if(properties?.data.propertyType === "Land" && step === "1") {
            step = 2
        }
    }

    const [alert, setAlert] = useState(false);
	return (
		<div className='flex font-josefin-sans'>
			<Sidebar />
            { records ? (
                <div className='p-4 sm:ml-64 flex-1 mt-16'>
                    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <>
                            {
                                externalId && (step == 1) ? (
                                    <PropertyRules externalId={externalId} properties={properties}/>
                                ):
                                externalId && (step == 2) ?
                                (
                                    <PropertyDetails externalId={externalId} properties={properties}/>
                                    
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
                                : externalId ?
                                (
                                    <PropertyAmentites externalId={externalId} properties={properties}/>
                                )
                                :
                                (
                                    <NewProperty />
                                )
                            }
                               
                            {/* <PropertyDetails /> */}
                            {/* <PropertyOtherDetails /> */}
                        </>
                    </div>
            </div>
            ) : (
                <Audio
                            height="300"
                            width="300"
                            radius="9"
                            color="blue"
                            ariaLabel="three-dots-loading" 
                            wrapperStyle
                            wrapperClass
                        />
            )}
		</div>
	);
};

export default AddProperty;
