import { Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import API from '../../API/api';
import styles from './index.module.scss';

export default function Municipality(props) {
    const { validated, province, municipality, setMunicipality, inputValueMunicipality, setInputValueMunicipality } = props;
    const [municipalitiesList, setMunicipalitiesList] = useState([]);
    const [oldProvince, setOldProvince] = useState('');

    useEffect(() => {
        const loadMunicipalities = () => {
            API.getMunicipalitiesFacets(province?.prov_istat_code_num)
                .then((list) => {

                    setOldProvince(province?.prov_istat_code_num);

                    return list.map((item) => {
                        return {
                            label: item.label,
                            value: item.id
                        };
                    });
                })
                .then((newList) => {
                    setMunicipalitiesList(newList);
                });
        };
        if (province.prov_istat_code_num !== oldProvince) {
            loadMunicipalities();
        }
    }, [province.prov_istat_code_num]);

    return (
        <Form.Group>
            <Form.Label className={styles.title}>Municipality</Form.Label>
            <Select
                placeholder="Select a municipality"
                className={`${styles.customSelect} ${validated && municipality === '' && styles.invalid
                    } ${validated && municipality !== '' && styles.valid}`}
                classNamePrefix="select"
                name="municipality"
                isSearchable={true}
                isClearable={true}
                options={municipalitiesList}
                onChange={(event) => {
                    setMunicipality(event !== null ? event.value : '');
                }}
                onInputChange={newString => setInputValueMunicipality(newString)}
                inputValue={inputValueMunicipality}
                value={municipalitiesList?.filter(municipalityList => municipalityList.value === municipality)?.[0] || ""}
            />
            {validated && municipality === '' && (
                <div className={styles.feedbackContainer}>
                    <span className={styles.feedback}>
                        Please select a valid municipality
                    </span>
                </div>
            )}

        </Form.Group>
    );
}