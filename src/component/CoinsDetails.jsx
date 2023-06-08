import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import { server } from '..';
import {useParams} from 'react-router-dom'
import Error from './Error';
import CustomBar from './CustomBar';
import  Chart  from './Chart';




const CoinsDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
 const  [days,setDays] = useState("24h");
 const  [chartArray,setChartArray] = useState([])
  const [currency, setCurrency] = useState("inr");
  const params = useParams();
  const currencySybmol =currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const btns = ["24h", "7d", "14d", "30d", "60d" ,"200d", "365d", "max" ];
  const switchChartStates=(key)=>{
  switch(key){
case "24h":
  setDays("24h");
  setLoading(true);
  break;
  case "7d":
    setDays("7d");
    setLoading(true);
    break;
    case "14d":
      setDays("14d");
      setLoading(true);
      break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
        case "60d":
          setDays("60d");
          setLoading(true);
          break;
          case "200d":
            setDays("200d");
            setLoading(true);
            break;
            case "365d":
              setDays("365d");
              setLoading(true);
              break;
              case "max":
                setDays("max");
                setLoading(true);
                break;

default:
  setDays("24h");
  setLoading(true);
  break;
  }
  }
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/${params.id}`
        );
        const {data:chartData} = await axios.get( `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
     console.log(data)
        setCoin(data);
        setChartArray(chartData.prices);
        console.log(chartData)


        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id,currency,days]);
  if (error) {
    return <Error message={'error while fetching coins'}/>;
  }
  return (
    <Container maxW={"container.xl"}>
     {
      loading ? <Loader/> : (
        <>
          <Box borderWidth={1} width={"full"}>
           <Chart arrr={chartArray} currency={currencySybmol} days={days}/>
          </Box>

<HStack padding={"4"} overflowX={"auto"}>
{
  btns.map((item)=>{
    return (
      <Button key={item} onClick={()=> switchChartStates(item)}>{item}</Button>
    )
  })
}
</HStack>

          <RadioGroup defaultValue={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>
          <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}> Last  Updated on {Date(coin.market_data.last_updated).split("G")[0]}</Text>
            <Image src={coin.image.large} w={"16"} h={"16"} objectFit={"contain"}></Image>
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>{currencySybmol}{coin.market_data.current_price[currency]}</StatNumber>
              <StatHelpText>
                <StatArrow type={coin.market_data.price_change_percentage_24h>0 ? "increasing":"decreasing"}/>
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"}>
              {`#${coin.market_cap_rank}`}
            </Badge>
          <CustomBar high={`${currencySybmol}${coin.market_data.high_24h[currency]}`} low={`${currencySybmol}${coin.market_data.low_24h[currency]}`}/>
          <Box w={"full"} p={"4"}>
           <Item title={"Max Supply"} value={coin.market_data.max_supply}/>
           <Item title={"Circulating Supply "} value={coin.market_data.circulating_supply}/>
           <Item title={"Market Capital Supply"} value={`${currencySybmol}${coin.market_data.market_cap[currency]}`}/>
           <Item title={"All Time Low"} value={`${currencySybmol}${coin.market_data.atl[currency]}`}/>
           <Item title={"All Time High"} value={`${currencySybmol}${coin.market_data.ath[currency]}`}/>
          </Box>
          </VStack>
           
        </>
      )
     }

    </Container>
  )
}
const Item = ({title,value})=>{
  return(
    <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
      <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
      <Text>{value}</Text>
    </HStack>
  )
}


export default CoinsDetails