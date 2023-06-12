import React from 'react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import Base from '../components/Base'
import Login from '../components/Login'
import Signup from '../components/Signup'

export const LandingPage = ({ tabNo }) => {
  return (
    <Base>
      <Tabs defaultIndex={tabNo} align="center" variant="enclosed">
        <TabList>
          <Tab _selected={{ color: 'white', bg: 'pink.500' }}>Login</Tab>
          <Tab _selected={{ color: 'white', bg: 'pink.500' }}>SignUp</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <Signup />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Base>
  )
}
