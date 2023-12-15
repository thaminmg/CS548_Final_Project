import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Space,
    Select,
    DatePicker,
    message
} from 'antd'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import { v4 as uuidv4 } from 'uuid';

import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { createCustomerAPI, getCustomerById, updateCustomerAPI } from '@/apis/customer'
import { states } from '@/assets/constants'
import moment from 'moment'

const { Option } = Select

const CustomerForm = () => {
    const [gender, setGenderType] = useState('2')
    const onTypeChange = (e) => {
        setGenderType(e.target.value)
    }

    const [dob, setDob] = useState(Date.now())
    const onChange = (date, dateString) => {
        setDob(dateString)
    };

    const onFinish = async (formValue) => {
        try {
            var id = customerId ? customerId : uuidv4()
            const { name, email, phone, address, zip, state } = formValue
            const reqData = {
                id,
                name,
                gender,
                dob,
                email,
                phone,
                address,
                zip,
                state
            }

            if (customerId) {
                await updateCustomerAPI({ ...reqData, id: customerId })
                message.success('Customer updated successfully!');
            } else {
                await createCustomerAPI(reqData)
                message.success('Customer created successfully!');
            }
            form.resetFields();

        } catch (error) {
            message.error('An error occurred. Please try again.');
        }
    }

    const [searchParams] = useSearchParams()
    const customerId = searchParams.get('id')
    const [form] = Form.useForm()
    useEffect(() => {
        async function getCustomerDetail() {
            const res = await getCustomerById(customerId)

            if (!res) {
                alert('not found')
                return
            }
            setDob(res.dob)
            form.setFieldsValue({
                ...res,
                dob: moment(dob),
            })

        }
        if (customerId) {
            getCustomerDetail()
        }
    }, [customerId, form])

    return (
        <div className="create-customer">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>Dashboard</Link> },
                        { title: `${customerId ? 'Edit' : 'Add'} Customer` },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }}
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Mandatory' }]}
                    >
                        <Input placeholder="Please add customer's name" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="Gender" name="gender">
                        <Radio.Group onChange={onTypeChange}>
                            <Radio value={'1'}>Male</Radio>
                            <Radio value={'0'}>Female</Radio>
                            <Radio value={'2'}>Others</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="Date of Birth"
                        name="dob"
                        rules={[{ required: false, message: '' }]}
                    >
                        <Space direction="vertical">
                            <DatePicker onChange={onChange} />
                        </Space>
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Mandatory' }]}
                    >
                        <Input placeholder="Please add customer's email" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Mandatory' }]}
                    >
                        <Input placeholder="Please add customer's phone" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                    >
                        <Input placeholder="Please add customer's address" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="Zip"
                        name="zip"
                        rules={[{ required: true, message: 'Mandatory' }]}
                    >
                        <Input placeholder="Please add customer's zip" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="State"
                        name="state"
                        rules={[{ required: true, message: 'Mandatory' }]}
                    >
                        <Select placeholder="Please select one state" style={{ width: 400 }}>
                            {states.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">

                                {`${customerId ? 'Update' : 'Submit'}`}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default CustomerForm