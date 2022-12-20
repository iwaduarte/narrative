import React, { useEffect, useState } from "react";
import Card from "../../_components/Card/OrderItemCard.jsx";
import SelectModal from "../../_components/Modal/SelectModal.jsx";
import style from "./buyOrders.module.css";
import Header from "../../_components/Header/Header.jsx";
import { useNavigate } from "react-router-dom";
import { getData } from "../../query.jsx";
import Error from "../error/error.jsx";
import Button from "../../_components/Button/Button.jsx";

const { cardContainer } = style;

const BuyOrders = ({ title }) => {
  const { data: orders = [], hasError } = getData(`/buy-orders`);
  const { data: countries = [], hasError: errorCountries } =
    getData(`/countries`);

  const [countriesSelected, setCountriesSelected] = useState([]);
  const [countriesName, setCountriesName] = useState(null);

  useEffect(() => {
    if (orders && countries) {
      setCountriesName(countries?.map(({ name }) => name).join(` & `));
      setCountriesSelected(countries?.map(({ countryCode }) => countryCode));
    }
  }, [orders.length, countries.length]);

  if (hasError || errorCountries) return <Error />;
  if (!orders || !countries) return <div>Loading...</div>;

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    return navigate(`/narrative/details/${id}`);
  };

  const handleSelectClick = (countriesSelection) => {
    const { countriesNameList, newCountriesSelected } = countries.reduce(
      (acc, country, index) => {
        const { countryCode, name } = country;
        if (!countriesSelection[countryCode]) {
          acc.newCountriesSelected.push(countryCode);
          acc.countriesNameList.push(name);
        }
        return acc;
      },
      { newCountriesSelected: [], countriesNameList: [] }
    );
    setCountriesName(countriesNameList.join(` & `));
    setCountriesSelected(newCountriesSelected);
  };

  const handleClick = () => {
    return navigate("/narrative/new-order");
  };

  const { orderResultsLength, orderResults } = orders?.reduce(
    (acc, order) => {
      if (
        !countriesSelected.some((countryCode) =>
          order.countries.includes(countryCode)
        )
      )
        return acc;

      acc.orderResults.push(
        <Card
          key={order.id}
          field={order}
          onClick={() => handleCardClick(order.id)}
        />
      );
      acc.orderResultsLength += 1;
      return acc;
    },
    {
      orderResultsLength: 0,
      orderResults: [],
    }
  );

  return (
    <div>
      <Header
        title={title}
        subHeader={`Showing ${orderResultsLength} results from  ${countriesName}`}
      />
      <div className={cardContainer}>{orderResults}</div>
      <Button value="New Buy Order" onClick={handleClick} />
      <SelectModal
        title={"Included countries"}
        items={countries}
        onClick={handleSelectClick}
      />
    </div>
  );
};

export default BuyOrders;
