import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, UserAddOutlined, BookOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const Header = (props) => {
    const { currentMenu, updateCurrentMenu } = props;
    const { user } = useContext(AuthContext);

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: 'users',
            icon: <UserAddOutlined />,
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: 'books',
            icon: <BookOutlined />,
        },
    ];

    const onClickMenu = (e) => {
        updateCurrentMenu(e.key);
    };

    return (
        <Menu 
            onClick={onClickMenu}
            selectedKeys={[currentMenu]}
            mode="horizontal"
            items={items}
        />
    )
}
Header.propTypes = {
    currentMenu: PropTypes.string.isRequired,
    updateCurrentMenu: PropTypes.func.isRequired,
};

export default Header;