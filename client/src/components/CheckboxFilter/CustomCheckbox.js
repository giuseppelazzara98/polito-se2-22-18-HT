import React from "react";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from "@fortawesome/free-regular-svg-icons"

export default function CustomCheckbox(props) {
  const {
    checked = false,
    id = "",
    name = "",
    value = "",
    label = "",
    addFilter = () => {},
    removeFilter = () => {},
  } = props;

  return (
    <div className={styles.wrap}>
      <input className={styles.input} type="checkbox" checked={checked} id={id} name={name} value={value} onChange={() => checked ? removeFilter(name, id) : addFilter(name, id)}/>
      <label htmlFor={id} className={styles.label}>
        <FontAwesomeIcon className={styles.checkmark} icon={checked ? faSquareCheck : faSquare}/>
        {label}
      </label>
    </div>
  )
}