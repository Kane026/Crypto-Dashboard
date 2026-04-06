import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";

const columns = [
  { name: "RANK", uid: "market_cap_rank" },
  { name: "COIN", uid: "name" },
  { name: "PRICE", uid: "current_price" },
  { name: "24H CHANGE", uid: "price_change_percentage_24h" },
  { name: "FAVORITE", uid: "favorite" }
  
];

export default function CryptoTable({ items, loading }) {

  const navigate = useNavigate();

  const renderCell = React.useCallback((coin, columnKey) => {
    const cellValue = coin[columnKey];

    switch (columnKey) {
      case "market_cap_rank":
        return <p className="text-default-400">#{cellValue}</p>;
      case "name":
        return (
          <User
            avatarProps={{ radius: "full", src: coin.image, size: "sm" }}
            description={coin.symbol.toUpperCase()}
            name={cellValue}
          />
        );
      case "current_price":
        return <p className="font-bold">${cellValue.toLocaleString()}</p>;
      case "price_change_percentage_24h":
      const isPositive = cellValue >= 0;
      return (
        <p className={`font-medium ${isPositive ? "text-success" : "text-danger"}`}>
          {isPositive ? "▲" : "▼"} {Math.abs(cellValue).toFixed(2)}%
        </p>
      );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Crypto market table" shadow="sm" selectionMode="single" onRowAction={(key) => navigate(`/coin/${key}`)}>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "price_change_percentage_24h" ? "end" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items} loadingContent={"Loading coins..."} isLoading={loading}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}