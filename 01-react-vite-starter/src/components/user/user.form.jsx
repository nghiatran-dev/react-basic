import { Button } from "antd";
import PropTypes from 'prop-types';

const UserForm = (props) => {
    const { setIsModalOpen } = props;

    return (
        <div className="user-form" style={{margin: "20px 0"}}>
            <div style={{display: "flex", gap: "15px", flexDirection: "column"}}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <h3>List Users</h3>
                    <Button type="primary" onClick={() => setIsModalOpen(true)}>Create</Button>
                </div>
            </div>
        </div>
    );
};


UserForm.propTypes = {
    setIsModalOpen: PropTypes.func
};

export default UserForm;