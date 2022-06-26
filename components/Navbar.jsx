import { Avatar, Space, Typography } from 'antd'
import { Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Text from 'antd/lib/typography/Text';
import Router from 'next/router';
import Link from 'next/link';
import { useMoralis } from "react-moralis";
import { shortenAddress } from '../utils/contract';

function Navbar() {
    const { authenticate, isAuthenticated, logout, user } = useMoralis();

    const [seed, setSeed] = useState('');
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, []);

    const registerUser = async () => {

        const data = { username: user?.get('username'), walletAddress: user?.get("ethAddress") }
        const res = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const response = await res.json()
    }

    useEffect(() => {
        if (isAuthenticated && user) {
            registerUser()
        }
    }, [isAuthenticated, user])


    const [checkedSate, setCheckedSate] = useState(false)

    const handleCheckedSate = () => {
        checkedSate ? setCheckedSate(false) : setCheckedSate(true)
    }

    const nfts = (
        <Menu style={{ borderRadius: '16px', padding: '8px' }}>
            <Menu.Item key={1} style={{ borderRadius: '12px' }}>
                <a className='text-lg capitalize' onClick={() => Router.push("/nft/")}>
                    NFT Marketplace
                </a>
            </Menu.Item>
            <Menu.Item key={2} style={{ borderRadius: '12px' }}>
                <a className='text-lg capitalize' onClick={() => Router.push("/nft/collection/")}>
                    Top Collections
                </a>
            </Menu.Item>
            <Menu.Item key={3} style={{ borderRadius: '12px' }}>
                <a className='text-lg capitalize' onClick={() => Router.push("/nft/assets")}>
                    Top NFTs
                </a>
            </Menu.Item>
        </Menu>
    );

    const cryptos = (
        <Menu style={{ borderRadius: '16px', padding: '8px' }}>
            <Menu.Item key={1} style={{ borderRadius: '12px' }}>
                <a className='text-lg capitalize' onClick={() => Router.push("/market/")}>
                    Market
                </a>
            </Menu.Item>
            <Menu.Item key={2} style={{ borderRadius: '12px' }}>
                <a className='text-lg capitalize' onClick={() => Router.push("/market/cryptocurrencies")}>
                    Cryptocurrencies
                </a>
            </Menu.Item>
            <Menu.Item key={3} style={{ borderRadius: '12px' }}>
                <a className='text-lg capitalize' onClick={() => Router.push("/market/exchanges")}>
                    Exchanges
                </a>
            </Menu.Item>
            <Menu.Item key={4} style={{ borderRadius: '12px' }}>
                <a className='text-lg capitalize' onClick={() => Router.push("/market/news")}>
                    News
                </a>
            </Menu.Item>
        </Menu>
    );

    const userNav = (
        <Menu style={{ borderRadius: '16px', padding: '8px' }}>
            {/* <Menu.Item key={1} style={{ borderRadius: '12px' }}>
                <a className='text-lg capitalize' onClick={() => Router.push("/")}>
                    Profile
                </a>
            </Menu.Item> */}
            <Menu.Item key={1} style={{ borderRadius: '12px' }}>
                <a className='text-lg capitalize' onClick={() => Router.push("/account/mynft")}>
                    My NFTs
                </a>
            </Menu.Item>
            <Menu.Item key={2} style={{ borderRadius: '12px' }}>
                <a className='text-lg capitalize' onClick={() => Router.push("/account/mycollection")}>
                    My Collection
                </a>
            </Menu.Item>
            <Menu.Item key={3} style={{ borderRadius: '12px' }}>
                <a className='text-lg capitalize' onClick={() => Router.push("/nft/collection/create")}>
                    Create Collection
                </a>
            </Menu.Item>
            <Menu.Item key={4} style={{ borderRadius: '12px' }}>
                <a className='text-lg capitalize' onClick={() => Router.push("/account/transactions")}>
                    Transactions
                </a>
            </Menu.Item>
            <Menu.Item key={5} style={{ borderRadius: '12px' }}>
                <a className='text-lg capitalize' onClick={() => logout()}>
                    Logout
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <header className='sticky top-0 flex items-center justify-between w-full p-5 md:px-10 2xl:px-20 max-w-7xl mx-auto bg-[#052631] z-50'>
                <div className="logo flex-shrink-0 flex items-center space-x-2 cursor-pointer" onClick={() => Router.push('/')}>
                    <img className='w-12' src="/assets/icons/icon.png" alt="" />
                    <Typography.Title level={3} className="hidden md:inline-flex">Cryptolens</Typography.Title>
                </div>
                <nav className='flex-shrink-0 hidden sm:inline-flex'>
                    <Space size={40}>
                        <Text className='cursor-pointer text-lg hidden lg:flex items-center space-x-1' onClick={() => Router.push('/prediction/')}>
                            Prediction
                        </Text>
                        <Text className='cursor-pointer text-lg flex items-center space-x-1' onClick={() => Router.push('/nft/create')}>
                            Mint NFT
                        </Text>
                        <Text className='cursor-pointer text-lg flex items-center space-x-1' onClick={() => Router.push('/transfer/')}>
                            Transfer
                        </Text>
                        <Dropdown overlay={nfts} arrow placement="bottom">
                            <Text className='cursor-pointer text-lg flex items-center space-x-1'>
                                NFT
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Text>
                        </Dropdown>
                        <Dropdown overlay={cryptos} arrow placement="bottom">
                            <Text className='cursor-pointer text-lg flex items-center space-x-1'>
                                Market
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Text>
                        </Dropdown>
                        {user && isAuthenticated ?
                            <Dropdown overlay={userNav} arrow placement="bottomRight">
                                <Space className='text-lg'>
                                    <> {shortenAddress(user?.get('ethAddress'))}
                                        <Avatar src={<img src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />} className='cursor-pointer' size={'large'} style={{ backgroundColor: '#14b8a6' }} />
                                    </>
                                </Space>
                            </Dropdown>
                            :
                            <button className='btn' onClick={() => authenticate({ provider: "metamask", signingMessage: 'Connect to Cryptolens' })}>Connect</button>
                        }
                    </Space>
                </nav>
            </header>

            {/* <!-- hamburger menu --> */}
            <div className="hamburger-menu sm:hidden">
                <label>
                    <input type='checkbox' checked={checkedSate} onChange={handleCheckedSate} />
                    <span className='hamburger-inner'> <span className='hamburger-icon shadow-lg fixed'></span> </span>
                    <ul>
                        <li onClick={handleCheckedSate}> <Link href="/">Home</Link></li>
                        <li onClick={handleCheckedSate}> <Link href="/prediction">Prediction</Link></li>
                        <li onClick={handleCheckedSate}> <Link href="/nft/create">Mint NFT</Link></li>
                        <li onClick={handleCheckedSate}> <Link href="/nft/collection/create">Create Collection</Link></li>
                        <li onClick={handleCheckedSate}> <Link href="/nft/">NFT Marketplace</Link></li>
                        <li onClick={handleCheckedSate}> <Link href="/market/">Crypto Market</Link></li>
                        <li onClick={handleCheckedSate}> <Link href="/market/exchanges">Exchanges</Link></li>
                        <li onClick={() => { handleCheckedSate(); logout() }}> <Link href="">Logout</Link></li>
                    </ul>
                </label>
            </div>
            {/* <!-- hamburger menu --> */}


        </>
    )
}

export default Navbar