import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Input, Button, Radio, Select, Popconfirm } from 'antd'
import { Table, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { getInvoiceListAPI } from '@/apis/invoice'
import './index.scss'
import { useForm } from 'antd/lib/form/Form';
import { useCustomer } from '@/hooks/useCustomer'

const Invoice = () => {
    const { customerList } = useCustomer()
    const status = {
        '0': <Tag color='success'>Paid Full</Tag>,
        '1': <Tag color='error'>Receivable</Tag>,
    }
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            width: 150
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            width: 200,
            render: (data) => {
                const customer = customerList.find((state) => state.id === data);
                return customer ? customer.name : 'N/A';
            },
        },

        {
            title: 'Status',
            dataIndex: 'status',
            width: 150,
            render: data => status[data]
        },
        {
            title: 'Amount',
            dataIndex: 'amount'
        },
        {
            title: 'Paid',
            dataIndex: 'paid'
        },
        {
            title: 'Receivable',
            dataIndex: 'receivable'
        },


    ]

    const [form] = useForm();


    const [reqData, setReqData] = useState({
        status: '',
        page: 1,
        per_page: 6
    })

    const [list, setList] = useState([])
    const [count, setCount] = useState(0)
    useEffect(() => {
        async function getList() {
            const res = await getInvoiceListAPI(reqData)
            setList(res)
            setCount(res.length)
        }
        getList()
    }, [reqData])


    const onFinish = (formValue) => {
        console.log(formValue)
        setReqData({
            ...reqData,
            status: formValue.status
        })

    }

    const handleReset = () => {
        form.resetFields()
    }

    const onPageChange = (page) => {
        console.log(page)
        setReqData({
            ...reqData,
            page
        })
    }

    return (
        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>Dashboard</Link> },
                        { title: 'Invoice List' },
                    ]} />
                }
                style={{ marginBottom: 20 }}
            >
                <Form
                    form={form}
                    layout="inline"
                    initialValues={{ status: '' }}
                    onFinish={onFinish}
                >
                    <Form.Item label="Status" name="status" >
                        <Radio.Group>
                            <Radio value={''}>All</Radio>
                            <Radio value={'0'}>Paid Full</Radio>
                            <Radio value={'1'}>Receivable</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 24 }}>
                            Query
                        </Button>
                        <Button type="secondary" htmlType="submit" onClick={handleReset}>
                            Reset
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card title={`Found ${count} invoice(s)`}>
                <Table rowKey="id" columns={columns} dataSource={list} pagination={{
                    total: count,
                    pageSize: reqData.per_page,
                    onChange: onPageChange
                }} />
            </Card>
        </div>
    )
}

export default Invoice