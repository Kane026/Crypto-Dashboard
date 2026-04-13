import MarketShareChart from "../components/MarketShareChart";
import { useOutletContext } from "react-router-dom";

export default function Charts() {
  const { prices, isLoading } = useOutletContext();

  return (
    <div className="pt-4 px-8 pb-8 flex flex-col items-center w-full"> 
      
      <h1 className="text-2xl font-bold mb-1 text-center w-full"> 
        Market Share Grafiek 
      </h1>
      
      <div className="w-full max-w-4xl mt-0"> 
        {!isLoading && prices && prices.length > 0 ? (
          <MarketShareChart coins={prices} />
        ) : (
          <div className="flex justify-center items-center h-40">
            <p className="text-default-500 italic">Data wordt geladen...</p>
          </div>
        )}
      </div>
    </div>
  );
}