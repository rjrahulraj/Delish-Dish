import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  useToast,
  Tooltip,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import {storeContext } from '../../context/storeContext'
import { useContext } from 'react';
const admin_url=import.meta.env.VITE_ADMIN_URL;


const AvatarMenu = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const {userDetails,setToken, isAdmin}=useContext(storeContext )

  const handleRedirect=()=>{
    window.location.href = `${admin_url}`;
  }

  const handleLogout = () => {
    // Perform logout actions here
    toast({
      title: "Logged out successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate('/login'); // Redirect to login page after logout
    setToken("");
    localStorage.removeItem('token');
  };

  const handleOrders = () => {
    // Redirect to orders page
    navigate('/orders');
  };

  return (
    
  <Menu>
    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="ghost" p={0}>
      <Avatar size="sm" name={userDetails.name} src={userDetails.image} />
    </MenuButton>
    <MenuList sx={{
        minWidth: '120px',
        padding: '8px',    
      }}>
      <MenuItem onClick={handleOrders}>Orders</MenuItem>
      <MenuDivider />
      <MenuItem onClick={handleLogout}>Logout</MenuItem>

      {isAdmin && (
        <>
          <MenuDivider />
          <MenuItem onClick={handleRedirect}>Admin</MenuItem>
        </>
      )}
    </MenuList>
  </Menu>


  );
};

export default AvatarMenu;
