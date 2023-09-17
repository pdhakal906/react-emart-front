import React, { useState } from "react";

import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";


import {
  UserCircleIcon,
  ChevronDownIcon,
  LifebuoyIcon,
  PowerIcon,

} from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { clearAlls } from "../features/userInfo";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../features/constant";


const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },

  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

const adminMenuItems = [
  {
    label: "Admin Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Product List",
    icon: UserCircleIcon,
  },

  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];


const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const nav = useNavigate();
  const dispatch = useDispatch()
  const { userInfo } = useSelector((store) => store.userInfo)

  return (
    <Navbar className="p-2 px-7 bg-orange-500">
      <div className="text-white flex justify-between">
        <Typography
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          <NavLink className={'text-3xl font-bold'} to='/' replace> Emart</NavLink>
        </Typography>
        <div className="flex items-center space-x-5">
          <div className="space-x-5">


            <NavLink to='/user/cart'>Cart</NavLink>
            <NavLink to='/user/login'>Contact</NavLink>
            {userInfo === null && <NavLink to='/user/login'>Login</NavLink>}

          </div>



          {userInfo !== null && <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">

            <MenuHandler>
              <Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
              >
                <Avatar
                  variant="circular"
                  size="lg"
                  alt="profile_picture"
                  className="w-[50px] h-[50px]"
                  src={baseUrl + userInfo.profile_image}
                />
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                    }`}
                  color="white"
                />
              </Button>
            </MenuHandler>
            <MenuList className="p-1">
              {(userInfo.isAdmin === true ? adminMenuItems : profileMenuItems).map(({ label, icon }, key) => {
                const isLastItem = key === profileMenuItems.length - 1;

                return (
                  <MenuItem
                    key={label}
                    onClick={() => {
                      switch (label) {
                        case 'Sign Out':
                          dispatch(clearAlls());
                          nav('/', { replace: true });
                          closeMenu();

                          break;

                        case 'Product List':

                          // nav('/products/all');
                          closeMenu();
                          break;
                        case 'My Profile':
                          nav('/user/profile');
                          closeMenu();

                          break;
                        case 'Admin Profile':
                          // nav('/user/allDetail');
                          closeMenu();
                          break;
                        default:
                          closeMenu();
                      }


                    }}
                    className={`flex items-center gap-2 rounded ${isLastItem
                      ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                      : ""
                      }`}
                  >
                    {React.createElement(icon, {
                      className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                      strokeWidth: 2,
                    })}
                    <Typography
                      as="span"
                      variant="small"
                      className="font-normal"
                      color={isLastItem ? "red" : "inherit"}
                    >
                      {label}
                    </Typography>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
          }

        </div>





      </div>

    </Navbar>
  )
}

export default Header
