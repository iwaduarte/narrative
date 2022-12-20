import React, { useEffect, useState } from "react";
import Error from "../error/error.jsx";
import Header from "../../_components/Header/Header.jsx";
import { getData } from "../../query.jsx";

import style from "./dataset.module.css";
import SelectModal from "../../_components/Modal/SelectModal.jsx";
import DatasetCard from "../../_components/Card/DatasetCard.jsx";

const { datasetClass, subHeading } = style;

const Datasets = ({ title }) => {
  const { data: datasets = [], hasError } = getData(`/datasets`);
  const { data: countries = [], hasError: hasErrorCountries } =
    getData(`/countries`);

  const [countriesSelected, setCountriesSelected] = useState([]);
  const [countriesName, setCountriesName] = useState(null);

  useEffect(() => {
    if (datasets && countries) {
      setCountriesSelected(countries);
      setCountriesName(countries?.map(({ name }) => name).join(` & `));
    }
  }, [datasets.length, countries.length]);

  const { datasetResults, datasetResultsLength } = datasets?.reduce(
    (acc, dataset) => {
      const datasetExtra = countriesSelected?.reduce(
        (acc, curr) => {
          const { storedData, name, countryCode } = curr;
          const { datasetId, recordCount } =
            storedData?.find(({ datasetId }) => datasetId === dataset.id) || {};
          if (datasetId) {
            acc.totalAvailableRecords += recordCount;
            acc.countries.push({ countryCode, name });
          }
          return acc;
        },
        {
          totalAvailableRecords: 0,
          countries: [],
        }
      );

      if (!datasetExtra.totalAvailableRecords) return acc;

      const _dataset = { ...dataset, ...datasetExtra };

      acc.datasetResults.push(<DatasetCard key={dataset.id} {..._dataset} />);
      acc.datasetResultsLength += 1;
      return acc;
    },
    { datasetResults: [], datasetResultsLength: 0 }
  );

  const handleClick = (countriesSelection) => {
    const { countriesNameList, newCountriesSelected } = countries.reduce(
      (acc, country) => {
        const { countryCode, name } = country;
        if (!countriesSelection[countryCode]) {
          acc.newCountriesSelected.push(country);
          acc.countriesNameList.push(name);
        }
        return acc;
      },
      { newCountriesSelected: [], countriesNameList: [] }
    );
    setCountriesName(countriesNameList.join(` & `));
    setCountriesSelected(newCountriesSelected);
  };

  if (hasError || hasErrorCountries) return <Error />;
  if (!datasets || !countries) return <div>Loading...</div>;

  return (
    <div>
      <Header title={title} />
      <div className={subHeading}>
        <div>
          Showing <strong>{datasetResultsLength}</strong> results from{" "}
          <strong>{countriesName} </strong>
        </div>
      </div>
      <div className={datasetClass}>{datasetResults}</div>
      <SelectModal
        title={"Included countries"}
        items={countries}
        onClick={handleClick}
      />
    </div>
  );
};

export default Datasets;
