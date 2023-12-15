import BarChart from "./components/BarChart"
import { getInvoiceListAPI } from '@/apis/invoice'
import React, { useState, useEffect } from 'react';
import './index.scss'
import { useCustomer } from "@/hooks/useCustomer";

const Home = () => {
  const [invoices, setInvoiceData] = useState([]);
  const { customerList } = useCustomer()

  useEffect(() => {
    async function getInvoiceList() {
      const res = await getInvoiceListAPI({})
      setInvoiceData(res)
    }
    getInvoiceList()
  }, [])

  const calculateTotalAmountSpent = () => {
    const totalAmountSpentByCustomer = {}

    invoices.forEach((invoice) => {
      const { customer, amount } = invoice
      totalAmountSpentByCustomer[customer] = (totalAmountSpentByCustomer[customer] || 0) + Number(amount);
    })
    const topCustomers = Object.keys(totalAmountSpentByCustomer)
      .map((customer) => {
        const matchedCustomer = customerList.find(e => e.id === customer)
        return ({
          customer: matchedCustomer ? matchedCustomer.name : '',
          amount: totalAmountSpentByCustomer[customer],
        });
      })
      .sort((a, b) => b.amount - a.amount)

    return topCustomers.slice(0, 5)
  }

  const calculateTotalReceivableAmount = () => {
    const totalReceivableAmountByCustomer = {}

    invoices.forEach((invoice) => {
      const { customer, receivable } = invoice
      totalReceivableAmountByCustomer[customer] = (totalReceivableAmountByCustomer[customer] || 0) + Number(receivable);
    })
    const topDebtors = Object.keys(totalReceivableAmountByCustomer)
      .map((customer) => {
        const matchedCustomer = customerList.find(e => e.id === customer)
        return ({
          customer: matchedCustomer ? matchedCustomer.name : '',
          amount: totalReceivableAmountByCustomer[customer],
        });
      })
      .sort((a, b) => b.amount - a.amount)
    return topDebtors.slice(0, 5)
  }

  const top5CustomersData = calculateTotalAmountSpent()
  const top5DebtorsData = calculateTotalReceivableAmount()


  return (
    <div className="charts">
      <BarChart title={'Top 5 Customers'} data={top5CustomersData} />
      <BarChart title={'Top 5 Debtors'} data={top5DebtorsData} />
    </div>
  )
}

export default Home