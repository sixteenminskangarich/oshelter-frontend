import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';


const FinishPage = ({ externalId, properties  }) => {
    const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

	return (
        <>
            <div className="flex flex-col justify-center items-center">
                <img src="https://oshelter.com/_nuxt/img/complete-listing.9389537.png" width="330" height="260" alt="Complete" /> 
                <div className="w-half mt-16">
                    <h4 className="font-bold text-center">Your listing is in review</h4>
                    <p className="text-center mt-8">
                        We’ll notify you once Oshelter approves it and it goes live.
                    </p>
                    <div className="flex justify-center mt-4 mb-8">
                        <Link to='/dashboard/properties' className="px-3 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 border border-transparent rounded-md focus:outline-none bg-blue-500 hover:bg-oshelter-deep-blue focus:shadow-outline-oshelter-deep-blue float-right px-10 py-3">My Properties</Link>
                    </div>
                </div>
            </div>
        </>
	);
};

export default FinishPage;