import { Table, Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

export default function PointsTable(props) {
	const generateRows = () => {
		const rows = props.referencePoints.map((point) => (
			<tr key={point}>
				<td className="text-center">{point}</td>
				<td className="text-end">
					<Button
						variant="danger"
						size="sm"
						onClick={() => props.delRefPoint(point)}
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
			<tbody>{generateRows()}</tbody>
		</Table>
	);
}
