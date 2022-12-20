import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { format, parseISO } from "date-fns";
import Header from "../../_components/Header/Header.jsx";
import Error from "../error/error.jsx";

import style from "./buyOrdersDetails.module.css";
import Button from "../../_components/Button/Button.jsx";
import PreviewDataSetCard from "../../_components/Card/PreviewDataSetCard.jsx";
import { deleteData, getData } from "../../query.jsx";
import BuyOrdersDetailForm from "../../_components/Form/buyOrdersDetailForm.jsx";

const { box, inline, actions, datasetClass } = style;

const BuyOrdersDetails = ({ title, isNew }) => {
  const { id } = useParams();

  const {
    data: order = [],
    hasError,
    isLoading,
  } = getData(`/buy-orders/${id}`);
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

  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  if (hasError || errorCountries || errorDataSets) return <Error />;
  if (isLoading || isLoadingCountries || isLoadingDataset)
    return <div>Loading...</div>;

  const { name, createdAt, budget, datasetIds, countries } = order || {};
  const formattedDate = createdAt && format(parseISO(createdAt), "MM/dd/yyyy");

  const handleDelete = async (id) => {
    await deleteData(`/buy-orders/${id}`);
    return navigate("/narrative");
  };

  return isEdit ? (
    <BuyOrdersDetailForm
      title="Edit Buy Order"
      data={isNew ? {} : order}
      datasetsList={datasetsList}
      countriesList={countriesList}
    />
  ) : (
    <div>
      <Header title={title} />
      <div className={box}>
        <div className={inline}>
          <div>
            <h4>Order name</h4>
            <h3>{name}</h3>
          </div>
          <div>
            <h4>Date Created</h4>
            <h3>{formattedDate}</h3>
          </div>
        </div>
        <div>
          <h4>Budget</h4>
          <h3>${budget}</h3>
        </div>
        <div>
          <h4>Included datasets</h4>
          <div className={datasetClass}>
            {datasetIds?.map((datasetId) => {
              const dataset = datasetsList?.find(
                ({ id: datasetListId }) => datasetListId === datasetId
              );
              return (
                dataset && <PreviewDataSetCard key={datasetId} {...dataset} />
              );
            })}
          </div>
        </div>
        <div>
          <h4>Included Countries</h4>
          <h3>
            {countries?.map((country) => {
              const countryList = countriesList?.find(
                ({ countryCode }) => country === countryCode
              );
              const { countryCode, name } = countryList || {};
              return countryList && <Button key={countryCode} value={name} />;
            })}
          </h3>
        </div>
        <div className={actions}>
          <Button
            key="editButton"
            noRadius
            value="Edit Order"
            onClick={() => setIsEdit(true)}
          />
          <Button
            key="deleteButton"
            noRadius
            value="Delete Order"
            onClick={() => handleDelete(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default BuyOrdersDetails;
