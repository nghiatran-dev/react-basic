import { Link, useNavigate } from 'react-router-dom';
import { Menu, message } from 'antd';
import { HomeOutlined, UserAddOutlined, UserOutlined, BookOutlined, LoginOutlined, createFromIconfontCN } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { apiLogout } from '../../services/api.service';

const Header = (props) => {
    const { currentMenu, updateCurrentMenu } = props;
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
    });

    const handleLogout = async() => {
        const res = await apiLogout();
        if (res && res.data) {
            // show notification
            message.success(`Goodbye ${user.fullName}!`);

            // clear user info in context
            localStorage.removeItem('access_token');
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            })

            // reset current menu
            updateCurrentMenu('home');
            // navigate to home page
            navigate('/');
        }
    }

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
        ...(!user.id ? 
        [{
            label: <Link to={"/login"}>Login</Link>,
            key: 'login',
            icon: <LoginOutlined />
        }] :
        [{
            label: `Hi ${user.fullName}!`,
            key: 'setting',
            icon: <UserOutlined />,
            children: [
                {
                    label: <span onClick={() => handleLogout()}>Sign out</span>,
                    key: 'signout',
                    icon: <IconFont type="icon-tuichu" />,
                }
            ]
        }]),
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