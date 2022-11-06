import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import styles from "./index.module.scss";
import { useMediaQuery }  from "react-responsive";
import { maxBreakpoints } from "../../helpers/configs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import noScroll from "no-scroll";
import CheckboxFilter from "../CheckboxFilter/CheckboxFilter";
import RangeFilter from "../RangeFilter/RangeFilter";

function FilterModal(props) {
  const {
    setModalOpen,
    children,
  } = props;

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h5 className={styles.modalTitle}>Filters</h5>
          <button className={styles.closeButton} onClick={() => setModalOpen(false)}>
            <FontAwesomeIcon icon={faXmark}/>
          </button>
        </div>
        <div className={styles.modalBody}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default function FiltersContainer(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [currentMinMaxExpectedTime, setCurrentMinMaxExpectedTime] = useState([null, null])
  const [currentMinMaxLength, setCurrentMinMaxLength] = useState([null, null])
  const [currentMinMaxAscent, setCurrentMinMaxAscent] = useState([null, null])
  const isMobile = useMediaQuery({ maxWidth: maxBreakpoints.tabletLandscape });

  const geograficAreaFacets = [
    {
      id: "nord-est",
      value: "nord-est",
      label: "nord est",
    },
    {
      id: "nord-ovest",
      value: "nord-ovest",
      label: "nord ovest",
    },
    {
      id: "center",
      value: "center",
      label: "center",
    },
    {
      id: "south",
      value: "south",
      label: "south",
    },
  ];

  const difficultyFacets = [
    {
      id: "easy",
      value: "easy",
      label: "easy",
    },
    {
      id: "medium",
      value: "medium",
      label: "medium",
    },
    {
      id: "hard",
      value: "hard",
      label: "hard",
    },
  ];

  const expectedTimeFacets = [
    3037,
    3231,
    3314,
    3406,
    3474,
    3589,
    3611,
    3642,
    3777,
    3792,
    3825,
    3915,
    3999,
    4019,
    4159,
    4205,
    4735,
    4743,
    4883,
    5003,
    5012,
    5469
  ]

  const lengthFacets = [
    3037,
    3231,
    3314,
    3406,
    3474,
    3589,
    3611,
    3642,
    3777,
    3792,
    3825,
    3915,
    3999,
    4019,
    4159,
    4205,
    4735,
    4743,
    4883,
    5003,
    5012,
    5469
  ]

  const ascentFacets = [
    10,
    20,
    30,
    35,
    40,
    5,
    7,
    6,
    9
  ]

  const addFilter = (key, id) => {
    setFilters(prevFilters => [...prevFilters, {key: key, id:id}])
  }

  const removeFilter = (key, id) => {
    let newFilter = filters.filter(prevFilter => {
      return prevFilter.key !== key || (prevFilter.key === key  && prevFilter.id !== id)
    })
    setFilters(newFilter)
  }

  const removeAndAddFilter = (key, min, max) => {
    let newFilter = filters.filter(prevFilter => prevFilter.key !== key);
    newFilter.push({key: key, values: [min, max]});
    setFilters(newFilter);
  }

  const geograficFilters = () => {
    return (
      <CheckboxFilter
        title="Geografic area"
        name="geografic-area"
        facets={geograficAreaFacets}
        filters={filters}
        addFilter={addFilter}
        removeFilter={removeFilter}
      />
    )
  }

  const difficultyFilter = () => {
    return (
      <CheckboxFilter
        title="Difficulty"
        name="difficulty"
        facets={difficultyFacets}
        filters={filters}
        addFilter={addFilter}
        removeFilter={removeFilter}
      />
    )
  }

  const expectedTimeFilter = () => {
    return (
      <RangeFilter
        title={"Expected time"}
        arrayRange={expectedTimeFacets}
        currentMinMax={currentMinMaxExpectedTime}
        setCurrentMinMax={setCurrentMinMaxExpectedTime}
        keyFilter="expected-time"
        handleChange={removeAndAddFilter}
        minValue={currentMinMaxExpectedTime[0]}
        maxValue={currentMinMaxExpectedTime[1]}
        isTime={true}
      />
    )
  }

  const lengthFilter = () => {
    return (
      <RangeFilter
        title={"Length"}
        arrayRange={lengthFacets}
        currentMinMax={currentMinMaxLength}
        setCurrentMinMax={setCurrentMinMaxLength}
        keyFilter="length"
        handleChange={removeAndAddFilter}
        minValue={currentMinMaxLength[0]}
        maxValue={currentMinMaxLength[1]}
        isLength={true}
      />
    )
  }

  const ascentFilter = () => {
    return (
      <RangeFilter
        title={"Total ascent"}
        arrayRange={ascentFacets}
        currentMinMax={currentMinMaxAscent}
        setCurrentMinMax={setCurrentMinMaxAscent}
        keyFilter="ascent"
        handleChange={removeAndAddFilter}
        minValue={currentMinMaxAscent[0]}
        maxValue={currentMinMaxAscent[1]}
        isPercentage={true}
      />
    )
  }

  useEffect(() => {
    if (modalOpen) {
      setModalOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (modalOpen) {
      noScroll.on();
    } else {
      noScroll.off();
    }
  }, [modalOpen]);

  return (
    <>
      <div className={styles.wrap}>
        {isMobile && (
          <button className={styles.button} onClick={() => setModalOpen(true)}>
            Filters <FontAwesomeIcon icon={faFilter}/>
          </button>
        )}
        {!isMobile && (
          <>
            <h5 className={styles.filtersTitle}>Filters</h5>
            {geograficFilters()}
            {difficultyFilter()}
            {expectedTimeFilter()}
            {lengthFilter()}
            {ascentFilter()}
          </>
        )}
      </div>
      {modalOpen && (
        ReactDom.createPortal(
          <FilterModal setModalOpen={setModalOpen}>
            {geograficFilters()}
            {difficultyFilter()}
            {expectedTimeFilter()}
            {lengthFilter()}
            {ascentFilter()}
          </FilterModal>,
          document.getElementById("modal-root")
        )
      )}
    </>
  )
}