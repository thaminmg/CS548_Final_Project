import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Input,
    Space,
    Select,
    message
} from 'antd'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import { v4 as uuidv4 } from 'uuid';

import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { createInvoiceAPI, getInvoiceById, updateInvoiceAPI } from '@/apis/invoice'
import { useCustomer } from '@/hooks/useCustomer';
const { Option } = Select

const InvoiceForm = () => {
    const { customerList } = useCustomer()

    const [searchParams] = useSearchParams()
    const invoiceId = searchParams.get('id')
    const [form] = Form.useForm()

    const onFinish = async (formValue) => {
        try {
            var id = uuidv4()
            var date = Date.now().toString()
            var status = receivable == '0' ? '0' : '1'
            const { customer, amount, paid } = formValue
            const reqData = {
                id,
                customer,
                amount,
                paid,
                receivable,
                status,
                date
            }

            if (invoiceId) {
                await updateInvoiceAPI({ ...reqData, id: invoiceId })
                message.success('Invoice updated successfully!');
            } else {
                await createInvoiceAPI(reqData)
                message.success('Invoice created successfully!');
            }
            form.resetFields();

        } catch (error) {
            message.error('An error occurred. Please try again.');
        }
    }

    useEffect(() => {
        async function getInvoiceDetail() {
            const res = await getInvoiceById(invoiceId)
            if (res) {
                alert(res.data)
                form.setFieldsValue({
                    ...res,
                });
            } else {
                alert('not found');
            }
        }
        if (invoiceId) {
            getInvoiceDetail()
        }
    }, [invoiceId, form])

    const [receivable, setReceivableAmount] = useState('0');

    const onFormValuesChange = (changedValues, allValues) => {
        const amount = allValues.amount || 0;
        const paid = allValues.paid || 0;
        const newReceivableAmount = amount - paid;
        setReceivableAmount(newReceivableAmount + "");
    };

    return (
        <div className="create-invoice">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>Dashboard</Link> },
                        { title: `${invoiceId ? 'Edit' : 'Add'} Invoice` },
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
                    onValuesChange={onFormValuesChange}
                >
                    <Form.Item
                        label="Customer"
                        name="customer"
                        rules={[{ required: true, message: 'Please Select customer' }]}
                    >
                        <Select placeholder="Customer Name" style={{ width: 400 }}>
                            {customerList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Amount"
                        name="amount"
                        rules={[{ required: true, message: 'Mandatory' }]}
                        min={0}
                        step={0.01}
                    >
                        <Input placeholder="Please enter amount" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="Paid"
                        name="paid"
                        rules={[{ required: true, message: 'Mandatory' }]}
                        min={0}
                        step={0.01}
                    >
                        <Input placeholder="Please enter payment" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item label="Receivable"
                        min={0}
                        step={0.01}
                    >
                        <Input value={receivable} disabled style={{ width: 400 }}
                            formatter={(value) => `${value.toFixed(2)}`}

                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">

                                {`${invoiceId ? 'Update' : 'Submit'}`}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default InvoiceForm