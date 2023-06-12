import React, { useEffect } from 'react'
import { VStack } from '@chakra-ui/react'
import Base from '../components/Base'
import AddToTask from '../components/AddToTask'
import Points from '../components/Points'
import { useAuth } from '../context/UserProvider'

function Dashboard() {
  const { user ,fetchUserData} = useAuth()

    useEffect(() => {
        fetchUserData()
    }, [])

  return (
    <Base>
      <VStack p={4}>
        <AddToTask />
        <Points user={user} />
      </VStack>
    </Base>
  )
}

export default Dashboard
