import { useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../components/context/auth.context";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";

const PrivateRoute = (props) => {
    const  { user } = useContext(AuthContext);
    if (user && user.id) {
        return (
            <>
                {props.children}
            </>
        );
    }

    return <Result
        status="403"
        title="Unauthorized"
        subTitle="You need to login to use this page."
        extra={
            <Button type="primary">
                <Link to="/login">Login</Link>
            </Button>
        }
    />;
};

PrivateRoute.propTypes = {
    children: PropTypes.node
};

export default PrivateRoute;