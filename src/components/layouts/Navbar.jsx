"use client"
import { useState, useEffect, useRef } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import logo from '../../assets/images/logo-group.png';
import { Link, useLocation } from 'react-router-dom';
import { logout, setChangeUser } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import profile from '../../assets/images/user.png';
import Swal from 'sweetalert2';
import { FiAlignRight } from "react-icons/fi";
import { FaGripLines } from "react-icons/fa";
import { switchAccount } from '../../utils/accountQueries';

const Navbar = () => {
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const dropdownRef = useRef(null);
	const location = useLocation(); // useLocation hook to get the current path
	const key = location.pathname.split('/')[1];

	const w = window.innerWidth;

	const handleLogout = () => {
		dispatch(logout());
		toast.success('Logged out successfully');
		navigate('/services');
	};

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const profilePicUrl = 'https://via.placeholder.com/40'; // Replace with actual profile picture URL

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const ref = useRef(null);

	const sideBarClicked = () => {
		setIsMenuOpen(false)
		setIsDropdownOpen(false)
	}

	const handleChangeAccount = async(state) => {
		try {
			Swal.fire({
				title: "Proceed?",
				text: state === "owner" ? 'You’re requesting an account upgrade to list and manage properties.!' : 'You’re requesting an account upgrade to list and manage services.!',
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#283890",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, proceed!",
				cancelButtonText: "Close"
			}).then((result) => {
				if (result.isConfirmed) {
					try {
						changeAccount(state).then((res) => {
							if(res === true) {
								navigate('/onboarding');
							}
						})
					} catch (error) {
						console.log(error)
					}
				}
			});	
		} catch (error) {
			console.log(error)
		}
	}

	const changeAccount = async(state) => {
		try {
			const formData = new FormData();
        	formData.append("accountType", state);
			const response = await switchAccount(formData, token);
			if(response?.data?.success === true) {
				dispatch(setChangeUser(response?.data))
				return true;
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		const handleOutSideClick = (event) => {
			if (!ref.current?.contains(event.target)) {
				setIsMenuOpen(false)
				setIsDropdownOpen(false)
			}
		};

		window.addEventListener("mousedown", handleOutSideClick);
		return () => {
			window.removeEventListener("mousedown", handleOutSideClick);
			window.scrollTo(0, 0);
		};
	}, [ref]);

	console.log(token)

	return (
		<>
			{/* Mobile Navbar */}
			<nav className='fixed bottom-0 w-full font-josefin-sans bg-bg-color border-t border-gray-200 z-50 lg:hidden sm:flex sm:p-2'>
				<div className="bottom-navbar text-center sm-show-item bg-white p-6" style={{ height: '70px' }}>
					<div className="relative bottom-2 flex justify-between">
						<Link onClick={sideBarClicked} to='/' className="flex justify-center flex-col items-center group-icon-text">
							<svg width="20" height="19" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.98453 0.000322892C9.89708 0.00331529 9.81281 0.0335423 9.74365 0.0867186L0.160552 7.50625C0.0733578 7.57371 0.0167417 7.67277 0.00315917 7.78164C-0.0104234 7.89052 0.0201401 8.00029 0.088126 8.0868C0.156112 8.17332 0.255951 8.22949 0.365681 8.24297C0.47541 8.25644 0.58604 8.22612 0.673235 8.15866L1.25021 7.71215V18.5811C1.25022 18.6907 1.29412 18.7958 1.37225 18.8734C1.45039 18.9509 1.55636 18.9945 1.66686 18.9945H7.43007C7.47506 19.0018 7.52097 19.0018 7.56597 18.9945H12.4299C12.4749 19.0018 12.5208 19.0018 12.5658 18.9945H18.3331C18.4436 18.9945 18.5496 18.9509 18.6277 18.8734C18.7059 18.7958 18.7498 18.6907 18.7498 18.5811V7.71215L19.3267 8.15866C19.3699 8.19207 19.4193 8.21671 19.4721 8.23118C19.5248 8.24565 19.58 8.24966 19.6343 8.24299C19.6886 8.23632 19.7411 8.21909 19.7887 8.1923C19.8364 8.1655 19.8782 8.12966 19.9119 8.08682C19.9455 8.04398 19.9704 7.99498 19.9849 7.94262C19.9995 7.89026 20.0036 7.83556 19.9968 7.78165C19.9901 7.72774 19.9727 7.67567 19.9457 7.62842C19.9187 7.58117 19.8826 7.53965 19.8394 7.50625L16.6665 5.05003V2.04475H14.1666V3.1138L10.2563 0.0867186C10.1788 0.0270723 10.0826 -0.00352205 9.98453 0.000322892ZM9.99999 0.937757L17.9165 7.06701V18.1677H12.9166V10.3129H7.0834V18.1677H2.08352V7.06701L9.99999 0.937757ZM14.9999 2.87157H15.8332V4.40489L14.9999 3.75894V2.87157ZM7.91671 11.1397H12.0833V18.1677H7.91671V11.1397Z" fill="#283890"></path>
                            </svg>
                            <p className="text-xs mt-1 text-oshelter-blue">Home</p>
                            <hr />
                        </Link>
                        <Link to='properties/sale' className="flex justify-center flex-col items-center">
                            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 0C0.8972 0 0 0.85234 0 1.9V10.26C0 11.3077 0.8972 12.16 2 12.16H13.7656H15.2C14.9008 11.997 14.5799 11.7359 14.3195 11.4H2C1.3384 11.4 0.8 10.8885 0.8 10.26V1.9C0.8 1.27148 1.3384 0.76 2 0.76H16.4C17.0616 0.76 17.6 1.27148 17.6 1.9V6.46H18.4V1.9C18.4 0.85234 17.5028 0 16.4 0H2ZM3.2 2.66C2.76277 2.66 2.4 3.00464 2.4 3.42V4.56C2.4 4.97536 2.76277 5.32 3.2 5.32H4.8C5.23723 5.32 5.6 4.97536 5.6 4.56V3.42C5.6 3.00464 5.23723 2.66 4.8 2.66H3.2ZM3.2 3.42H4.8V4.56H3.2V3.42ZM10.4 3.42C10.347 3.41929 10.2944 3.42859 10.2452 3.44737C10.196 3.46615 10.1512 3.49402 10.1135 3.52938C10.0757 3.56474 10.0458 3.60687 10.0253 3.65333C10.0048 3.69978 9.9943 3.74964 9.9943 3.8C9.9943 3.85036 10.0048 3.90022 10.0253 3.94667C10.0458 3.99313 10.0757 4.03526 10.1135 4.07062C10.1512 4.10598 10.196 4.13385 10.2452 4.15263C10.2944 4.17141 10.347 4.18071 10.4 4.18H15.6C15.653 4.18071 15.7056 4.17141 15.7548 4.15263C15.804 4.13385 15.8488 4.10598 15.8865 4.07062C15.9243 4.03526 15.9542 3.99313 15.9747 3.94667C15.9952 3.90022 16.0057 3.85036 16.0057 3.8C16.0057 3.74964 15.9952 3.69978 15.9747 3.65333C15.9542 3.60687 15.9243 3.56474 15.8865 3.52938C15.8488 3.49402 15.804 3.46615 15.7548 3.44737C15.7056 3.42859 15.653 3.41929 15.6 3.42H10.4ZM2.8 7.22C2.747 7.21929 2.69437 7.22859 2.64518 7.24737C2.596 7.26615 2.55123 7.29402 2.51348 7.32938C2.47573 7.36474 2.44576 7.40687 2.4253 7.45333C2.40484 7.49978 2.3943 7.54964 2.3943 7.6C2.3943 7.65036 2.40484 7.70022 2.4253 7.74667C2.44576 7.79313 2.47573 7.83526 2.51348 7.87062C2.55123 7.90598 2.596 7.93385 2.64518 7.95263C2.69437 7.97141 2.747 7.98071 2.8 7.98H4.8C4.853 7.98071 4.90563 7.97141 4.95482 7.95263C5.004 7.93385 5.04877 7.90598 5.08652 7.87062C5.12427 7.83526 5.15424 7.79313 5.1747 7.74667C5.19516 7.70022 5.2057 7.65036 5.2057 7.6C5.2057 7.54964 5.19516 7.49978 5.1747 7.45333C5.15424 7.40687 5.12427 7.36474 5.08652 7.32938C5.04877 7.29402 5.004 7.26615 4.95482 7.24737C4.90563 7.22859 4.853 7.21929 4.8 7.22H2.8ZM6.4 7.22C6.347 7.21929 6.29437 7.22859 6.24518 7.24737C6.196 7.26615 6.15123 7.29402 6.11348 7.32938C6.07573 7.36474 6.04576 7.40687 6.0253 7.45333C6.00484 7.49978 5.9943 7.54964 5.9943 7.6C5.9943 7.65036 6.00484 7.70022 6.0253 7.74667C6.04576 7.79313 6.07573 7.83526 6.11348 7.87062C6.15123 7.90598 6.196 7.93385 6.24518 7.95263C6.29437 7.97141 6.347 7.98071 6.4 7.98H8.4C8.45301 7.98071 8.50563 7.97141 8.55482 7.95263C8.604 7.93385 8.64877 7.90598 8.68652 7.87062C8.72427 7.83526 8.75424 7.79313 8.7747 7.74667C8.79516 7.70022 8.8057 7.65036 8.8057 7.6C8.8057 7.54964 8.79516 7.49978 8.7747 7.45333C8.75424 7.40687 8.72427 7.36474 8.68652 7.32938C8.64877 7.29402 8.604 7.26615 8.55482 7.24737C8.50563 7.22859 8.45301 7.21929 8.4 7.22H6.4ZM10 7.22C9.947 7.21929 9.89437 7.22859 9.84518 7.24737C9.796 7.26615 9.75123 7.29402 9.71348 7.32938C9.67573 7.36474 9.64576 7.40687 9.6253 7.45333C9.60484 7.49978 9.5943 7.54964 9.5943 7.6C9.5943 7.65036 9.60484 7.70022 9.6253 7.74667C9.64576 7.79313 9.67573 7.83526 9.71348 7.87062C9.75123 7.90598 9.796 7.93385 9.84518 7.95263C9.89437 7.97141 9.947 7.98071 10 7.98H12C12.053 7.98071 12.1056 7.97141 12.1548 7.95263C12.204 7.93385 12.2488 7.90598 12.2865 7.87062C12.3243 7.83526 12.3542 7.79313 12.3747 7.74667C12.3952 7.70022 12.4057 7.65036 12.4057 7.6C12.4057 7.54964 12.3952 7.49978 12.3747 7.45333C12.3542 7.40687 12.3243 7.36474 12.2865 7.32938C12.2488 7.29402 12.204 7.26615 12.1548 7.24737C12.1056 7.22859 12.053 7.21929 12 7.22H10ZM13.6 7.22C13.3792 7.22 13.2 7.38986 13.2 7.6C13.2 7.81014 13.3792 7.98 13.6 7.98H14.7359C15.0047 7.75998 15.3028 7.59114 15.6 7.47828V7.22H13.6ZM16.4 7.22V8.0557C15.76 8.1317 14.6 8.6637 14.6 9.9557C14.6 12.3877 18.3203 11.1339 18.3203 12.9579C18.3203 13.5659 18.04 14.06 16.8 14.06C15.56 14.06 15.2 13.414 15.2 12.92H14.4C14.52 14.554 15.72 14.7439 16.4 14.8579V15.58H17.2V14.8579C17.8 14.8199 19.2 14.4021 19.2 12.8821C19.2 11.6281 18.1197 11.2859 17.0797 11.0579C16.2397 10.8679 15.4797 10.678 15.4797 9.88C15.4797 9.538 15.6398 8.77785 16.8398 8.77785C17.6798 8.77785 18.08 9.272 18.2 9.88H19C18.76 9.044 18.36 8.2843 17.2 8.0943V7.22H16.4ZM2.8 9.12C2.747 9.11929 2.69437 9.12859 2.64518 9.14737C2.596 9.16615 2.55123 9.19402 2.51348 9.22938C2.47573 9.26474 2.44576 9.30687 2.4253 9.35332C2.40484 9.39978 2.3943 9.44964 2.3943 9.5C2.3943 9.55036 2.40484 9.60022 2.4253 9.64668C2.44576 9.69313 2.47573 9.73526 2.51348 9.77062C2.55123 9.80598 2.596 9.83385 2.64518 9.85263C2.69437 9.87141 2.747 9.88071 2.8 9.88H8C8.053 9.88071 8.10563 9.87141 8.15482 9.85263C8.204 9.83385 8.24877 9.80598 8.28652 9.77062C8.32427 9.73526 8.35424 9.69313 8.3747 9.64668C8.39516 9.60022 8.4057 9.55036 8.4057 9.5C8.4057 9.44964 8.39516 9.39978 8.3747 9.35332C8.35424 9.30687 8.32427 9.26474 8.28652 9.22938C8.24877 9.19402 8.204 9.16615 8.15482 9.14737C8.10563 9.12859 8.053 9.11929 8 9.12H2.8Z" fill="black">
                                </path>
                            </svg>
                            <p className="text-xs mt-1 text-black-100">Sale</p>
                            <hr />
                        </Link>
                        <Link to='properties/rent' className="flex justify-center flex-col items-center">
                            <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.90476 0V1.65217H0V19H20V4.95652H12.381V1.65217H10.4762V0H1.90476ZM2.85714 0.826087H9.52381V2.47826H11.4286V18.1739H7.14286V15.2826H5.2381V18.1739H0.952381V2.47826H2.85714V0.826087ZM2.85714 3.30435V4.13043H3.80952V3.30435H2.85714ZM4.7619 3.30435V4.13043H5.71429V3.30435H4.7619ZM6.66667 3.30435V4.13043H7.61905V3.30435H6.66667ZM8.57143 3.30435V4.13043H9.52381V3.30435H8.57143ZM2.85714 5.36957V7.02174H3.80952V5.36957H2.85714ZM4.7619 5.36957V7.02174H5.71429V5.36957H4.7619ZM6.66667 5.36957V7.02174H7.61905V5.36957H6.66667ZM8.57143 5.36957V7.02174H9.52381V5.36957H8.57143ZM12.381 5.78261H19.0476V18.1739H12.381V5.78261ZM13.3333 6.6087V7.43478H14.2857V6.6087H13.3333ZM15.2381 6.6087V7.43478H16.1905V6.6087H15.2381ZM17.1429 6.6087V7.43478H18.0952V6.6087H17.1429ZM2.85714 7.84783V9.5H3.80952V7.84783H2.85714ZM4.7619 7.84783V9.5H5.71429V7.84783H4.7619ZM6.66667 7.84783V9.5H7.61905V7.84783H6.66667ZM8.57143 7.84783V9.5H9.52381V7.84783H8.57143ZM13.3333 8.26087V9.08696H14.2857V8.26087H13.3333ZM15.2381 8.26087V9.08696H16.1905V8.26087H15.2381ZM17.1429 8.26087V9.08696H18.0952V8.26087H17.1429ZM13.3333 9.91304V10.7391H14.2857V9.91304H13.3333ZM15.2381 9.91304V10.7391H16.1905V9.91304H15.2381ZM17.1429 9.91304V10.7391H18.0952V9.91304H17.1429ZM2.85714 10.3261V11.9783H3.80952V10.3261H2.85714ZM4.7619 10.3261V11.9783H5.71429V10.3261H4.7619ZM6.66667 10.3261V11.9783H7.61905V10.3261H6.66667ZM8.57143 10.3261V11.9783H9.52381V10.3261H8.57143ZM13.3333 11.5652V12.3913H14.2857V11.5652H13.3333ZM15.2381 11.5652V12.3913H16.1905V11.5652H15.2381ZM17.1429 11.5652V12.3913H18.0952V11.5652H17.1429ZM2.85714 12.8043V14.4565H3.80952V12.8043H2.85714ZM4.7619 12.8043V14.4565H5.71429V12.8043H4.7619ZM6.66667 12.8043V14.4565H7.61905V12.8043H6.66667ZM8.57143 12.8043V14.4565H9.52381V12.8043H8.57143ZM13.3333 13.2174V14.0435H14.2857V13.2174H13.3333ZM15.2381 13.2174V14.0435H16.1905V13.2174H15.2381ZM17.1429 13.2174V14.0435H18.0952V13.2174H17.1429ZM13.3333 14.8696V15.6957H14.2857V14.8696H13.3333ZM15.2381 14.8696V15.6957H16.1905V14.8696H15.2381ZM17.1429 14.8696V15.6957H18.0952V14.8696H17.1429ZM2.85714 15.2826V17.3478H3.80952V15.2826H2.85714ZM8.57143 15.2826V17.3478H9.52381V15.2826H8.57143ZM13.3333 16.5217V17.3478H14.2857V16.5217H13.3333ZM15.2381 16.5217V17.3478H16.1905V16.5217H15.2381ZM17.1429 16.5217V17.3478H18.0952V16.5217H17.1429Z" fill="black"></path>
                            </svg>
                            <p className="text-xs mt-1 text-black-100">Rent</p>
                            <hr />
                        </Link>
                        <Link to='properties/shortstay' className="flex justify-center flex-col items-center">
                            <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 0C1.34219 0 0.8 0.515078 0.8 1.14V6.91125C0.801562 6.935 0.80625 6.95875 0.8125 6.9825C0.8125 6.98695 0.8125 6.98992 0.8125 6.99437C0.632812 7.26305 0.485938 7.54953 0.375 7.86125C0.126562 8.55742 0.0203125 9.35602 0 10.26V10.64C0 10.6519 0 10.6637 0 10.6756V15.2H2.8V13.68C2.8 13.3638 2.88125 13.1991 2.9875 13.0981C3.09375 12.9972 3.26719 12.92 3.6 12.92H16.4C16.7328 12.92 16.9063 12.9972 17.0125 13.0981C17.1188 13.1991 17.2 13.3638 17.2 13.68V15.2H20V10.6994C20.0016 10.6801 20.0016 10.6593 20 10.64C20 10.5094 20.0031 10.3862 20 10.26C19.9797 9.35602 19.8734 8.55742 19.625 7.86125C19.5141 7.5525 19.3656 7.27195 19.1875 7.00625C19.1953 6.97508 19.2 6.94391 19.2 6.91125V1.14C19.2 0.515078 18.6578 0 18 0H2ZM2 0.76H18C18.225 0.76 18.4 0.92625 18.4 1.14V6.13937C18.3016 6.0607 18.1969 5.985 18.0875 5.91375C17.8203 5.73859 17.5297 5.57531 17.2 5.43875V3.8C17.2 3.53281 17.0156 3.325 16.8125 3.19438C16.6094 3.06375 16.3609 2.9732 16.05 2.8975C15.4281 2.74609 14.5547 2.66 13.4 2.66C12.2453 2.66 11.3719 2.74609 10.75 2.8975C10.4469 2.97172 10.2 3.05633 10 3.1825C9.8 3.05633 9.55313 2.97172 9.25 2.8975C8.62813 2.74609 7.75469 2.66 6.6 2.66C5.44531 2.66 4.57188 2.74609 3.95 2.8975C3.63906 2.9732 3.39063 3.06375 3.1875 3.19438C2.98438 3.325 2.8 3.53281 2.8 3.8V5.43875C2.47031 5.57531 2.17969 5.73859 1.9125 5.91375C1.80313 5.985 1.69844 6.0607 1.6 6.13937V1.14C1.6 0.92625 1.775 0.76 2 0.76ZM6.6 3.42C7.7125 3.42 8.5375 3.50906 9.05 3.63375C9.30625 3.69609 9.48281 3.7718 9.5625 3.82375C9.59531 3.84453 9.59688 3.8475 9.6 3.8475V4.56C6.97031 4.57633 5.02344 4.76336 3.6 5.1775V3.8475C3.60313 3.8475 3.60469 3.84453 3.6375 3.82375C3.71719 3.7718 3.89375 3.69609 4.15 3.63375C4.6625 3.50906 5.4875 3.42 6.6 3.42ZM13.4 3.42C14.5125 3.42 15.3375 3.50906 15.85 3.63375C16.1063 3.69609 16.2828 3.7718 16.3625 3.82375C16.3953 3.84453 16.3969 3.8475 16.4 3.8475V5.1775C14.9766 4.76336 13.0297 4.57633 10.4 4.56V3.8475C10.4031 3.8475 10.4047 3.84453 10.4375 3.82375C10.5172 3.7718 10.6937 3.69609 10.95 3.63375C11.4625 3.50906 12.2875 3.42 13.4 3.42ZM9.925 5.32C9.96719 5.32594 10.0078 5.32594 10.05 5.32C10.0625 5.32 10.075 5.32 10.0875 5.32C14.0906 5.32594 16.4031 5.72375 17.6375 6.53125C18.2594 6.93797 18.6359 7.44266 18.875 8.11063C19.0828 8.6925 19.1672 9.40945 19.1875 10.26H0.8125C0.832812 9.40945 0.917188 8.6925 1.125 8.11063C1.36406 7.44266 1.74063 6.93797 2.3625 6.53125C3.59688 5.72227 5.91406 5.32445 9.925 5.32ZM0.8 11.02H19.2V14.44H18V13.68C18 13.2362 17.8812 12.8309 17.5875 12.5519C17.2937 12.2728 16.8672 12.16 16.4 12.16H3.6C3.13281 12.16 2.70625 12.2728 2.4125 12.5519C2.11875 12.8309 2 13.2362 2 13.68V14.44H0.8V11.02Z" fill="black"></path>
                            </svg>
                            <p className="text-xs mt-1 text-black-100">Short</p> 
                            <hr />
                        </Link>
                        <Link to='services' className="parent">
                            <div className="flex justify-center flex-col items-center">
                                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.0012 0C9.01223 0 8.12795 0.301715 7.47647 0.813179C6.93434 1.23752 6.55314 1.81836 6.43909 2.47826H1.2022C0.544467 2.47826 0.00234348 3.03813 0.00234348 3.71739V10.6617C-0.000781158 10.6875 -0.000781158 10.7133 0.00234348 10.7391V17.7609C0.00234348 18.4401 0.544467 19 1.2022 19H18.8001C19.4579 19 20 18.4401 20 17.7609V10.7004C20 10.6875 20 10.6746 20 10.6617V3.71739C20 3.03813 19.4579 2.47826 18.8001 2.47826H13.5633C13.4492 1.81836 13.068 1.23752 12.5259 0.813179C11.8744 0.301715 10.9901 0 10.0012 0ZM10.0012 0.826087C10.8339 0.826087 11.5463 1.08585 12.0384 1.47147C12.404 1.75866 12.6493 2.09749 12.7508 2.47826H7.25149C7.35304 2.09749 7.59833 1.75866 7.96391 1.47147C8.45604 1.08585 9.16846 0.826087 10.0012 0.826087ZM1.2022 3.30435H18.8001C19.0267 3.30435 19.2001 3.48344 19.2001 3.71739V10.6617C19.1985 10.6794 19.1985 10.6956 19.2001 10.7133V10.7391C19.2001 10.9731 19.0267 11.1522 18.8001 11.1522H12.0009C12.0009 10.4729 11.4588 9.91304 10.8011 9.91304H9.20127C8.54353 9.91304 8.00141 10.4729 8.00141 11.1522H1.2022C0.975667 11.1522 0.80225 10.9731 0.80225 10.7391C0.805375 10.7133 0.805375 10.6875 0.80225 10.6617V3.71739C0.80225 3.48344 0.975667 3.30435 1.2022 3.30435ZM9.20127 10.7391H10.8011C11.0276 10.7391 11.201 10.9182 11.201 11.1522V11.4878C11.201 11.5007 11.201 11.5136 11.201 11.5265V11.5652C11.1979 11.5959 11.1979 11.6249 11.201 11.6556V11.9783C11.201 12.2122 11.0276 12.3913 10.8011 12.3913H9.20127C8.97473 12.3913 8.80131 12.2122 8.80131 11.9783V11.6427C8.81225 11.5878 8.81225 11.5297 8.80131 11.4749V11.1522C8.80131 10.9182 8.97473 10.7391 9.20127 10.7391ZM0.80225 11.9008C0.928797 11.9476 1.06159 11.9783 1.2022 11.9783H8.00141C8.00141 12.6575 8.54353 13.2174 9.20127 13.2174H10.8011C11.4588 13.2174 12.0009 12.6575 12.0009 11.9783H18.8001C18.9407 11.9783 19.0735 11.9476 19.2001 11.9008V17.7609C19.2001 17.9948 19.0267 18.1739 18.8001 18.1739H1.2022C0.975667 18.1739 0.80225 17.9948 0.80225 17.7609V11.9008Z" fill="black"></path>
                                </svg>
                                <p className="text-xs mt-1 text-black-100">Services</p> 
                                <hr />
                            </div>
                        </Link>
                    </div>
                </div>
			</nav>

			{/* Desktop Navbar */}
			<nav className='bg-bg-color p-6 fixed w-full top-0 z-40 font-bold font-josefin-sans' style={{ background: '#283890' }} >
				<div className='container mx-auto flex justify-between items-center'>
					<div className='flex items-center'>
						{ key === "dashboard" || (w <= 789 || w <= 810) ?
							<>
								<Link to='/' className="text-white">
									<img
										src={logo}
										alt='Logo'
										className="h-12"
									/>
								</Link>
							</>
						:
							<Link to='/' className='text-white'>
								<img
									src={logo}
									alt='Logo'
									style={{ height: '90px', width: '250px' }}
								/>
							</Link>
						}
					</div>
					{/* Desktop Navigation */}
					<div className='hidden lg:flex flex-1 justify-center items-center space-x-10'>
						<Link
							to='/'
							className={`text-white ${
								location.pathname === '/' ? 'navbar-item' : ''
							}`} style={{ fontSize: '20px' }}>
							Home
						</Link>
						<Link
							to='/properties/rent'
							className={`text-white ${
								location.pathname === '/properties/rent'
									? 'navbar-item'
									: ''
							}`} style={{ fontSize: '20px' }}>
							For Rent
						</Link>
						<Link
							to='/properties/sale'
							className={`text-white ${
								location.pathname === '/properties/sale'
									? 'navbar-item'
									: ''
							}`} style={{ fontSize: '20px' }}>
							For Sale
						</Link>
						<Link
							to='/properties/shortstay'
							className={`text-white ${
								location.pathname === '/properties/shortstay'
									? 'navbar-item'
									: ''
							}`} style={{ fontSize: '20px' }}>
							Short Stay
						</Link>

						<Link
							to='/properties/events'
							className={`text-white ${
								location.pathname === '/properties/events'
									? 'navbar-item'
									: ''
							}`} style={{ fontSize: '20px' }}>
							Event Space
						</Link>

								
						<Link
							to='/services'
							className={`text-white ${
								location.pathname === '/services'
									? 'navbar-item'
									: ''
							}`} style={{ fontSize: '20px' }}>
							Services
						</Link>
					</div>
                    <div className='lg:flex items-center space-x-4'>
						<div className='relative flex items-center' ref={ref}>
							<button onClick={toggleDropdown} data-dropdown-toggle="dropdownDivider" className={`text-dark w-20 bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${!user ? `inline-flex xl:hidden lg:hidden` : 'inline-flex'} items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`} type="button"> 
								<span className='relative top-0.5 mr-1 right-3'>
									<FiAlignRight style={{ fontSize: '30px' }}/>
								</span>
								<img src={profile} alt="profile" aria-hidden="true" className="absolute right-3 object-cover w-7 h-7 rounded-full" />
							</button>
							{user ? (
								isDropdownOpen && (
									<>
										<div className="mt-10">
											<ul aria-label="submenu" className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700">
												<li className="flex cursor-pointer">
													<Link to="/dashboard" className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">
													<span>
														<svg ariaHidden="true" focusable="false" dataPrefix="fas" dataIcon="gauge" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-3 svg-inline--fa fa-gauge">
															<path fill="currentColor" d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3V88c0-13.3-10.7-24-24-24s-24 10.7-24 24V292.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" className=""></path>
														</svg>
													</span>
													<span>Dashboard</span>
													</Link>
												</li>
												{
													user.accountType === "serviceprovider" ? (
														<li className="flex">
															<a href="/users/bookings/approved-bookings" className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">
																<span>
																	<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="mr-3 svg-inline--fa fa-check">
																		<path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" className=""></path>
																	</svg>
																</span>
																<span>Incoming orders</span>
															</a>
														</li>
													) : user.accountType === "owner" ? (
														<>
															<li className="flex">
																<a href="/users/bookings/approved-bookings" className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">
																	<span>
																		<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="mr-3 svg-inline--fa fa-check">
																			<path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" className=""></path>
																		</svg>
																	</span>
																	<span>Approved Bookings</span>
																</a>
															</li>

															<li className="flex">
																<Link to="/dashboard/properties" className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">
																	<span>
																		<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="mr-3 svg-inline--fa fa-check">
																			<path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" className=""></path>
																		</svg>
																	</span>
																	<span>Listings</span>
																</Link>
															</li>
														</>
													): 
													("")
												}
												<li className="flex">
													<Link to="/dashboard/wishlists" className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">
														<span>
															<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-3 svg-inline--fa fa-heart">
																<path fill="currentColor" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" className=""></path>
															</svg>
														</span>
														<span>Wishlist</span>
													</Link>
												</li>
												{
													user.accountType === "visitor" ? (
														<>
															<hr className="" />
															<li className="flex">
																<a role="button" onClick={() => handleChangeAccount('owner') } className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">
																	<span>
																		<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="toggle-on" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="mr-3 svg-inline--fa fa-toggle-on">
																			<path fill="currentColor" d="M192 64C86 64 0 150 0 256S86 448 192 448H384c106 0 192-86 192-192s-86-192-192-192H192zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" className=""></path>
																		</svg>
																	</span>
																	<span>Become Property Owner</span>
																</a>
															</li>

															<hr className="" />
															<li className="flex">
																<a role="button" onClick={() => handleChangeAccount('serviceprovider') } className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">
																	<span>
																		<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="toggle-on" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="mr-3 svg-inline--fa fa-toggle-on">
																			<path fill="currentColor" d="M192 64C86 64 0 150 0 256S86 448 192 448H384c106 0 192-86 192-192s-86-192-192-192H192zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" className=""></path>
																		</svg>
																	</span>
																	<span>Become Service Provider</span>
																</a>
															</li>
														</>
													) : (
														<></>
													)
												}
												<hr className="" />
												<li className="flex">
													<Link onClick={handleLogout} to="/" className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">
													<span>
														<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-right-from-bracket" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-3 svg-inline--fa fa-arrow-right-from-bracket">
															<path fill="currentColor" d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" className=""></path>
														</svg>
													</span>
													<span>Log out</span>
													</Link>
												</li>
											</ul>
										</div>
									</>
								)
								) : (
									<>
										<div className="hidden lg:flex xl:flex">
											<Link
												to='/login'
												className='bg-sigin-color text-bg-color px-4 py-2 mr-3 rounded'>
												Login
											</Link>
											<Link
												to='/register'
												className='bg-signup-color text-white px-4 py-2 rounded'>
												Sign Up
											</Link>
										</div>
										{
											isDropdownOpen && (
												<div className="mt-10 lg:hidden xl:hidden">
													<ul aria-label="submenu" className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700">
														<li className="flex">
															<Link to="/login" className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">
																<span>
																	<svg data-v-50608ccc="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="right-to-bracket" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-3 svg-inline--fa fa-right-to-bracket">
																		<path data-v-50608ccc="" fill="currentColor" d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" className=""></path>
																	</svg>
																</span>
																<span>Login</span>
															</Link>
														</li>

														<li className="flex">
															<Link to="/register" className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200">
																<span>
																	<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="mr-3 svg-inline--fa fa-user-plus">
																		<path fill="currentColor" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" className=""></path>
																	</svg>
																</span>
																<span>Sign Up</span>
															</Link>
														</li>
													</ul>
												</div>
											)
										}
									</>
								)
							}
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;