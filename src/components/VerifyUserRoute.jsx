import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchOnboarding } from '../utils/onboardingQueries';
import { useQuery } from 'react-query';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

VerifyUser.propTypes = {
    children: PropTypes.node.isRequired,
};

export default function VerifyUser({ children }) {
    const token = useSelector((state) => state.auth.token);
    const {
        data: onboard,
        isLoading,
        status,
    } = useQuery({
        queryKey: ['onboard', { token }],
        queryFn: () => fetchOnboarding(token),
    });

    if(isLoading === true) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        )
    }
    
    if(status === "error") {
        return <Navigate to="/login" replace />
    }

    const result = onboard?.data

    if(result?.onboardingStep < 4 && (result?.accountType === "owner" || result?.accountType === "serviceprovider")) {
        return <Navigate to="/onboarding" replace />
    }
    else if(result?.smsVerified === false) {
        return <Navigate to="/otp" replace />
    }
    else {
        return children;
    }
}