import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Input, Button, Radio, Select, Popconfirm } from 'antd'
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { deleteCustomerAPI, getCustomerListAPI } from '@/apis/customer'
import { states } from '@/assets/constants'
import './index.scss'
import { useForm } from 'antd/lib/form/Form';

const { Option } = Select

const Customer = () => {
    const navigate = useNavigate()

    const genders = {
        1: <Tag color='success'>Male</Tag>,
        0: <Tag color='error'>Female</Tag>,
        2: <Tag color='warning'>Others</Tag>,
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: 150
        },
        {
            title: 'DOB',
            dataIndex: 'dob',
            width: 120
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            render: data => genders[data]
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Phone',
            dataIndex: 'phone'
        },
        {
            title: 'Address',
            dataIndex: 'address'
        },
        {
            title: 'ZIP',
            dataIndex: 'zip'
        },
        {
            title: 'State',
            dataIndex: 'state',
            render: (data) => {
                const stateObject = states.find((state) => state.id === data);
                return stateObject ? stateObject.name : 'N/A';
            },
        },
        {
            title: 'Actions',
            render: data => {

                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/customer-form?id=${data.id}`)} />
                        <Popconfirm
                            title="Delete"
                            description="Are you sure?"
                            onConfirm={() => onConfirm(data)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]

    const [form] = useForm();
    const [reqData, setReqData] = useState({
        gender: '',
        state: '',
        name: '',
        page: 1,
        per_page: 6
    })

    const [list, setList] = useState([])
    const [count, setCount] = useState(0)
    useEffect(() => {
        async function getList() {
            const res = await getCustomerListAPI(reqData)
            setList(res)
            setCount(res.length)
        }
        getList()
    }, [reqData])


    const onFinish = (formValue) => {
        console.log(formValue)
        setReqData({
            ...reqData,
            name: formValue.name,
            gender: formValue.gender,
            state: formValue.state
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

    const onConfirm = async (data) => {
        alert(data.id)
        await deleteCustomerAPI(data.id)
        setReqData({
            ...reqData
        })
    }

    return (
        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>Dashboard</Link> },
                        { title: 'Customer List' },
                    ]} />
                }
                style={{ marginBottom: 20 }}
            >
                <Form
                    form={form}
                    layout="inline"
                    initialValues={{ gender: '' }}
                    onFinish={onFinish}
                >
                    <Form.Item label="Gender" name="gender" >
                        <Radio.Group>
                            <Radio value={''}>All</Radio>
                            <Radio value={1}>Male</Radio>
                            <Radio value={0}>Female</Radio>
                            <Radio value={2}>Others</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Name" name="name" >
                        <Input
                            placeholder="Name Contains"
                            style={{ width: 180 }}
                        />
                    </Form.Item>
                    <Form.Item label="States" name="state" >
                        <Select
                            placeholder="Please select one"
                            style={{ width: 180 }}
                        >
                            {states.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
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
            <Card title={`Found ${count} customer(s)`}>
                <Table rowKey="id" columns={columns} dataSource={list} pagination={{
                    total: count,
                    pageSize: reqData.per_page,
                    onChange: onPageChange
                }} />
            </Card>
        </div>
    )
}

export default Customer