import { Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import API from '../../API/api';
import styles from './index.module.scss';

export default function Municipality(props) {
    const { validated, province, municipality } = props;
    const [municipalitiesList, setMunicipalitiesList] = useState([]);

    useEffect(() => {
        const loadMunicipalities = () => {
            API.getMunicipalitiesFacets(province?.prov_istat_code_num)
                .then((list) => {
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
        if(Object.keys(province).length !== 0){
            loadMunicipalities();
        }
    }, []);

    return (
        <Form.Group>
            <Form.Label className={styles.title}>Municipality</Form.Label>
            <Select
                placeholder="Select a municipality"
                className={`${styles.customSelect} ${validated && municipality === '' && styles.invalid
                    } ${validated && municipality !== '' && styles.valid}`}
                classNamePrefix="select"
                defaultValue={municipality}
                name="municipality"
                isSearchable={true}
                options={municipalitiesList}
                onChange={(event) => {
                    props.setMunicipality(event.value);
                }}
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