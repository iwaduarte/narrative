import React from "react";

import Error from "../error/error.jsx";

import { getData } from "../../query.jsx";
import BuyOrdersDetailForm from "../../_components/Form/buyOrdersDetailForm.jsx";

const newBuyOrdersDetail = ({ title, isNew }) => {
  const {
    data: countriesList = [],
    hasError: errorCountries,
    isLoading: isLoadingCountries,
  } = getData(`/countries`);
  const {
    data: datasetsList = [],
    hasError: errorDataSets,
    isLoading: isLoadingDataset,
  } = getData(`/datasets`);

  if (errorCountries || errorDataSets) return <Error />;
  if (isLoadingCountries || isLoadingDataset) return <div>Loading...</div>;

  return (
    <BuyOrdersDetailForm
      title={title}
      isNew
      datasetsList={datasetsList}
      countriesList={countriesList}
    />
  );
};

export default newBuyOrdersDetail;
