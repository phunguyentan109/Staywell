import React, { useState, useEffect, useCallback } from "react";
import { Card, Spin, Table, Divider, Form, Input, Button } from "antd";
import PropTypes from 'prop-types';
import { apiPrice } from "constants/api";
import PopConfirm from "components/App/Pop/PopConfirm";
import { DEFAULT_PRICE } from '../modules/const';

const FormItem = Form.Item;

export default function Price({ notify }) {
    const [listPrice, setListPrice] = useState([]);
    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState(DEFAULT_PRICE);
    const [form, toggleForm] = useState(false);

    const load = useCallback(async() => {
        try {
            let priceData = await apiPrice.get();
            setListPrice(priceData);
            setLoading(false);
        } catch (e) {
            return notify("error", "Data is not loaded");
        }
    }, [notify]);

    useEffect(() => {
        load();
    }, [load]);

    function hdChange(e) {
        const { name, value } = e.target;
        setPrice(prev => ({ ...prev, [name]: value }))
    }

    async function hdSubmit() {
        setLoading(true);
        try {
            if(!price._id) {
                let createdPrice = await apiPrice.create(price);
                setListPrice(prev => [...prev, createdPrice]);
                notify("success", "Process is completed", "Price data is created successfully.");
            } else {
                let updatePrice = await apiPrice.update(price._id, price);
                let updatePriceList = listPrice.map(v => {
                    if(v._id === updatePrice._id) {
                        return updatePrice;
                    }
                    return v;
                });
                setListPrice(updatePriceList);
                notify("success", "Process is completed", "Price data is updated successfully.");
            }
            hdCancel();
        } catch (e) {
            notify("error", "Process is not completed", "Price data is not submitted successfully")
        }
        setLoading(false);
    }

    async function hdRemove(price_id) {
        setLoading(true);
        try {
            await apiPrice.remove(price_id);
            let updatePriceList = listPrice.filter(v => v._id !== price_id);
            setListPrice(updatePriceList);
            notify("success", "Process is not completed", "Price data is removed successfully");
        } catch (err){
            notify("error", "Process is not completed", "Price data is not remove");
        }
        setLoading(false);
    }

    function hdCancel() {
        setPrice(DEFAULT_PRICE);
        toggleForm(false);
    }

    function hdEdit(price) {
        setPrice(price);
        toggleForm(true);
    }

    return (
        <div>
            {
            form && <Card className='gx-card' title={!price._id ? "Add New Price" : "Edit Price Information"}>
                <Spin spinning={loading}>
                    <Form layout='horizontal'>
                        <FormItem
                            label='Type'
                            labelCol={{ xs: 24, sm: 6 }}
                            wrapperCol={{ xs: 24, sm: 10 }}
                        >
                            <Input
                                placeholder="Enter the price's type here..."
                                name='type'
                                value={price.type}
                                onChange={hdChange}
                            />
                        </FormItem>
                        <FormItem
                            label='Electric'
                            labelCol={{ xs: 24, sm: 6 }}
                            wrapperCol={{ xs: 24, sm: 10 }}
                        >
                            <Input
                                type='Number'
                                placeholder='Enter the electric price here...'
                                name='electric'
                                value={price.electric}
                                onChange={hdChange}
                            />
                        </FormItem>
                        <FormItem
                            label='Wifi'
                            labelCol={{ xs: 24, sm: 6 }}
                            wrapperCol={{ xs: 24, sm: 10 }}
                        >
                            <Input
                                type='Number'
                                placeholder='Enter the wifi price here...'
                                name='wifi'
                                value={price.wifi}
                                onChange={hdChange}
                            />
                        </FormItem>
                        <FormItem
                            label='Water'
                            labelCol={{ xs: 24, sm: 6 }}
                            wrapperCol={{ xs: 24, sm: 10 }}
                        >
                            <Input
                                type='Number'
                                placeholder='Enter the water price here...'
                                name='water'
                                value={price.water}
                                onChange={hdChange}
                            />
                        </FormItem>
                        <FormItem
                            label='House'
                            labelCol={{ xs: 24, sm: 6 }}
                            wrapperCol={{ xs: 24, sm: 10 }}
                        >
                            <Input
                                type='Number'
                                placeholder='Enter the house price here...'
                                name='house'
                                value={price.house}
                                onChange={hdChange}
                            />
                        </FormItem>
                        <FormItem
                            label='Extra'
                            labelCol={{ xs: 24, sm: 6 }}
                            wrapperCol={{ xs: 24, sm: 10 }}
                        >
                            <Input
                                type='Number'
                                placeholder='Enter the extra price here...'
                                name='extra'
                                value={price.extra}
                                onChange={hdChange}
                            />
                        </FormItem>
                        <FormItem
                            label='Duration'
                            labelCol={{ xs: 24, sm: 6 }}
                            wrapperCol={{ xs: 24, sm: 10 }}
                        >
                            <Input
                                type='Number'
                                placeholder='Enter the duration here...'
                                name='duration'
                                value={price.duration}
                                onChange={hdChange}
                            />
                        </FormItem>
                        <FormItem
                            wrapperCol={{
                                xs: 24,
                                sm: { span: 14, offset: 6 }
                            }}
                        >
                            <Button type='primary' onClick={hdSubmit}>{price._id ? "Save changes" : "Submit"}</Button>
                            <Button onClick={hdCancel}>Cancel</Button>
                        </FormItem>
                    </Form>
                </Spin>
            </Card>
            }
            <Card title='List of available price'>
                <Spin spinning={loading}>
                    {form || <Button type='primary' onClick={() => toggleForm(true)}>Add new price</Button>}
                    <Table
                        className='gx-table-responsive'
                        dataSource={listPrice}
                        rowKey='_id'
                        columns={[
                            {
                                title: "Price type",
                                dataIndex: 'type',
                            },
                            {
                                title: "Electric",
                                dataIndex: 'electric'
                            },
                            {
                                title: "Wifi",
                                dataIndex: 'wifi',
                            },
                            {
                                title: 'Water',
                                dataIndex: 'water'
                            },
                            {
                                title: 'House',
                                dataIndex: 'house'
                            },
                            {
                                title: 'Extra',
                                dataIndex: 'extra'
                            },
                            {
                                title: 'Duration',
                                dataIndex: 'duration'
                            },
                            {
                                title: 'Action',
                                key: 'action',
                                render: (text, record) => (
                                    <span>
                                        <PopConfirm
                                            title='Are you sure to delete this genre?'
                                            task={hdRemove.bind(this, record._id)}
                                            okText='Sure, remove it'
                                            cancelText='Not now'
                                        >
                                            <span className='gx-link'>Delete</span>
                                        </PopConfirm>
                                        <Divider type='vertical'/>
                                        <span className='gx-link' onClick={hdEdit.bind(this, record)}>Edit</span>
                                    </span>
                                )
                            }
                        ]}
                    />
                </Spin>
            </Card>
        </div>
    )
}

Price.propsTypes = {
    notify: PropTypes.func
};
