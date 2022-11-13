import { Table, Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

export default function PointsTable(props) {
	const generateRows = () => {
		const rows = props.referencePoints.map((point) => (
			<tr key={point.id_place}>
				<td>{point.name}</td>
				<td>{point.description}</td>
				<td>{point.latitude}</td>
				<td>{point.longitude}</td>
				<td>
					<Button
						variant="danger"
						size="sm"
						onClick={() => props.delRefPoint(point.id_place)}
					>
						<Trash />
					</Button>
				</td>
			</tr>
		));
		return rows;
	};

	return (
		<Table striped>
			<thead>
				<tr>
					<th>Name</th>
					<th>Description</th>
					<th>Latitude</th>
					<th>Longitude</th>
				</tr>
			</thead>
			<tbody>{generateRows()}</tbody>
		</Table>
	);
}
