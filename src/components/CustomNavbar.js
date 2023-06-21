import React from 'react'
import {
    Avatar,
    IconButton,
    Menu,
    Stack,
    Flex,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Center,
    Heading,
    useColorMode
   } from '@chakra-ui/react'
import { FaSun, FaMoon, FaUser, FaHistory ,FaHome,FaQuestion} from 'react-icons/fa'
import{NavLink } from 'react-router-dom';
import { useAuth } from '../context/UserProvider'

// Navbar component
// This component is used to display the navbar on the top of the page
function CustomNavbar() {

    const { user, logOut,isCustomerAuthenticated } = useAuth()

    const {colorMode, toggleColorMode} = useColorMode();
    
  return (
    <>
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
            <Heading
                  fontWeight="extrabold"
                  size="2xl"
                  bgGradient="linear(to-r, orange.200,orange.300, orange.400)"
                  bgClip="text"
                  as= {NavLink}  
                  to={isCustomerAuthenticated() ? "/dashboard" : "/"}  
                >
                  LeetCode List
            </Heading>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={1}>


            <IconButton
                icon={<FaHome />}
                as= {NavLink}  
                to={isCustomerAuthenticated() ? "/dashboard" : "/"}
                isRound="true"
                size="lg"
                aria-label=" home"
                />

              <IconButton
                icon={colorMode === 'light' ?<FaSun />: <FaMoon/>}
                isRound="true"
                size="lg"
                aria-label="dark mode"
                onClick={toggleColorMode}
              />

            {isCustomerAuthenticated() && (
              <>
                <IconButton
                icon={<FaHistory />}
                as= {NavLink}  
                to={'/history'}
                isRound="true"
                size="lg"
                aria-label=" history"
                />

                <Menu>
                    <MenuButton
                      as={IconButton}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}
                      >
                <Avatar
                  size={'md'}
                  icon={<FaUser/>}
                  iconLabel='profile'
                  color={colorMode === 'light' ? 'gray': 'white'}
                  bg = {colorMode === 'light' ? 'gray.200': 'gray.700'}
                />

                  </MenuButton>
                <MenuList alignItems={'center'}>
                      <br />
                      <Center>
                      <IconButton
                        icon={<FaUser />}
                        isRound="true"
                        size="lg"
                        aria-label="profile"
                        as={NavLink} 
                        to={'/profile'}
                        />             
                    </Center>
                      <br />
                      <Center>
                        <p> {user?.username} </p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem as={NavLink}  to={'/profile'}>Edit Profile</MenuItem>
                      <MenuItem  onClick={logOut}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
              </>
            )}

            {!isCustomerAuthenticated() &&(
                  <>
                    <IconButton
                    icon={<FaQuestion />}
                    as= {NavLink}  
                    to={'/faq'}
                    isRound="true"
                    size="lg"
                    aria-label=" faq"
                    />
                  </>
            )}

                </Stack>
          </Flex>
        </Flex>
    </>
)
}

export default CustomNavbar