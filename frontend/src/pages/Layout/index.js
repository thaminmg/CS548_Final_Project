import { Layout, Menu } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const { Header, Sider } = Layout

const items = [
  {
    label: 'Dashboard',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: 'Customers',
    key: '/customers',
    icon: <DiffOutlined />,
  },
  {
    label: 'Customer Form',
    key: '/customer-form',
    icon: <EditOutlined />,
  },
  {
    label: 'Invoices',
    key: '/invoices',
    icon: <DiffOutlined />,
  },
  {
    label: 'Invoice Form',
    key: '/invoice-form',
    icon: <EditOutlined />,
  },
]

const GeekLayout = () => {

  const navigate = useNavigate()

  const onMenuClick = (route) => {
    const path = route.key
    navigate(path)
  }

  const location = useLocation()
  const selectedkey = location.pathname

  return (
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Header className="header">
          <div className="head">
            <h2>Simple CRM</h2>
          </div>
        </Header>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={selectedkey}
          onClick={onMenuClick}
          items={items}
          style={{ height: '100%', borderRight: 0 }}></Menu>
      </Sider>
      <Layout className="layout-content" style={{ padding: 20 }}>
        <Outlet />
      </Layout>
    </Layout>
  )
}
export default GeekLayout