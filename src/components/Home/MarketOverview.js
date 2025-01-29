import React, { useEffect } from 'react';

function MarketOverview() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "colorTheme": "dark",
      "dateRange": "12M",
      "showChart": true,
      "locale": "en",
      "largeChartUrl": "",
      "isTransparent": true,
      "showSymbolLogo": true,
      "showFloatingTooltip": false,
      "width": "100%",
      "height": "660",
      "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
      "plotLineColorFalling": "rgba(41, 98, 255, 1)",
      "gridLineColor": "rgba(240, 243, 250, 0)",
      "scaleFontColor": "rgba(120, 123, 134, 1)",
      "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
      "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
      "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
      "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
      "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
      "tabs": [
        {
          "title": "Crypto",
          "symbols": [
            {
              "s": "BINANCE:BTCUSDT",
              "d": "Bitcoin"
            },
            {
              "s": "BINANCE:ETHUSDT",
              "d": "Ethereum"
            },
            {
              "s": "BINANCE:BNBUSDT",
              "d": "BNB"
            },
            {
              "s": "BINANCE:SOLUSDT",
              "d": "Solana"
            },
            {
              "s": "BINANCE:ADAUSDT",
              "d": "Cardano"
            }
          ]
        }
      ]
    });

    const container = document.getElementById('tradingview-market-overview');
    container.appendChild(script);

    return () => {
      if (container && container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container w-full h-full" id="tradingview-market-overview">
      <div className="tradingview-widget-container__widget w-full h-full"></div>
    </div>
  );
}

export default MarketOverview; 