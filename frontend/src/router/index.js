import Layout from '@/pages/Layout'
import { createBrowserRouter } from 'react-router-dom'
import Home from '@/pages/Home'
import CustomerForm from '@/pages/CustomerForm'
import Customer from '@/pages/Customer'
import InvoiceForm from '@/pages/InvoiceForm'
import Invoice from '@/pages/Invoice'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },

      {
        path: 'customer-form',
        element: <CustomerForm />
      },
      {
        path: 'customers',
        element: <Customer />
      },
      {
        path: 'invoice-form',
        element: <InvoiceForm />
      },
      {
        path: 'invoices',
        element: <Invoice />
      }
    ]
  }
])

export default router