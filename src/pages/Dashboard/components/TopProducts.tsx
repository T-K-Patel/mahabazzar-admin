import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number
) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
	createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
	createData("Eclair", 262, 16.0, 24, 6.0),
	createData("Cupcake", 305, 3.7, 67, 4.3),
	createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));
export default function TopProducts() {
	return (
		<section className="my-2 mx-3">
			<h1 className="text-xl">Top Selling Products</h1>
			<div className="my-3">
				<TableContainer component={Paper}>
					<Table aria-label="simple table" size="small">
						<TableHead>
							<StyledTableRow>
								<StyledTableCell>Title</StyledTableCell>
								<StyledTableCell align="right">
									Price&nbsp;(Rs)
								</StyledTableCell>
								<StyledTableCell align="right">
									Stock&nbsp;(nos)
								</StyledTableCell>
								<StyledTableCell align="right">
									Protein&nbsp;(g)
								</StyledTableCell>
								<StyledTableCell align="right">
									Total sales
								</StyledTableCell>
							</StyledTableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<StyledTableRow
									key={row.name}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
								>
									<StyledTableCell component="th" scope="row">
										{row.name}
									</StyledTableCell>
									<StyledTableCell align="right">
										{row.calories}
									</StyledTableCell>
									<StyledTableCell align="right">
										{row.fat}
									</StyledTableCell>
									<StyledTableCell align="right">
										{row.carbs}
									</StyledTableCell>
									<StyledTableCell align="right">
										{row.protein}
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</section>
	);
}
