import React, { useContext, useEffect, useState } from "react";
import styles from "./index.module.scss";
import "rheostat/initialize";
import Rheostat from "rheostat";
import dayjs from "dayjs";

var duration = require('dayjs/plugin/duration');
dayjs.extend(duration);
var toObject = require('dayjs/plugin/toObject')
dayjs.extend(toObject)

const RangeFilterContext = React.createContext({});

const Test = ({ style, children }) => {
  const { arrayRange, range, pitNumber } =
    useContext(RangeFilterContext);

  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (arrayRange) {
      let count = 0;
      for (let index = 0; index < arrayRange.length; index++) {
        const element = arrayRange[index];
        if (element >= children && element <= children + range / pitNumber) {
          count++;
        }
      }
      if (count === 0) {
        setHeight(0);
      } else if (count < arrayRange?.length / 10) {
        setHeight(1);
      } else if (count < arrayRange?.length / 8) {
        setHeight(2);
      } else if (count < arrayRange?.length / 6) {
        setHeight(3);
      } else {
        setHeight(4);
      }
    }
  }, [arrayRange]);

  const customHeight =
    height === 0
      ? styles.height0
      : height === 1
      ? styles.height1
      : height === 2
      ? styles.height2
      : height === 3
      ? styles.height3
      : styles.height4;

  return <div className={`${styles.pit} ${customHeight}`} style={style}></div>;
};

export default function RangeFilter(props) {
  const {
    title,
    arrayRange,
    handleChange,
    setCurrentMinMax,
    currentMinMax,
    keyFilter,
    minValue,
    maxValue,
    isTime = false,
    isPercentage = false,
    isLength = false,
  } = props;

  const [pitArray, setPitArray] = useState([]);

  const minRange = arrayRange ? Math.min(...arrayRange) : 0;
  const maxRange = arrayRange ? Math.max(...arrayRange) : 1000;

  const range = maxRange - minRange;

  
  const pitNumber = 20;

  useEffect(() => {
    if (arrayRange?.length) {
      let pitArray = [];
      for (let index = 0; index < pitNumber; index++) {
        pitArray.push(minRange + index * (range / pitNumber));
      }
      setPitArray(pitArray);
    }
  }, [arrayRange]);

  const updatePrice = (sliderStates) => {
    setCurrentMinMax([sliderStates?.values[0], sliderStates?.values[1]]);
  };

  const applyFilter = () => {
    handleChange(keyFilter, currentMinMax[0], currentMinMax[1]);
  };

  const formatDuration = (duration) => {
    let days = parseInt(dayjs.duration(duration, "hours").asDays()) ?? "";
    let hours = dayjs.duration(duration, "hours").format("HH");
    let minutes = dayjs.duration(duration, "hours").format("mm");
    
    return `${days > 0 ? `${days} d ` : ""}${hours} h ${minutes} m`;
  }

  return (
    <RangeFilterContext.Provider
      value={{ arrayRange, range, pitNumber, minRange }}
    >
      <div className={styles.container}>
        {(arrayRange && arrayRange?.length > 0) && (
          <>
            <div className={styles.filterTitle}>
              {title}
            </div>
            <div className={styles.selectRange}>
              <Rheostat
                pitComponent={Test}
                pitPoints={pitArray}
                onValuesUpdated={updatePrice}
                onSliderDragEnd={applyFilter}
                min={minRange}
                max={maxRange}
                background={() => {}}
                values={[minValue || minRange, maxValue || maxRange]}
                progressBar={({ ...progressBarProps }) => (
                  <div
                    {...progressBarProps}
                    className={styles.progressBar}
                  ></div>
                )}
                handle={({ className: _, handleRef, ...handleProps }) => (
                  <div
                    {...handleProps}
                    className={`${_} ${styles.handleContainer}`}
                  >
                    <div className={styles.tooltip}>
                      {isTime ?
                          formatDuration(handleProps["aria-valuenow"])
                        :
                          isLength ? 
                            `${handleProps["aria-valuenow"]} km`
                          : `${handleProps["aria-valuenow"]/100} %`
                      }
                    </div>
                    <div className={`${styles.handleButton}`}></div>
                  </div>
                )}
              />
            </div>
          </>
        )}
      </div>
    </RangeFilterContext.Provider>
  );
};
