/* eslint-disable react-hooks/exhaustive-deps */
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableSortLabel from '@mui/material/TableSortLabel'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { visuallyHidden } from '@mui/utils'
import { TableRowType, headCellsType } from './CustomTable.type'
import { ChangeEvent, MouseEvent, useMemo, useState } from 'react'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) {
            return order
        }
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
}

interface EnhancedTableProps {
    onRequestSort: (event: MouseEvent<unknown>, property: keyof TableRowType) => void
    order: Order
    orderBy: string
    headCells: headCellsType[]
    showSelected?: boolean
}

function EnhancedTableHead({ headCells, order, orderBy, onRequestSort, showSelected }: EnhancedTableProps) {
    const createSortHandler = (property: keyof TableRowType) => (event: MouseEvent<unknown>) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                {showSelected && <TableCell padding='checkbox'></TableCell>}
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box
                                    component='span'
                                    sx={visuallyHidden}
                                >
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

type CustomTableType = {
    rows: any[]
    headCells: headCellsType[]
    isShowEditColumn?: boolean
    showSelected?: boolean
    selectedItems?: (list: number[]) => void
}

export const CustomTable = (properties: CustomTableType) => {
    const { rows, headCells, isShowEditColumn = true, showSelected = false, selectedItems } = properties

    const [order, setOrder] = useState<Order>('asc')
    const [orderBy, setOrderBy] = useState<keyof TableRowType>('id')
    const [selected, setSelected] = useState<readonly number[]>([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleRequestSort = (event: MouseEvent<unknown>, property: keyof TableRowType) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id)
            setSelected(newSelected)
            selectedItems && selectedItems(newSelected as number[])
            return
        }
        setSelected([])
        selectedItems && selectedItems([])
    }

    const handleClick = (event: MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id)
        let newSelected: readonly number[] = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
        }
        setSelected(newSelected)
        selectedItems && selectedItems(newSelected as number[])
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const isSelected = (id: number) => selected.indexOf(id) !== -1

    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage],
    )

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby='tableTitle'
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            headCells={headCells}
                            showSelected={showSelected}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(Number(row.id))
                                const labelId = `enhanced-table-checkbox-${index}`

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, Number(row.id))}
                                        role='checkbox'
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                        className={`hover:!bg-primary-200 ${index % 2 === 0 && 'bg-primary-100'}`}
                                    >
                                        {showSelected && (
                                            <TableCell padding='checkbox'>
                                                <Checkbox
                                                    color='primary'
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                        )}

                                        {headCells.map((column) => (
                                            <TableCell>{row[column.id]}</TableCell>
                                        ))}

                                        {isShowEditColumn && (
                                            <TableCell className='!flex !items-center !justify-center'>
                                                <button className='new-link-page'>ویرایش</button>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    )
}
