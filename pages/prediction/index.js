import React, { useEffect, useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import { Col, Row, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../../crypto/cryptoApi';
import { Loader, TwoLineChart } from '../../components';

const { Option } = Select;

const Prediction = () => {
    const [coinId, setCoinId] = useState('razxDUgYGNAdQ')
    const [predictionData, setPredictionData] = useState()
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod: '1y' });

    const cryptoDetails = data?.data?.coin;

    useEffect(() => {
        if (cryptoDetails?.symbol) {
            fetch("https://cryptopunk-prediction.herokuapp.com/predict", {
                method: "POST",
                body: JSON.stringify({ coin: cryptoDetails?.symbol })
            })
                .then((data) => data.json())
                .then((res) => setPredictionData(res))
                .catch((e) => console.log(e));
        }
    }, [cryptoDetails?.symbol, coinId]);

    if (isFetching) return <Loader />;

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails['24hVolume'] && millify(cryptoDetails['24hVolume'])}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];

    return (
        <Col className="max-w-5xl p-5 xl:px-10">
            <Col className="text-center">
                <h1 className="text-teal-400 text-4xl font-bold lg:text-5xl">
                    {cryptoDetails?.name} ({cryptoDetails?.symbol}) Predicted Price
                </h1>
                <p className='text-lg lg:text-xl text-gray-400'>{cryptoDetails?.name} Predicted price in US Dollar (USD). View value statistics, market cap and supply.</p>
            </Col>
            <div className='max-w-max ml-auto border border-zinc-500 focus-within:border-teal-400 my-4'>

                <Select defaultValue={coinId} style={{ width: 120 }} placeholder="Select Timeperiod" showSearch optionFilterProp='childern' onChange={(value) => setCoinId(value)} filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    {cryptosList?.map((coin) => <Option value={coin.uuid} key={coin.uuid}>{coin.name}</Option>)}
                </Select>
            </div>
            {coinHistory && predictionData && <TwoLineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} predictionData={predictionData} />}
            <Col className="lg:flex mt-10">
                <Col className="p-5 xl:px-10">
                    <Col>
                        <h1 className="text-2xl 2xl:text-3xl font-medium">{cryptoDetails?.name} Value Statistics</h1>
                        <p className='text-lg lg:text-xl text-gray-400'>An overview showing the statistics of {cryptoDetails?.name}, such as the base and quote currency, the rank, and trading volume.</p>
                    </Col>
                    {stats.map(({ icon, title, value }) => (
                        <Col className="flex items-center justify-between text-base my-3 lg:text-lg" key={value + title + Date.now()}>
                            <Col className='flex space-x-2 items-center'>
                                <h1>{icon}</h1>
                                <h1>{title}</h1>
                            </Col>
                            <h1>{value}</h1>
                        </Col>
                    ))}
                </Col>
                <Col className="p-5 xl:px-10">
                    <Col>
                        <h1 className='text-xl lg:text-2xl 2xl:text-3xl font-medium'>Other Stats Info</h1>
                        <p className='text-lg lg:text-xl text-gray-400'>An overview showing the statistics of {cryptoDetails?.name}, such as the base and quote currency, the rank, and trading volume.</p>
                    </Col>
                    {genericStats.map(({ icon, title, value }) => (
                        <Col className="flex items-center justify-between text-base my-3 lg:text-lg" key={value + title + Date.now()}>
                            <Col className='flex space-x-2 items-center'>
                                <h1>{icon}</h1>
                                <h1>{title}</h1>
                            </Col>
                            <h1>{value}</h1>
                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className="lg:flex lg:justify-between p-5">
                <Col className="max-w-2xl coin__desc lg:w-1/2">
                    <h1 className="text-xl lg:text-2xl 2xl:text-3xl font-medium">What is {cryptoDetails?.name}?</h1>
                    {HTMLReactParser(cryptoDetails?.description)}
                </Col>
                <Col className="flex-shrink-0 lg:w-5/12">
                    <h1 className="text-xl lg:text-2xl 2xl:text-3xl font-medium">{cryptoDetails?.name} Links</h1>
                    {cryptoDetails?.links?.map((link, i) => (
                        <Row className="flex items-center justify-between gap-x-8" key={i}>
                            <h1 className="text-lg lg:text-xl font-medium ">{link.type}</h1>
                            <a href={link?.url} className='text-teal-400 hover:text-teal-600 text-lg' target="_blank" rel="noreferrer">{link.name}</a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    );
};

export default Prediction;

const cryptosList = [
    {
        "uuid": "Qwsogvtv82FCd",
        "name": "Bitcoin",
        "symbol": "BTC"
    },
    {
        "uuid": "razxDUgYGNAdQ",
        "name": "Ethereum",
        "symbol": "ETH"
    },
    {
        "uuid": "WcwrkfNI4FUAe",
        "name": "Binance Coin",
        "symbol": "BNB"
    },
    {
        "uuid": "qzawljRxB5bYu",
        "name": "Cardano",
        "symbol": "ADA"
    },
    {
        "uuid": "-l8Mn2pVlRs-p",
        "name": "XRP",
        "symbol": "XRP"
    },
    {
        "uuid": "zNZHO_Sjf",
        "name": "Solana",
        "symbol": "SOL"
    },
    {
        "uuid": "9K7m6ufraZ6gh",
        "name": "HEX",
        "symbol": "HEX"
    },
    {
        "uuid": "a91GCGd_u96cF",
        "name": "Dogecoin",
        "symbol": "DOGE"
    },
    {
        "uuid": "25W7FG7om",
        "name": "Polkadot",
        "symbol": "DOT"
    },
    {
        "uuid": "qUhEFk1I61atv",
        "name": "TRON",
        "symbol": "TRX"
    },
    {
        "uuid": "x4WXHge-vvFY",
        "name": "Wrapped BTC",
        "symbol": "WBTC"
    },
    {
        "uuid": "dvUj0CzDZ",
        "name": "Avalanche",
        "symbol": "AVAX"
    },
    {
        "uuid": "mqtUpyBxu8O8",
        "name": "LEO",
        "symbol": "LEO"
    },
    {
        "uuid": "uW2tk-ILY0ii",
        "name": "Polygon",
        "symbol": "MATIC"
    },
    {
        "uuid": "D7B1x_ks7WhV5",
        "name": "Litecoin",
        "symbol": "LTC"
    },
    {
        "uuid": "65PHZTpmE55b",
        "name": "Cronos",
        "symbol": "CRO"
    },
    {
        "uuid": "_H5FVG9iW",
        "name": "Uniswap",
        "symbol": "UNI"
    },
    {
        "uuid": "NfeOYfNcl",
        "name": "FTX Token",
        "symbol": "FTT"
    },
    {
        "uuid": "3mVx2FX_iJFp5",
        "name": "Monero",
        "symbol": "XMR"
    },
    {
        "uuid": "VLqpJwogdhHNb",
        "name": "Chainlink",
        "symbol": "LINK"
    },
    {
        "uuid": "DCrsaMv68",
        "name": "NEAR Protocol",
        "symbol": "NEAR"
    },
    {
        "uuid": "PDKcptVnzJTmN",
        "name": "OKB",
        "symbol": "OKB"
    },
    {
        "uuid": "f3iaFeCKEmkaZ",
        "name": "Stellar",
        "symbol": "XLM"
    },
    {
        "uuid": "Knsels4_Ol-Ny",
        "name": "Cosmos",
        "symbol": "ATOM"
    },
    {
        "uuid": "TpHE2IShQw-sJ",
        "name": "Algorand",
        "symbol": "ALGO"
    },
    {
        "uuid": "hnfQfsYfeIGUQ",
        "name": "Ethereum Classic",
        "symbol": "ETC"
    },
    {
        "uuid": "9_jH48RBW",
        "name": "Bitcoin BEP2",
        "symbol": "BTCB"
    },
    {
        "uuid": "tEf7-dnwV3BXS",
        "name": "Decentraland",
        "symbol": "MANA"
    },
    {
        "uuid": "FEbS54wxo4oIl",
        "name": "VeChain",
        "symbol": "VET"
    },
    {
        "uuid": "jad286TjB",
        "name": "Hedera HashGraph",
        "symbol": "HBAR"
    },
    {
        "uuid": "aMNLwaUbY",
        "name": "Internet Computer (DFINITY)",
        "symbol": "ICP"
    },
    {
        "uuid": "fsIbGOEJWbzxG",
        "name": "Tezos",
        "symbol": "XTZ"
    },
    {
        "uuid": "ncYFcP709",
        "name": "PancakeSwap",
        "symbol": "CAKE"
    },
    {
        "uuid": "pxtKbG5rg",
        "name": "The Sandbox",
        "symbol": "SAND"
    },
    {
        "uuid": "omwkOTglq",
        "name": "Elrond",
        "symbol": "EGLD"
    },
    {
        "uuid": "ixgUfzmLR",
        "name": "Aave",
        "symbol": "AAVE"
    },
    {
        "uuid": "p_GHkOeDNKw0",
        "name": "Compound Ether",
        "symbol": "CETH"
    },
    {
        "uuid": "aRGRWLf2RYNq4",
        "name": "Zcash",
        "symbol": "ZEC"
    },
    {
        "uuid": "LOO6LmXd7G84Z",
        "name": "KuCoin Token",
        "symbol": "KCS"
    },
    {
        "uuid": "lD9digIOk",
        "name": "1inch Token",
        "symbol": "1INCH"
    },
    {
        "uuid": "iAzbfXiBBKkR6",
        "name": "EOS",
        "symbol": "EOS"
    },
    {
        "uuid": "gpRKmM16k",
        "name": "Axie Infinity",
        "symbol": "AXS"
    },
    {
        "uuid": "B42IRxNtoYmwK",
        "name": "Theta Token",
        "symbol": "THETA"
    },
    {
        "uuid": "qFakph2rpuMOL",
        "name": "Maker",
        "symbol": "MKR"
    },
    {
        "uuid": "ZO4D7EBy3",
        "name": "SENSO",
        "symbol": "SENSO"
    },
    {
        "uuid": "SbWqqTui-",
        "name": "EnergySwap",
        "symbol": "ENS"
    },
    {
        "uuid": "VcMY11NONHSA0",
        "name": "Bitcoin SV",
        "symbol": "BSV"
    },
    {
        "uuid": "sfab31CXM",
        "name": "Bloktopia",
        "symbol": "BLOK"
    },
    {
        "uuid": "M9bj_WrX",
        "name": "Klaytn",
        "symbol": "KLAY"
    },
    {
        "uuid": "cVaOmQWainv7g",
        "name": "NEO",
        "symbol": "NEO"
    },
    {
        "uuid": "LtWwuVANwRzV_",
        "name": "IOTA",
        "symbol": "MIOTA"
    },
    {
        "uuid": "rGDiacWtB",
        "name": "Helium",
        "symbol": "HNT"
    },
    {
        "uuid": "J8xX4Fc9PxEat",
        "name": "Waves",
        "symbol": "WAVES"
    },
    {
        "uuid": "ybmU-kKU",
        "name": "THORChain",
        "symbol": "RUNE"
    },
    {
        "uuid": "7oCgI0fI3",
        "name": "AMP",
        "symbol": "AMP"
    },
    {
        "uuid": "Pe93bIOD2",
        "name": "Lido DAO Token",
        "symbol": "LDO"
    },
    {
        "uuid": "t7m8DZVyMsAu",
        "name": "GateToken",
        "symbol": "GT"
    },
    {
        "uuid": "w5U609Wze",
        "name": "ApeCoin",
        "symbol": "APE"
    },
    {
        "uuid": "RzGVuiI5",
        "name": "USD Neutrino",
        "symbol": "USDN"
    },
    {
        "uuid": "3jmxrjOJ8xa4p",
        "name": "Zilliqa",
        "symbol": "ZIL"
    },
    {
        "uuid": "QQ0NCmjVq",
        "name": "Flow",
        "symbol": "FLOW"
    },
    {
        "uuid": "Hi6jNXshVh9FA",
        "name": "Nexo",
        "symbol": "NEXO"
    },
    {
        "uuid": "F-uNCZq0e",
        "name": "Temtum",
        "symbol": "TEM"
    },
    {
        "uuid": "QUC5kVAxSoB-",
        "name": "MX Token",
        "symbol": "MX"
    },
    {
        "uuid": "uIEWfMFnQo9K_",
        "name": "Fantom",
        "symbol": "FTM"
    },
    {
        "uuid": "ymQub4fuB",
        "name": "Filecoin",
        "symbol": "FIL"
    },
    {
        "uuid": "bauj_21eYVwso",
        "name": "Quant",
        "symbol": "QNT"
    },
    {
        "uuid": "C9DwH-T7MEGmo",
        "name": "Dash",
        "symbol": "DASH"
    },
    {
        "uuid": "ePlOuwd_e",
        "name": "Kusama",
        "symbol": "KSM"
    },
    {
        "uuid": "qhd1biQ7M",
        "name": "The Graph",
        "symbol": "GRT"
    },
    {
        "uuid": "QGbUTVMjG",
        "name": "Curve DAO Token",
        "symbol": "CRV"
    },
    {
        "uuid": "sgxZRXbK0FDc",
        "name": "Synthetix Network",
        "symbol": "SNX"
    },
    {
        "uuid": "Ru56fDlLB56-v",
        "name": "Ravencoin",
        "symbol": "RVN"
    },
    {
        "uuid": "pOnT-qfd-RN7W",
        "name": "Basic Attention Token",
        "symbol": "BAT"
    },
    {
        "uuid": "zfVt1uA3P",
        "name": "Gala ",
        "symbol": "GALA"
    }
]