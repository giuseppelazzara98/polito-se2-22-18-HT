import styles from './index.module.scss';
import Select from 'react-select';

export default function SelectFilter(props) {
	const {
		title = '',
		facets = [],
		name = '',
		filters = [],
		isDisabled = false,
		removeAndAddFilter = () => {},
		inputValue = () => {},
		setInputValue = () => {}
	} = props;

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
				onChange={(val) => removeAndAddFilter(name, val?.id)}
				inputValue={inputValue}
				onInputChange={(newString) => setInputValue(newString)}
				value={
					facets?.filter(
						(facet) =>
							facet.id ===
							filters?.filter(
								(filterSelected) => filterSelected.key === name
							)?.[0]?.id
					)?.[0] || null
				}
			/>
		</>
	);
}
