import { useMoralis } from "react-moralis";

import { Form, Select, Input, InputNumber, Button, Upload, DatePicker } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

import { UploadOutlined } from '@ant-design/icons';
import { useState } from "react";
import { Connect } from "../../components";

function create() {
    const { isAuthenticated, user } = useMoralis();
    const [isSending, setIsSending] = useState(false)

    function other(file) {
        if (!file) return;
        let { response, thumbUrl, xhr, ...other } = file;
        return other
    }

    const uploadImage = async (image) => {
        let data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "ankit_kumar")
        data.append("cloud_name", "ankit628792")
        const resp = await fetch(`https://api.cloudinary.com/v1_1/ankit628792/image/upload`, {
            method: "post",
            body: data
        })
        let res = await resp.json();
        return res.secure_url
    }

    const onFinish = async (values) => {
        setIsSending(true)
        const rangeValue = values['date-range'];
        const media_url = await uploadImage(values.media?.file.originFileObj)

        if (media_url) {
            const formData = {
                ...values,
                media: media_url,
                dateRange: [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
                user: user?.get("ethAddress")
            };
            const res = await fetch('/api/nft', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const response = await res.json()
            setIsSending(false)
            if (response.status === 201) {
                alert(response.data)
                window.location.reload()
            }
            else {
                alert(response.message)
            }
        }
    };
    const rangeConfig = {
        rules: [
            {
                type: 'array',
                required: true,
                message: 'Please select time range!',
            },
        ],
    };
    return (
        <>
            {!isAuthenticated ?
                <Connect />
                :
                <>
                    <h1 className="capitalize text-3xl sm:text-4xl 2xl:text-5xl font-semibold text-center py-3 sm:py-5 relative before:content-[''] before:w-60 before:h-1 before:bg-teal-300 before:absolute before:bottom-0 before:left-1/2 transform before:-translate-x-1/2 before:rounded-full">Create New Item</h1>
                    <div className='max-w-3xl mx-auto p-5 md:p-10 border border-teal-900 rounded-lg mb-10 backdrop-filter backdrop-blur bg-teal-800 bg-opacity-10 focus-within:bg-opacity-20'>
                        <Form
                            name="validate_other"
                            onFinish={onFinish}
                            initialValues={{
                                'blockchain': 'etherium',
                                'price': 0.1
                            }}
                            layout="vertical"
                            size='large'
                            className='gap-y-10'
                        >
                            <Form.Item
                                name="media"
                                label="Image, Video or 3D Model"
                                extra="File types supported: JPG, PNG, GIF, SVG, MP4. Max size: 10 MB"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select media!',
                                    },
                                ]}
                            >
                                <Upload name="logo" listType="picture" maxCount={1}>
                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                </Upload>
                            </Form.Item>



                            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                                <Input name='name' placeholder='Item name' />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Description"
                            >
                                <Input.TextArea name="description" placeholder='Provide a detailed description of your item' showCount maxLength={1000} />
                            </Form.Item>


                            <Form.Item
                                name="nftCollection"
                                label="Collection"
                                extra="This is the collection where your item will appear. "
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select Category!',
                                    },
                                ]}
                            >
                                <Select
                                    name="nftCollection"
                                    showSearch
                                    className='border border-zinc-700'
                                    placeholder="Select collection"
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

                            <Form.Item name="price" label="Base Price"
                                extra="Collect a fee when a user re-sells an item you originally created. This is deducted from the final sale price and paid monthly to a payout address of your choosing."
                                rules={[{ required: true }]}>
                                <InputNumber name='price' placeholder='Price'
                                    formatter={value => `${value}ETH`}
                                    parser={value => value.replace('ETH', '')} />
                            </Form.Item>

                            <Form.Item name="date-range" label="Duration" {...rangeConfig}>
                                <RangePicker />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" disabled={isSending}>
                                    {isSending ? 'Creating...' : 'Submit'}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </>
            }
        </>
    )
}

export default create