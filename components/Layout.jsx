import { Footer } from 'antd/lib/layout/layout';
import Navbar from './Navbar';
// import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className='min-h-[550px] max-w-7xl mx-auto'>{children}</main>
            <Footer> <p className='text-center text-lg sm:text-xl'>Cryptopunk ©2022 Designed and Developed by Cryptopunk team</p> </Footer>
            {/* <Footer /> */}
        </>
    )
}