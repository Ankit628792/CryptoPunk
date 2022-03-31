import React from 'react'
import { Collections } from '../../../components'

function index({ collectionList }) {
    return (
        <>
            <Collections collectionList={collectionList} />
        </>
    )
}

export default index

export async function getServerSideProps() {
    const collection = await fetch(`${process.env.host}/api/collection?limit=100`).then(res => res.json());
    return {
        props: {
            collectionList: collection?.data,
        }
    }
}