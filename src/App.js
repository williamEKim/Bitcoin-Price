import { useState, useEffect } from 'react';

import styles from './App.module.css';

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [asset, setAsset] = useState(0);
    const [price, setPrice] = useState(0);
    const [name, setName] = useState("---");

    const onChange = (event) => {
        setName(event.target.selectedOptions[0].text.split(':')[0]);
        setPrice(parseFloat(event.target.value));
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(asset === 0) {
            return;
        }
        setAsset(0);
        console.log("your asset has been reset!")
    }

    useEffect(()=>{
        fetch("https://api.coinpaprika.com/v1/tickers")
        .then(response => response.json())
        .then((json) => {
            setCoins(json);
            setLoading(false);
        });
    },[]);

    return (
        <div>
            <h1> Coins Listed: {loading? "" : coins.length + " Coins Found!"} </h1>
            <p>database: <a href='https://api.coinpaprika.com/v1/tickers'>Coin Paprika</a></p>
            <hr />
            <h3>{
                loading ? "Loading...":
                <select onChange={onChange}>
                    <option value={0.0}> --- Select Coin --- </option>
                    {coins.map((coin) => {
                        return(
                        <option 
                            key={coin.id} 
                            value={coin.quotes.USD.price} 
                        > 
                            {coin.name} ({coin.symbol}): ${coin.quotes.USD.price.toFixed(5)}
                        </option>
                    );})}
                </select>
            }</h3>

            <h2> Chosen Coin: "{name}": ${price.toFixed(5)} </h2>

            <div>
                <form onSubmit={onSubmit}>
                    $ <input 
                        onChange={(event) => setAsset(event.target.value)} 
                        value={asset} 
                        type="number" 
                        placeholder='USD'
                    />
                    <button> Reset </button>
                </form>
            </div>

            <h2> With ${asset}, you can purchase: {name} --- "{asset > 0 && price !== 0 ? (asset / price).toFixed(5) : 0}" </h2>
        </div>
    );
}


export default App;
