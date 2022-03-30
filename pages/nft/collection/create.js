import React, { useState } from 'react'

import {
    Form,
    Select,
    Input,
    InputNumber,
    Button,
    Upload,
} from 'antd';

const { Option } = Select

import { UploadOutlined } from '@ant-design/icons';

function create() {

    function other(file) {
        if (!file) return;
        let { response, thumbUrl, xhr, ...other } = file;
        return other
    }

    const onFinish = (values) => {
        const formData = {
            ...values,
            logo: other(values.logo?.file),
            featured: other(values.featured?.file),
            banner: other(values.banner?.file)
        }

        console.log('Received values of form: ', formData);
    };

    return (
        <>
            <h1 className="capitalize text-3xl sm:text-4xl 2xl:text-5xl font-semibold text-center py-3 sm:py-5 relative before:content-[''] before:w-60 before:h-1 before:bg-teal-300 before:absolute before:bottom-0 before:left-1/2 transform before:-translate-x-1/2 before:rounded-full">Create A Collection</h1>
            <div className='max-w-3xl mx-auto p-5 md:p-10 border border-teal-900 rounded-lg mb-10 backdrop-filter backdrop-blur bg-teal-800 bg-opacity-10 focus-within:bg-opacity-20'>
                <Form
                    name="validate_other"
                    onFinish={onFinish}
                    initialValues={{
                        'blockchain': 'etherium',
                        'earning': 2.5,
                    }}
                    layout="vertical"
                    size='large'
                    className='gap-y-10'
                >
                    <Form.Item
                        name="logo"
                        label="Logo Image"
                        extra="This image will also be used for navigation. Square image recommended"
                        rules={[
                            {
                                required: true,
                                message: 'Please select Logo image!',
                            },
                        ]}
                    >
                        <Upload name="logo" listType="picture" maxCount={1}>
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name="featured"
                        label="Featured Image"
                        extra="This image will be used for featuring your collection on the homepage, category pages, or other promotional areas of OpenSea. 600 x 400 recommended."
                    >
                        <Upload name="featured" maxCount={1} listType="picture">
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name="banner"
                        label="Banner Image"
                        extra="This image will appear at the top of your collection page. Avoid including too much text in this banner image, as the dimensions change on different devices. 1400 x 400 recommended."
                    >
                        <Upload name="banner" maxCount={1} listType="picture">
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input name='name' placeholder='Your collection name' />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <Input.TextArea name="description" placeholder='Provide a short description of your collection' showCount maxLength={500} />
                    </Form.Item>


                    <Form.Item
                        name="blockchain"
                        label="Blockchain"
                        extra="Select the blockchain where you'd like new items from this collection to be added by default"
                        rules={[
                            {
                                required: true,
                                message: 'Please select blockchain!',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            name="blockchain"
                            className='border border-zinc-700'
                            placeholder="Select blockchain"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="etherium">Etherium</Option>
                            <Option value="bitcoin">Bitcoin</Option>
                            <Option value="usdc">USDC</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="Category"
                        extra="Selecting multiple category will help make your item discoverable and categorized."
                        rules={[
                            {
                                required: true,
                                message: 'Please select Category!',
                            },
                        ]}
                    >
                        <Select
                            mode='multiple'
                            name="category"
                            showSearch
                            className='border border-zinc-700'
                            placeholder="Select category"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="art">Art</Option>
                            <Option value="avatars">Avatars</Option>
                            <Option value="music">Music</Option>
                            <Option value="video game">Video Game</Option>
                            <Option value="trading cards">Trading Cards</Option>
                            <Option value="collectibls">Collectibles</Option>
                            <Option value="sports">Sports</Option>
                            <Option value="memes">Memes</Option>
                            <Option value="fashion">Fashion</Option>
                            <Option value="event tickets">Event tickets</Option>
                            <Option value="real-world assets">Real-world assets</Option>
                            <Option value="others">Others</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="earning" label="Creator Earning"
                        extra="Collect a fee when a user re-sells an item you originally created. This is deducted from the final sale price and paid monthly to a payout address of your choosing."
                        rules={[{ required: true }]}>
                        <InputNumber min={1} name="earning" max={10}
                            formatter={value => `${value}%`}
                            parser={value => value.replace('%', '')} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default create