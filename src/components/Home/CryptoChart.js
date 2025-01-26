import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function CryptoChart({ coinId = "bitcoin", currency = "usd" }) {
  const containerRef = useRef();

  // Convert coinId to TradingView symbol format
  const getSymbol = (coin) => {
    const symbolMap = {
      'bitcoin': 'BTC',
      'ethereum': 'ETH',
      'binancecoin': 'BNB',
      'ripple': 'XRP',
      'cardano': 'ADA',
      'solana': 'SOL',
      'polkadot': 'DOT',
      'dogecoin': 'DOGE',
      // Add more mappings as needed
    };
    return symbolMap[coin.toLowerCase()] || coin.toUpperCase();
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.TradingView && containerRef.current) {
        new window.TradingView.widget({
          width: '100%',
          height: 400,
          symbol: `BINANCE:${getSymbol(coinId)}${currency.toUpperCase()}`,
          interval: '1',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '3',
          locale: 'en',
          toolbar_bg: '#1F2937',
          enable_publishing: false,
          hide_side_toolbar: true,
          hide_legend: true,
          save_image: false,
          container_id: containerRef.current.id,
          autosize: true,
          hide_volume: true,
          hide_drawing_toolbar: true,
          hide_top_toolbar: false,
          studies: [],
          charts_storage_api_version: "1.1",
          client_id: "tradingview.com",
          user_id: "public_user_id",
          loading_screen: { backgroundColor: "#1F2937" },
          overrides: {
            "mainSeriesProperties.showStyle": true,
            "mainSeriesProperties.style": 0,
            "mainSeriesProperties.lineStyle.color": "#2962FF",
            "mainSeriesProperties.lineStyle.linewidth": 2,
          },
          disabled_features: [
            "left_toolbar",
            "volume_force_overlay",
            "create_volume_by_value_study",
            "legend_widget",
            "dom_widget",
            "trading_panel",
            "side_toolbar_in_fullscreen_mode",
            "header_symbol_search",
            "header_chart_type",
          ],
          enabled_features: [
            "hide_left_toolbar_by_default",
          ]
        });
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [coinId, currency]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-xl"
    >
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            {getSymbol(coinId)}/{currency.toUpperCase()}
          </h2>
          <div className="text-sm text-gray-400">
            Live Chart
          </div>
        </div>
        <div 
          id={`tradingview_${coinId}`}
          ref={containerRef} 
          className="relative h-[400px] w-full"
        />
      </div>
    </motion.div>
  );
}

export default CryptoChart;
