import React from 'react'
import Router from 'next/router'

const Card = ({ item }) => (
    <div onClick={() => Router.push(item?.link || '')} key={item.id} className='backdrop-filter backdrop-blur bg-teal-800 hover:bg-opacity-30 hover:scale-105 transition-all duration-150 ease-out bg-opacity-10 min-w-[300px] rounded-xl p-8 text-white max-w-xs cursor-pointer flex flex-col items-center justify-center'>
        <img src={item.imgSrc} className='glow w-32 h-32 sm:w-36 sm:h-36 md:w-36 md:h-36 2xl:w-28 2xl:h-28 p-2' alt="" />
        <h1 className='text-xl 2xl:text-2xl font-medium mb-2 mt-4'>{item.heading}</h1>
        {item?.desc && <p className='text-base md:text-lg text-center text-gray-400'>{item.desc}</p>}
    </div>
)

function Cards({ title, description, items }) {
    return (
        <>
            <section className='p-10 sm:my-20 text-center'>
                <h1 className='capitalize text-3xl sm:text-4xl 2xl:text-5xl font-semibold'>{title}</h1>
                {description && <p className='text-base sm:text-lg 2xl:text-xl max-w-3xl mx-auto text-zinc-300'>{description}</p>}
                <div className='p-5 grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 place-items-center items-stretch justify-evenly md:max-w-4xl 2xl:max-w-7xl mx-auto flex-wrap gap-12 lg:gap-y-16'>
                    {items?.map(item => <Card key={item.id} item={item} />)}
                </div>
            </section>
        </>
    )
}

export default Cards