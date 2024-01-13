import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Data from "./data";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material";

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

interface Column {
	id:
		| "_id"
		| "title"
		| "price"
		| "discountPercentage"
		| "rating"
		| "stock"
		| "brand"
		| "category";
	label: string;
	minWidth?: number;
	filterable?: boolean;
	align?: "right" | "center";
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	// {
	//     id: "_id",
	//     label: "Id",
	//     minWidth: 50,
	// },
	{
		id: "title",
		label: "Title",
		minWidth: 130,
		filterable: true,
	},
	{
		id: "brand",
		label: "Brand",
		minWidth: 100,
		filterable: true,
	},
	{
		id: "category",
		label: "Category",
		minWidth: 100,
		filterable: true,
	},
	{
		id: "stock",
		label: "Stock",
		minWidth: 50,
		align: "center",
	},
	{
		id: "price",
		label: "Price",
		minWidth: 80,
		align: "center",
		format: (value: number) => value.toLocaleString("en-in"),
	},
	{
		id: "discountPercentage",
		label: "Discounted Price",
		minWidth: 100,
		align: "right",
		format: (value: number) => value.toFixed(2),
	},
	{
		id: "rating",
		label: "Rating",
		minWidth: 30,
		align: "right",
		format: (value: number) => value.toFixed(2),
	},
];

interface DataType {
	_id: number;
	title: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	brand: string;
	category: string;
}

const data: DataType[] = Data.map((d) => ({
	_id: d.id,
	title: d.title,
	price: d.price,
	discountPercentage: d.price * (Math.random() * 0.3 + 0.7),
	rating: d.rating,
	stock: d.stock,
	brand: d.brand,
	category: d.category,
}));

const ROW_OPTIONS: number[] = [15, 25, 50, 100];

export default function Inventory() {
	const navigate = useNavigate();
	const location = useLocation();
	const querryParams = new URLSearchParams(location.search);
	React.useEffect(() => {
		document.title = "Inventory";
		return () => {
			document.title = "Mahabazzar Admin";
		};
	}, []);

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(ROW_OPTIONS[0]);

	const [filter, setFilter] = React.useState<{
		title: string;
		brand: string;
		category: string;
	}>({
		title: querryParams.get("t") || "",
		brand: querryParams.get("b") || "",
		category: querryParams.get("c") || "",
	});

	const rows = (() => {
		const d = data.filter(
			(row) =>
				row.title.toLowerCase().includes(filter.title) &&
				row.brand.toLowerCase().includes(filter.brand) &&
				row.category.toLowerCase().includes(filter.category)
		);
		if (Math.ceil(d.length / rowsPerPage) < page) {
			setPage(Math.ceil(d.length / rowsPerPage) - 1);
		}
		return d;
	})();

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = { ...filter, [e.target.name]: e.target.value.toLowerCase() };
		setFilter(f);
		navigate(
			"?" +
				(f.title && `t=${f.title}&`) +
				(f.brand && `b=${f.brand}&`) +
				(f.category && `c=${f.category}`)
		);
	};

	const handleChangePage = (_: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(+event.target.value);
	};

	return (
		<Paper sx={{ width: "100%", overflow: "hidden" }}>
			<TableContainer className="max-h-[calc(100vh-150px)]">
				<Table stickyHeader aria-label="sticky table" size="small">
					<TableHead>
						<StyledTableRow>
							{columns.map((column) => (
								<StyledTableCell
									key={column.id}
									align={column.align}
									style={{
										minWidth: Math.max(
											column.minWidth || 0,
											100
										),
									}}
								>
									{column.label}
									{column.filterable && (
										<div className="mt-2">
											<input
												type="text"
												onChange={handleFilterChange}
												name={column.id}
												value={
													// eslint-disable-next-line @typescript-eslint/no-explicit-any
													(filter as any)[
														column.id
													] || ""
												}
												className="bg-white bg-opacity-10 outline-none px-2 py-1"
												placeholder="Filter"
												style={{ width: 100 }}
											/>
										</div>
									)}
								</StyledTableCell>
							))}
						</StyledTableRow>
					</TableHead>
					<TableBody>
						{rows.length > 0 ? (
							rows
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((row) => {
									return (
										<StyledTableRow
											hover
											role="checkbox"
											tabIndex={-1}
											key={row._id}
											className="cursor-pointer"
											onClick={() =>
												navigate(`${row._id}`)
											}
										>
											{columns.map((column) => {
												const value = row[column.id];
												return (
													<StyledTableCell
														key={column.id}
														align={column.align}
													>
														{column.format &&
														typeof value ===
															"number"
															? column.format(
																	value
																)
															: value}
													</StyledTableCell>
												);
											})}
										</StyledTableRow>
									);
								})
						) : (
							<TableRow>
								<TableCell colSpan={columns.length}>
									Nothing To display
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={ROW_OPTIONS}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
