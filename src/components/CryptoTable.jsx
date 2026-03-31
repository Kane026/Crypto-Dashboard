import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User } from "@heroui/react";

const columns = [
  { name: "RANK", uid: "market_cap_rank" },
  { name: "COIN", uid: "name" },
  { name: "PRICE", uid: "current_price" },
];

export default function CryptoTable({ items, loading }) {
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
        return (
          <p className={cellValue >= 0 ? "text-success" : "text-danger"}>
            {cellValue.toFixed(2)}%
          </p>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Crypto market table" shadow="sm">
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