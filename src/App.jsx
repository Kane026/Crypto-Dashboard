"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import CryptoNavbar from "./components/CryptoNavbar"; 
import CryptoTable from "./components/CryptoTable"; // Import your new component

function App() {
  const [prices, setPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getPrice() {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
      const data = await response.json();
      setPrices(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { getPrice(); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CryptoNavbar />
      <main className="p-8 max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Market Overview</h1>
          <Button isLoading={isLoading} onPress={getPrice} color="primary">Refresh</Button>
        </div>

        {/* Pass the data into the component using "props" */}
        <CryptoTable items={prices} loading={isLoading} />
        
      </main>
    </div>
  );
}

export default App;