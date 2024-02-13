import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [money, setMoney] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const onInputChange = (event) => {
    setMoney(event.target.value);
  };
  const onChange = (event) => {
    const values = event.target.value.split(",");
    const coin = {
      price: values[0],
      symbol: values[1],
    };
    setSelectedCoin(coin);
  };
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      <input
        onChange={onInputChange}
        value={money}
        type="number"
        placeholder="Your money"
      ></input>
      {selectedCoin ? (
        <h3>
          You have ${money}, you can buy{" "}
          {Math.floor(money / selectedCoin.price)}
          {selectedCoin.symbol}{" "}
        </h3>
      ) : null}
      <hr />
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onChange}>
          <option>Choose coin</option>
          {coins.map((coin) => (
            <option
              key={coin.id}
              value={`${coin.quotes.USD.price}, ${coin.symbol}`}
            >
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default App;
