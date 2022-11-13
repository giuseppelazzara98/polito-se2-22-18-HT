import React from "react";
import styles from "./index.module.scss";
import CustomCheckbox from "./CustomCheckbox";

export default function CheckboxFilter(props) {
  const {
    title = "",
    facets = [],
    filters = [],
    name = "",
    addFilter = () => {},
    removeFilter = () => {},
  } = props;

  return (
    <>
      <h6 className={styles.filterTitle}>{title}</h6>
      <div className={styles.filterWrap}>
        {facets?.map((facet, index)  => (
          <CustomCheckbox
            key={index}
            checked={filters.filter(filter => filter.key === name && filter.id === facet.id)?.length > 0}
            id={facet.id}
            name={name}
            value={facet.value}
            label={facet.label}
            addFilter={addFilter}
            removeFilter={removeFilter}
          />
        ))}
      </div>
    </>
  )
}