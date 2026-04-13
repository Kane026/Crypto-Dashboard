import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { Button, Card, CardBody, User, Divider } from "@heroui/react";
import { useState, useEffect } from "react";

export default function CoinDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [coinDetail, setCoinDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
    async function getCoinDetail() {
      setIsLoading(true);
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        const data = await response.json();
        setCoinDetail(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  
    useEffect(() => { getCoinDetail(); }, []);
  

  const { prices } = useOutletContext(); 


  const coin = prices.find((item) => item.id === id);


  if (!coin) {
    return (
      <div className="p-8 text-center">
        <Button className="mt-4" onPress={() => navigate("/")}>Terug naar overzicht</Button>
      </div>
    );
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <Button 
        variant="light" 
        onPress={() => navigate(-1)} 
        className="mb-4"
      >
        ← Terug
      </Button>

      <Card className="p-4 shadow-md border-none bg-content1">
        <CardBody className="flex flex-col gap-4">
          <User
            name={coin.name}
            description={coin.symbol.toUpperCase()}
            avatarProps={{ src: coin.image, size: "lg" }}
            classNames={{ name: "text-2xl font-bold" }}
          />
          
          <Divider />

          <div className="grid grid-cols-2 gap-8 py-4">
            <div>
              <p className="text-default-400 text-tiny uppercase font-semibold">Huidige Prijs</p>
              <p className="text-2xl font-bold">${coin.current_price.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-default-400 text-tiny uppercase font-semibold">Market Cap Rank</p>
              <p className="text-2xl font-bold">#{coin.market_cap_rank}</p>
            </div>
            <div>
              <p className="text-default-400 text-tiny uppercase font-semibold">24u Hoog</p>
              <p className="text-success text-xl font-bold">${coin.high_24h.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-default-400 text-tiny uppercase font-semibold">24u Laag</p>
              <p className="text-danger text-xl font-bold">${coin.low_24h.toLocaleString()}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </main>
  );
}