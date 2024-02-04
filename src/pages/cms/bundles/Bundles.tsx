import CMSLayout from '../../../_core/components/layouts/cms-dashboard/CMSLayout'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import { useState } from 'react'
import { GrBundle } from 'react-icons/gr'
import { CustomTable } from '../../../_core/components/custom-table/CustomTable'
import { BundlesType, headCellsType } from '../../../_core/components/custom-table/CustomTable.type'

const headCells: headCellsType[] = [
    { id: 'title', label: 'عنوان' },
    { id: 'tests', label: 'آزمون‌ها' },
    { id: 'numberOfTests', label: 'تعداد آزمون‌ها' },
    { id: 'MeasurementItems', label: 'موارد اندازه‌گیری', minWidth: 300 },
    { id: 'status', label: 'وضعیت' },
    { id: 'priceDollar', label: 'قیمت(دلار)' },
    { id: 'priceRial', label: 'قیمت(ریال)' },
]

const rows: BundlesType[] = [
    {
        id: 10,
        title: 'بسته ۱',
        tests: 'همه',
        numberOfTests: 5,
        MeasurementItems: 'همه',
        status: 'فعال',
        priceDollar: 3,
        priceRial: 125000,
    },

    {
        id: 11,
        title: 'بسته ۲',
        tests: 'همه',
        numberOfTests: 10,
        MeasurementItems: 'همه',
        status: 'غیرفعال',
        priceDollar: 5,
        priceRial: 215000,
    },
]

const BundlesPage = () => {
    const [query, setQuery] = useState<string>('')
    // const [filterRows, setFilterRows] = useState<BundlesType[]>(rows)

    // useEffect(() => {
    //     const timeOutId = setTimeout(() => {
    //         const NewFilteredRows = rows.filter((row) => row.title === query)
    //         console.log(NewFilteredRows)
    //         return setFilterRows(NewFilteredRows)
    //     }, 500)
    //     return () => clearTimeout(timeOutId)
    // }, [query])

    return (
        <CMSLayout>
            <div className='page-header-style'>
                <h2 className='title-page-style'>
                    <GrBundle className='text-3xl text-inherit' />
                    بسته ها
                </h2>

                <Link
                    to={'/cms/bundles/add-bundle'}
                    className='new-link-page'
                >
                    <FaPlus />
                    بسته&nbsp;جدید
                </Link>
            </div>

            <div className='search-in-table'>
                <p>جستجو</p>
                <input
                    type='text'
                    value={query}
                    placeholder='جستجو'
                    onChange={(event) => setQuery(event.target.value)}
                />
            </div>

            <div className='mt-12'>
                <CustomTable
                    rows={rows}
                    headCells={headCells}
                />
            </div>
        </CMSLayout>
    )
}

export default BundlesPage
