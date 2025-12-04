import { Drawer, Flex, Avatar } from 'antd';
import PropTypes from 'prop-types';

const UserDetail = (props) => {
    const { isShowDetailUser, setIsShowDetailUser, detailUser, setDetailUser } = props;

    const clearUserDetail = () => {
        setIsShowDetailUser(false);
        setDetailUser(null);
    }

    const DescriptionItem = ({ title, content }) => (
        <Flex direction="column" gap={10}>
            <b className="site-description-item-profile-p-label">{title}:</b>
            {content}
        </Flex>
    );

    DescriptionItem.propTypes = {
        title: PropTypes.string.isRequired,
        content: PropTypes.node
    };
    

    return (
        <Drawer
            size='large'
            title="User detail"
            closable={{ 'aria-label': 'Close Button' }}
            onClose={() => clearUserDetail()}
            open={isShowDetailUser}
        >
            {
                detailUser ?
                <Flex horizontal align='center' gap={20}>
                    <Avatar
                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 200 }}
                        icon={
                            <img src={`${import.meta.env.VITE_API_URL}/images/avatar/${detailUser.avatar}`} alt="avatar" />
                        }
                    />
                    <Flex vertical gap={20}>
                        <DescriptionItem title="ID" content={detailUser._id} />
                        <DescriptionItem title="Full name" content={detailUser.fullName} />
                        <DescriptionItem title="Email" content={detailUser.email} />
                        <DescriptionItem title="Phone number" content={detailUser.phone} />
                        <DescriptionItem title="Role" content={detailUser.role} />
                    </Flex>
                </Flex>
                :
                <Flex justify="center">No data</Flex>
            }
            
        </Drawer>
    );
}

UserDetail.propTypes = {
    detailUser: PropTypes.object,
    isShowDetailUser: PropTypes.bool,
    setDetailUser: PropTypes.func,
    setIsShowDetailUser: PropTypes.func,
};

export default UserDetail;