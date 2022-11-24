import React, { useState } from "react";
import styles from "./index.module.scss";
import Select from 'react-select';


export default function SelectFilter(props) {
  const {
    title = "",
    facets = [],
    name = "",
    filters = [],
    isDisabled = false,
    removeAndAddFilter = () => { },
  } = props;

  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <h6 className={styles.filterTitle}>{title}</h6>
      <Select
        className={styles.customSelect}
        classNamePrefix="select"
        isClearable={true}
        isSearchable={true}
        isDisabled={isDisabled}
        name={name}
        options={facets}
        onChange={(val) => {
          removeAndAddFilter(name, val?.id);

          if (name === "provinces" && val !== null) {
            props.setIsMunDisabled(false);
            props.setFetchMunicipalities(true);
          }
          else if (name === "provinces" && val === null) {
            props.setIsMunDisabled(true);
            removeAndAddFilter("municipalities", val?.id);
          }

        }}
        inputValue={inputValue}
        onInputChange={(newString) => setInputValue(newString)}
        defaultValue={facets?.filter(facet => facet.id === filters?.filter(filterSelected => filterSelected.key === name)?.[0]?.id)?.[0] || null}
      />
    </>
  )
}