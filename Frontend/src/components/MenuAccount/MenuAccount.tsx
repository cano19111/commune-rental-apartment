import { signOut } from '@/contexts/auth/reduces';
import { useAuth } from '@/hooks';
import { path } from '@/utils/constant';
import icons from '@/utils/icons';
import { Button, Flex } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const MenuAccount: React.FC = () => {
    const { AiOutlineUser, LiaSignOutAltSolid, BsHouses, TbBrandBooking, IoCreateOutline } = icons;
    const { dispatch } = useAuth();

    return (
        <div className="max-w-[300px] min-w-[200px] w-full ">
            <Flex vertical gap={15}>
                <Flex align="center" gap={10}>
                    <AiOutlineUser size={20} />
                    <Link
                        className="font-main w-full text-left p-0 m-0 text-base"
                        to={`/${path.ACCOUNT_SETTINGS}/${path.PERSONAL_INFORMATION}`}
                    >
                        Manage Account
                    </Link>
                </Flex>
                <Flex align="center" gap={10}>
                    <IoCreateOutline size={20} />
                    <Link className="font-main w-full text-left p-0 m-0 text-base" to={`/${path.CREATE_APARTMENT}`}>
                        Create Apartment
                    </Link>
                </Flex>
                <Flex align="center" gap={10}>
                    <BsHouses size={20} />
                    <Link className="font-main w-full text-left p-0 m-0 text-base" to={`/${path.CREATE_APARTMENT}`}>
                        Manage Apartment
                    </Link>
                </Flex>
                <Flex align="center" gap={10}>
                    <TbBrandBooking size={20} />
                    <Link className="font-main w-full text-left p-0 m-0 text-base" to={`/${path.MANAGE_APARTMENT}`}>
                        Booking & trip
                    </Link>
                </Flex>

                <Flex align="center" gap={10}>
                    <LiaSignOutAltSolid size={20} />
                    <Button
                        className="font-main w-full border-none outline-none text-left p-0 m-0 h-fit text-base flex"
                        onClick={() => {
                            dispatch(signOut());
                        }}
                    >
                        Sign out
                    </Button>
                </Flex>
            </Flex>
        </div>
    );
};

export default MenuAccount;
