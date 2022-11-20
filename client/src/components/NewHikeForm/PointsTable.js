import { Table, Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

export default function PointsTable(props) {
	const generateRows = () => {
		const rows = props.referencePoints.map((point) => (
			<tr key={point.id}>
				<td>{point.type}</td>
				<td>{point.name}</td>
				<td>{point.description}</td>
				<td>{point.lat}</td>
				<td>{point.lon}</td>
				<td>
					<Button
						variant="danger"
						size="sm"
						onClick={() => props.delRefPoint(point.id)}
					>
						<Trash />
					</Button>
				</td>
			</tr>
		));
		return rows;
	};

	return (
		<Table striped responsive>
			<thead>
				<tr>
					<th>Type</th>
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
