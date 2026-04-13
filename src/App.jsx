"use client";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CryptoNavbar from "./components/CryptoNavbar"; 

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

  const [favorites, setFavorite] = useState([]);

    const toggleFavorite = (id) => {
      setFavorites(prev =>
        prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
      );
    };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CryptoNavbar />
      <Outlet context={{ prices, isLoading, getPrice, favorites, toggleFavorite }} />
    </div>
  );
}

export default App;