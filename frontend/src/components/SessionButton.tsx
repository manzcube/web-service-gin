// Lib
import { useNavigate, Link } from 'react-router-dom'
// Hooks
import { useAppDispatch, useAppSelector } from '../app/hooks'
// Reducers
import { closeSession, selectUser } from '../features/auth/userSlice'


const SessionButton = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user = useAppSelector(selectUser)

    // Sign Out function
    const onSignOut = () => {
        dispatch(closeSession())
        navigate("/login")
    }

    return !user ? (
        <Link className="button-secondary" to="/login">Sign In</Link>
    ):(
        <button 
            type="button" 
            className="button-secondary" 
            onClick={onSignOut}
        >
            Sign Out
        </button>
    )
}

export default SessionButton