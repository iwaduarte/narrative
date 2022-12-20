import React from "react";
import PreviewDataSetCard from "../Card/PreviewDataSetCard.jsx";
import Button from "../Button/Button.jsx";
import style from "../../pages/buyOrdersDetails/buyOrdersDetails.module.css";
import { Field, Form, Formik } from "formik";
import { format, parseISO } from "date-fns";
import Header from "../Header/Header.jsx";
import { useNavigate } from "react-router-dom";
import { createData, updateData } from "../../query.jsx";

const {
  box,
  inline,
  actions,
  actionsForm,
  datasetClass,
  inputField,
  field,
  error,
} = style;

const buyOrderInitialValues = {
  name: "",
  createdAt: new Date().toISOString(),
  datasetIds: [],
  countries: [],
  budget: 0,
};

const BuyOrdersDetailForm = ({
  title = "",
  isNew = false,
  data = buyOrderInitialValues,
  datasetsList,
  countriesList,
}) => {
  const { createdAt } = data || {};
  const navigate = useNavigate();
  const formattedDate = isNew
    ? createdAt
    : format(parseISO(createdAt), "MM/dd/yyyy");

  const handleSubmit = async (values) => {
    isNew
      ? await createData("/buy-orders", values)
      : await updateData(`/buy-orders/${values.id}`, values);
    return navigate("/narrative");
  };

  const handleDatasetClick = (fieldName, value, ids, setField) => {
    if (ids.includes(value))
      return setField(
        fieldName,
        ids.filter((id) => id !== value)
      );
    return setField(fieldName, [...ids, value]);
  };

  const validateBudget = (value) => {
    if (!isNaN(parseFloat(value)) && !isNaN(value - 0) && value >= 0) return;

    return "Budget should be a positive number.";
  };

  const validateOrderName = (value) => {
    if (!value.length) {
      return "Order name shouldn't be empty";
    }
  };

  return (
    <Formik initialValues={data} onSubmit={handleSubmit}>
      {({ values, setFieldValue, errors, touched }) => {
        const { datasetIds, countries } = values || {};
        return (
          <div>
            <Header title={title} />
            <div className={box}>
              <Form>
                <div className={inline}>
                  <div>
                    <h4>Order name</h4>
                    {errors.name && touched.name && (
                      <div className={error}>{errors.name}</div>
                    )}
                    <Field
                      className={`${inputField} ${field}`}
                      name="name"
                      type="text"
                      validate={validateOrderName}
                    />
                  </div>
                  <div style={{ color: "#5f5c5c" }}>
                    <h4>Date Created</h4>
                    <h3>{formattedDate}</h3>
                  </div>
                </div>
                <div>
                  <h4>Budget</h4>
                  {errors.budget && touched.budget && (
                    <div className={error}>{errors.budget}</div>
                  )}
                  <div className={inputField}>
                    <span> $</span>
                    <Field
                      name="budget"
                      type="text"
                      validate={validateBudget}
                    />
                  </div>
                </div>
                <div>
                  <h4>Included datasets</h4>
                  <div className={datasetClass}>
                    {datasetsList?.map((dataset) => {
                      const { id } = dataset;
                      const selectedDataset = datasetIds?.find(
                        (datasetListId) => datasetListId === id
                      );

                      return (
                        <PreviewDataSetCard
                          isSelected={!!selectedDataset}
                          key={id}
                          {...dataset}
                          onClick={() =>
                            handleDatasetClick(
                              "datasetIds",
                              id,
                              values.datasetIds,
                              setFieldValue
                            )
                          }
                          clickable
                        />
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h4>Included Countries</h4>
                  <h3>
                    {countriesList?.map((country) => {
                      const { countryCode, name } = country || {};
                      const selectedCountries = countries.includes(countryCode);

                      return (
                        <Button
                          disabled={!selectedCountries}
                          key={countryCode}
                          value={name}
                          onClick={() =>
                            handleDatasetClick(
                              "countries",
                              countryCode,
                              values.countries,
                              setFieldValue
                            )
                          }
                        />
                      );
                    })}
                  </h3>
                </div>
                <div className={`${actions} ${actionsForm}`}>
                  <Button
                    key="editButton"
                    noRadius
                    type="submit"
                    value={isNew ? "Create Order" : "Save"}
                  />
                </div>
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default BuyOrdersDetailForm;
