import { Footer } from 'antd/lib/layout/layout';
import Navbar from './Navbar';

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className='min-h-[550px] max-w-7xl mx-auto'>{children}</main>
            <Footer> <p className='text-center text-lg sm:text-xl'>Cryptolens ©2022 All Rights Reserved</p> </Footer>
        </>
    )
}