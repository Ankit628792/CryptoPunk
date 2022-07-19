import { useMoralis } from "react-moralis";

import { Form, Select, Input, InputNumber, Button, Upload, DatePicker } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Connect } from "../../components";
import { pinFileToIPFS, pinJSONToIPFS, testAuthentication } from '../../utils/data';
import { mintNFT } from '../../utils/nftContract';


function create() {
    const { isAuthenticated, user } = useMoralis();
    const [isSending, setIsSending] = useState(false);
    const [userCollection, setUserCollection] = useState([]);

    useEffect(() => {
        if (user?.get("ethAddress")) {
            fetch(`/api/usercollection?walletAddress=${user?.get("ethAddress")}`).then((data) => {
                return data.json();
            }).then((resp) => {
                setUserCollection(resp.data);
            })
        }
    }, [user]);

    const uploadImage = async (image) => {
        let data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "ankit_kumar")
        data.append("cloud_name", "ankit628792")
        const resp = await fetch(`${process.env.cloudinaryUrl}`, {
            method: "post",
            body: data
        })
        let res = await resp.json();
        return res.secure_url
    }

    const mintNFTData = async (file, data) => {
        try {
            const res = await testAuthentication();
            if (res.status === 200) {
                const file1 = await pinFileToIPFS(file)

                //Create NFT metadata JSON
                const rangeValue = data['date-range'];
                const media_url = await uploadImage(file)

                const metadata = {
                    image: `https://gateway.pinata.cloud/ipfs/${file1?.IpfsHash}`,
                    name: data.name ?? '',
                    description: data.description ?? '',
                    collection: data.nftCollection,
                    media: media_url,
                    price: data.price,
                    dateRange: [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
                    attributes: [
                        { "trait_type": "name", "value": data.name },
                        { "trait_type": "type", "value": "nft" }
                    ]
                }
                const pinataJSONBody = {
                    pinataContent: metadata
                };
                const file2 = await pinJSONToIPFS(pinataJSONBody)

                const metadataUrl = `https://gateway.pinata.cloud/ipfs/${file2?.IpfsHash}`;
                const response = await mintNFT(metadataUrl)
                console.log("NFT Contract details \n", response)
                if (response && response?.includes('successfully')) {
                    return { status: 201, media_url: media_url }
                }
            }
        } catch (error) {
            console.log(error)
            return { status: 400, media_url: null }
        }
    }

    const onFinish = async (values) => {
        setIsSending(true)
        const rangeValue = values['date-range'];
        const { status, media_url } = await mintNFTData(values.media?.file.originFileObj, values)

        if (status && media_url) {
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
            if (response?.status === 201) {
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
                                'price': 0.001
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
                                    {
                                        userCollection?.length && userCollection.map((coll) => {
                                            return <Option className="capitalize" key={coll._id} value={coll.name}>{coll.name}</Option>
                                        })
                                    }
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
                                    {/* <Option value="bitcoin">Bitcoin</Option>
                                    <Option value="usdc">USDC</Option> */}
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
