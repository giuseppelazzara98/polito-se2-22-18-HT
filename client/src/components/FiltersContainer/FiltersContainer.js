import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import styles from './index.module.scss';
import { useMediaQuery } from 'react-responsive';
import { maxBreakpoints } from '../../helpers/configs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import noScroll from 'no-scroll';
import CheckboxFilter from '../CheckboxFilter/CheckboxFilter';
import RangeFilter from '../RangeFilter/RangeFilter';
import SelectFilter from '../SelectFilter/SelectFilter';
import RadiusMapFilter from '../RadiusMapFilter/RadiusMapFilter';

function FilterModal(props) {
	const { setModalOpen, children } = props;

	return (
		<div className={styles.modalBackground}>
			<div className={styles.modal}>
				<div className={styles.header}>
					<h5 className={styles.modalTitle}>Filters</h5>
					<button
						className={styles.closeButton}
						onClick={() => setModalOpen(false)}
					>
						<FontAwesomeIcon icon={faXmark} />
					</button>
				</div>
				<div className={styles.modalBody}>{children}</div>
			</div>
		</div>
	);
}

export default function FiltersContainer(props) {
  const { filters, setFilters, facets, provincesFacets, municipalitiesFacets, setFetchMunicipalities, hikesPoints, hikesForDistance } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMinMaxExpectedTime, setCurrentMinMaxExpectedTime] = useState([null, null])
  const [currentMinMaxLength, setCurrentMinMaxLength] = useState([null, null])
  const [currentMinMaxAscent, setCurrentMinMaxAscent] = useState([null, null])
  const isMobile = useMediaQuery({ maxWidth: maxBreakpoints.tabletLandscape });
  const [inputValueProvince, setInputValueProvince] = useState("");
  const [inputValueMunicipalities, setInputValueMunicipalities] = useState("");
  const [radiusCenter, setRadiusCenter] = useState({center:[44.58665046840906, 7.382619129493833],radius:1000});//Turin
  const geograficAreaFacets = provincesFacets;
  const munFacets = municipalitiesFacets;

	const difficultyFacets = [
		{
			id: 1,
			value: 'tourist',
			label: 'tourist'
		},
		{
			id: 2,
			value: 'hiker',
			label: 'hiker'
		},
		{
			id: 3,
			value: 'professional-hiker',
			label: 'professional hiker'
		}
	];

	const expectedTimeFacets = facets?.distinctTimes;

	const lengthFacets = facets?.distinctLengths;

	const ascentFacets = facets?.distinctAscents;

	const addFilter = (key, id) => {
		setFilters((prevFilters) => [...prevFilters, { key: key, id: id }]);
	};

	const removeFilter = (key, id) => {
		let newFilter = filters.filter((prevFilter) => {
			return (
				prevFilter.key !== key ||
				(prevFilter.key === key && prevFilter.id !== id)
			);
		});
		setFilters(newFilter);
	};

	const removeAndAddFilter = (key, min, max) => {
		let newFilter = filters.filter((prevFilter) => prevFilter.key !== key);
		newFilter.push({ key: key, values: [min, max] });
		setFilters(newFilter);
	};

	const removeAndAddFilterSelect = (key, id) => {
		let newFilter = filters.filter((prevFilter) => prevFilter.key !== key);
		if (geograficAreaFacets?.find((geoOption) => geoOption.id === id)) {
			setFetchMunicipalities(id);
			newFilter.push({ key: key, id: id });
		} else if (munFacets?.find((munOption) => munOption.id === id)) {
			newFilter.push({ key: key, id: id });
		} else {
			if (key === 'provinces') {
				setInputValueMunicipalities('');
				newFilter = newFilter.filter(
					(filterEl) => filterEl.key !== 'municipalities'
				);
			}
		}
		setFilters(newFilter);
	};

	const geograficFilters = () => {
		return (
			<>
				<SelectFilter
					title="Province"
					name="provinces"
					setFetchMunicipalities={setFetchMunicipalities}
					facets={geograficAreaFacets}
					filters={filters}
					removeAndAddFilter={removeAndAddFilterSelect}
					inputValue={inputValueProvince}
					setInputValue={setInputValueProvince}
				/>
				<SelectFilter
					title="Municipality"
					name="municipalities"
					isDisabled={
						(
							filters?.filter((filterEl) => filterEl.key === 'provinces')
								?.length == 0
						)
					}
					facets={munFacets}
					filters={filters}
					removeAndAddFilter={removeAndAddFilterSelect}
					inputValue={inputValueMunicipalities}
					setInputValue={setInputValueMunicipalities}
				/>
			</>
		);
	};

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
		);
	};
  const radiusFilter = () => {
    return (
    <RadiusMapFilter
    title = "Distance from"
    name = "radius"
    setRadiusCenter = {setRadiusCenter}
    radiusCenter = {radiusCenter}
    hikesPoints = {hikesPoints}
	hikesForDistance = {hikesForDistance}

    />
    
    )
  }
  

	const expectedTimeFilter = () => {
		return (
			<RangeFilter
				title={'Expected time'}
				arrayRange={expectedTimeFacets}
				currentMinMax={currentMinMaxExpectedTime}
				setCurrentMinMax={setCurrentMinMaxExpectedTime}
				keyFilter="expected-time"
				handleChange={removeAndAddFilter}
				minValue={currentMinMaxExpectedTime[0]}
				maxValue={currentMinMaxExpectedTime[1]}
				isTime={true}
			/>
		);
	};

	const lengthFilter = () => {
		return (
			<RangeFilter
				title={'Length'}
				arrayRange={lengthFacets}
				currentMinMax={currentMinMaxLength}
				setCurrentMinMax={setCurrentMinMaxLength}
				keyFilter="length"
				handleChange={removeAndAddFilter}
				minValue={currentMinMaxLength[0]}
				maxValue={currentMinMaxLength[1]}
				isLength={true}
			/>
		);
	};

	const ascentFilter = () => {
		return (
			<RangeFilter
				title={'Total ascent'}
				arrayRange={ascentFacets}
				currentMinMax={currentMinMaxAscent}
				setCurrentMinMax={setCurrentMinMaxAscent}
				keyFilter="ascent"
				handleChange={removeAndAddFilter}
				minValue={currentMinMaxAscent[0]}
				maxValue={currentMinMaxAscent[1]}
				isPercentage={true}
			/>
		);
	};

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

	useEffect(() => {
		if (
			facets?.distinctTimes?.length > 0 &&
			currentMinMaxExpectedTime?.[0] === null &&
			currentMinMaxExpectedTime?.[1] === null
		) {
			setCurrentMinMaxExpectedTime([
				Math.min(...facets.distinctTimes),
				Math.max(...facets.distinctTimes)
			]);
		}
		if (
			facets?.distinctLengths?.length > 0 &&
			currentMinMaxLength?.[0] === null &&
			currentMinMaxLength?.[1] === null
		) {
			setCurrentMinMaxLength([
				Math.min(...facets.distinctLengths),
				Math.max(...facets.distinctLengths)
			]);
		}
		if (
			facets?.distinctAscents?.length > 0 &&
			currentMinMaxAscent?.[0] === null &&
			currentMinMaxAscent?.[1] === null
		) {
			setCurrentMinMaxAscent([
				Math.min(...facets.distinctAscents),
				Math.max(...facets.distinctAscents)
			]);
		}
	}, [JSON.stringify(facets)]);

	return (
		<>
			<div className={styles.wrap}>
				{isMobile && (
					<button className={styles.button} onClick={() => setModalOpen(true)}>
						Filters <FontAwesomeIcon icon={faFilter} />
					</button>
				)}
				{!isMobile && (
					<>
						<h5 className={styles.filtersTitle}>Filters</h5>
						{radiusFilter()}
						{geograficFilters()}
						{difficultyFilter()}
						{expectedTimeFilter()}
						{lengthFilter()}
						{ascentFilter()}
					</>
				)}
			</div>
			{modalOpen &&
				ReactDom.createPortal(
					<FilterModal setModalOpen={setModalOpen}>
						{radiusFilter()}
						{geograficFilters()}
						{difficultyFilter()}
						{expectedTimeFilter()}
						{lengthFilter()}
						{ascentFilter()}
					</FilterModal>,
					document.getElementById('modal-root')
				)}
		</>
	);
}
