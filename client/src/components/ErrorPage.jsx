import {Link} from "react-router-dom"

// This page is shown when current components either do not exist or do not render properly
const ErrorPage = () => {
    return (
        <div>
            <h1>Oh no, this route does not exist!</h1>
            <Link to="/">
                You can go back to the home page by clicking here, though!
            </Link>
        </div>
    )
}

export default ErrorPage;