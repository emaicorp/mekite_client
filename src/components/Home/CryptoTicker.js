import React from 'react';

function CryptoTicker() {
  return (
    <div className="w-full bg-gray-900/50 backdrop-blur-sm border-y border-gray-800">
      <iframe
        title="crypto-ticker"
        src="https://s.tradingview.com/embed-widget/ticker-tape/?locale=en#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22BINANCE%3ABTCUSDT%22%2C%22title%22%3A%22Bitcoin%22%7D%2C%7B%22proName%22%3A%22BINANCE%3AETHUSDT%22%2C%22title%22%3A%22Ethereum%22%7D%2C%7B%22proName%22%3A%22BINANCE%3ABNBUSDT%22%2C%22title%22%3A%22BNB%22%7D%2C%7B%22proName%22%3A%22BINANCE%3ASOLUSDT%22%2C%22title%22%3A%22Solana%22%7D%2C%7B%22proName%22%3A%22BINANCE%3AADAUSDT%22%2C%22title%22%3A%22Cardano%22%7D%5D%2C%22showSymbolLogo%22%3Atrue%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Atrue%2C%22displayMode%22%3A%22adaptive%22%2C%22locale%22%3A%22en%22%7D"
        style={{
          width: "100%",
          height: "46px",
          border: "none",
          overflow: "hidden",
          background: "transparent"
        }}
      />
    </div>
  );
}

export default CryptoTicker; 