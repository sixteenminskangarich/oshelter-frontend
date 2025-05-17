import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
export default function VerifyToken({ children }) {
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    return children
}