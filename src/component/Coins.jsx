import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Loader } from "../component";
import Error from "./Error";
import CoinsCard from "./CoinsCard";
const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySybmol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };
  const btns = new Array(132).fill();
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );

        setCoins(data);

        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);
  if (error) {
    return <Error />;
  }
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
            <RadioGroup defaultValue={currency} onChange={setCurrency} p={"8"}>
              <HStack spacing={"4"}>
                <Radio value={"inr"}>INR</Radio>
                <Radio value={"usd"}>USD</Radio>
                <Radio value={"eur"}>EUR</Radio>
              </HStack>
            </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((item) => (
              <CoinsCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.current_price}
                img={item.image}
                sybmol={item.sybmol}
                currencySybmol={currencySybmol}
                url={item.url}
              />
            ))}
          </HStack>
        </>
      )}
      <HStack w={"full"} overflowX={"auto"} padding={"8"}>
        {btns.map((item, index) => {
          return (
            <Button
              key={index}
              bgColor={"blackAlpha.900"}
              color={"white"}
              onClick={() => {
                changePage(index + 1);
              }}
            >
              {index + 1}
            </Button>
          );
        })}
      </HStack>
    </Container>
  );
};

export default Coins;
