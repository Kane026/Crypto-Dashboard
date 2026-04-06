import React from "react";
import { Button, Input } from "@heroui/react"; 
import CryptoTable from "../components/CryptoTable";
import { useOutletContext, useSearchParams } from "react-router-dom";

export default function Home() {
  const { prices, isLoading, getPrice } = useOutletContext();
  

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || ""; 
  const filteredPrices = prices.filter((coin) =>
    coin.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="p-8 max-w-5xl mx-auto flex flex-col gap-6">
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">Market Overview</h1>
        

        <Input
          placeholder="Search coin..."
          className="max-w-xs"
          value={query}
          onValueChange={(value) => setSearchParams({ search: value })}
        />

        <Button isLoading={isLoading} onPress={getPrice} color="primary">
          Refresh
        </Button>
      </div>

      <CryptoTable items={filteredPrices} loading={isLoading} />
    </main>
  );
}