import axios from 'axios'
const APIKEY = process.env.pinataApiKey
const SECRETKEY = process.env.pinataSecretKey
const secrets = {
    'pinata_api_key': APIKEY,
    'pinata_secret_api_key': SECRETKEY

}

export const testAuthentication = async () => {
    const url = `https://api.pinata.cloud/data/testAuthentication`;
    const res = await fetch(url, {
        headers: {
            ...secrets
        }
    })
    if (res.status === 200) {
        const data = await res.json()
        return { ...data, status: 200 }
    } else {
        return res
    }
};

export const pinFileToIPFS = async (file) => {
    let url = 'https://api.pinata.cloud/pinning/pinFileToIPFS'
    let data = new FormData();
    data.append('file', file);

    const res = await axios.post(url, data, {
        headers: {
            "Content-Type": `multipart/form-data; boundary=  ${data._boundary}`,
            ...secrets
        },
    });

    if (res.status === 200) {
        return res.data;
    }
    else {
        return res
    }
};

export const pinJSONToIPFS = async (pinataJSONBody) => {
    let url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS'
    const res = await axios.post(url, pinataJSONBody,
        {
            headers: {
                'Content-Type': 'application/json',
                ...secrets
            },
        }
    )
    if (res.status === 200) {
        return res.data
    }
    else {
        return res
    }
};