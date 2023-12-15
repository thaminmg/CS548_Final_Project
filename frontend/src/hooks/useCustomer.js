import { useState, useEffect } from 'react'
import { getCustomerAPI } from '@/apis/customer'

function useCustomer() {

  const [customerList, setCustomerList] = useState([])

  useEffect(() => {
    const getCustomerList = async () => {
      const res = await getCustomerAPI()
      setCustomerList(res)
    }
    getCustomerList()
  }, [])
  return {
    customerList
  }
}

export { useCustomer }