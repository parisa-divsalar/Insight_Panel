/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import CMSLayout from '../../../../_core/components/layouts/cms-dashboard/CMSLayout'
import { GrBundle } from 'react-icons/gr'
import { ChangeEvent, useEffect, useState } from 'react'
import { CustomTable } from '../../../../_core/components/custom-table/CustomTable'
import { headCellsType, TestDetailsType } from '../../../../_core/components/custom-table/CustomTable.type'
import axios from 'axios'
import { FaPlus } from 'react-icons/fa'

const headCells: headCellsType[] = [
    { id: 'id', label: 'کد' },
    { id: 'title', label: 'نام آزمون' },
    { id: 'measurementTitle', label: 'عنوان اندازه گیری' },
    { id: 'category', label: 'دسته‌بندی' },
    { id: 'ageRangeFrom', label: 'از(سن)' },
    { id: 'ageRangeTo', label: 'تا(سن)' },
    { id: 'priceDollar', label: 'قیمت(دلار)' },
    { id: 'priceRial', label: 'قیمت(ریال)' },
]

const data: TestDetailsType[] = [
    {
        id: 10,
        title: 'افسردگی بک (BDI)',
        measurementTitle: 'افسردگی',
        category: 'بالینی',
        ageRangeFrom: 10,
        ageRangeTo: 54,
        priceDollar: 5,
        priceRial: 125000,
    },

    {
        id: 11,
        title: 'اضطراب بک (BAI)',
        measurementTitle: 'اضطراب',
        category: 'مهارت‌های زندگی',
        ageRangeFrom: 15,
        ageRangeTo: 52,
        priceDollar: 12,
        priceRial: 250000,
    },

    {
        id: 12,
        title: 'کمال‌گرایی هیل (HPI)',
        measurementTitle: 'کمال‌گرایی',
        category: 'بالینی',
        ageRangeFrom: 5,
        ageRangeTo: 33,
        priceDollar: 10,
        priceRial: 300000,
    },
]

const AddBundlePage = () => {
    const [query, setQuery] = useState<string>('')
    const [rows, setRows] = useState<TestDetailsType[]>(data)
    const [status, setStatus] = useState<boolean>(false)
    const [featured, setFeatured] = useState<boolean>(true)
    const [selectedItems, setSelectedItems] = useState<number[]>([])

    const [categories, setCategories] = useState<string[]>([])
    const [measurements, setMeasurements] = useState<string[]>([])
    const [finalPriceRial, setFinalPriceRial] = useState<number>(0)
    const [finalPriceDollar, setFinalPriceDollar] = useState<number>(0)
    const [ageRange, setAgeRange] = useState<{ from: number; to: number }>({ from: 0, to: 0 })

    // const getData = () => {
    //     axios
    //         .get('http://stage1-api.insight-clinic.com/controller/get_tests_bundle.php', {
    //             headers: {
    //                 AuthorizationKey: '133079ba-9b43-11ee-b9d1-0242ac120002|||1|||1',
    //             },
    //         })
    //         .then((response) => console.log('response', response))
    //         .catch((error) => console.log('error', error))

    //     return rows.map((item) => {
    //         return { ...item }
    //     })
    // }

    // useEffect(() => {
    //     getData()
    // }, [])

    useEffect(() => {
        setCategories([])
        setMeasurements([])
        setFinalPriceRial(0)
        setFinalPriceDollar(0)
        setAgeRange({ from: 0, to: 0 })

        console.log(selectedItems)

        selectedItems.map((id) => {
            rows.map((item) => {
                if (id === item.id) {
                    setCategories(categories.concat(item.category))
                    setMeasurements(categories.concat(item.measurementTitle))
                    setAgeRange({
                        from: item.ageRangeFrom < ageRange.from ? item.ageRangeFrom : ageRange.from,
                        to: item.ageRangeTo > ageRange.to ? item.ageRangeTo : ageRange.to,
                    })
                    setFinalPriceRial(finalPriceRial + Number(item.priceRial))
                    setFinalPriceDollar(finalPriceDollar + Number(item.priceDollar))
                }
            })
        })
    }, [selectedItems])

    const [imageURL, setImageURL] = useState<string>('')

    const uploadImageToClient = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImageURL(URL.createObjectURL(event.target.files[0]))
        }
    }

    return (
        <CMSLayout>
            <div className='page-header-style'>
                <h2 className='title-page-style'>
                    <GrBundle className='text-3xl text-inherit' />
                    ثبت بسته‌های هدفمند
                </h2>

                <button className='new-link-page'>جدید</button>

                <button className='new-link-page'>ثبت</button>

                <button className='new-link-page'>انصراف</button>

                <button
                    disabled
                    className='new-link-page'
                >
                    حذف
                </button>
            </div>

            <div className='search-in-table border-b border-insight-300 mt-4 pb-4'>
                <p>عنوان تحلیل بسته:</p>
                <input
                    type='text'
                    value={query}
                    placeholder='مثال: انتخاب شغل، رشته تحصیلی، و ...'
                    onChange={(event) => setQuery(event.target.value)}
                />
            </div>

            <div className='search-in-table'>
                <p>انتخاب آزمون‌ها</p>
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
                    showSelected={true}
                    isShowEditColumn={false}
                    selectedItems={(list) => setSelectedItems(list)}
                />

                <div className='flex justify-between flex-wrap gap-8'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-4'>
                            <label className='w-28 text-base'>دسته‌بندی ها :</label>
                            <div className='flex items-center gap-4'>
                                {categories.map((item, index) => (
                                    <p
                                        key={`id-of-categories-${index}`}
                                        className='bg-insight-500 text-white text-base px-4 py-2 rounded-md'
                                    >
                                        {item}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className='flex items-center gap-4'>
                            <label className='w-28 text-base'>موارد اندازه‌گیری:</label>
                            <div className='flex items-center gap-4'>
                                {measurements.map((item, index) => (
                                    <p
                                        key={`id-of-measurements-${index}`}
                                        className='bg-insight-500 text-white text-base px-4 py-2 rounded-md'
                                    >
                                        {item}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className='flex items-center gap-4'>
                            <label className='w-28 text-base'>رده سنی :</label>
                            <div className='flex items-center gap-4'>
                                <p className='bg-insight-500 text-white text-base px-4 py-2 rounded-md'>
                                    از {ageRange.from} سال تا {ageRange.to} سال
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-4 items-end mr-auto'>
                        <div className='flex items-center gap-4'>
                            <label className='w-20 text-base'>جمع کل :</label>
                            <div className='flex items-center gap-4'>
                                <p className='bg-insight-500 text-white text-base px-4 py-2 rounded-md'>
                                    {finalPriceDollar.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </p>
                                <p className='bg-insight-500 text-white text-base px-4 py-2 rounded-md'>
                                    {finalPriceRial.toLocaleString('fa-IR', { style: 'currency', currency: 'IRR' })}
                                </p>
                            </div>
                        </div>

                        <div className='flex items-center gap-4'>
                            <label className='w-28 text-base'>تعداد آزمون‌ها:</label>
                            <div className='flex items-center gap-4'>
                                <p className='bg-insight-500 text-white text-base px-4 py-2 rounded-md min-w-20 text-center'>
                                    {selectedItems.length} عدد
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='border-b border-insight-500 my-6 w-full'></div>

            <div className='flex flex-col gap-4  w-full mt-4'>
                <p className='text-base font-medium text-black min-w-40'>عنوان بسته :</p>
                <input
                    type='text'
                    value={query}
                    placeholder='مثال: تحلیل و بررسی شخصیت برای انتخاب شغل'
                    className='w-full bg-white px-4 py-3 rounded-md min-w-72 outline-none border-none text-black shadow-md'
                    onChange={(event) => setQuery(event.target.value)}
                />
            </div>

            <div className='flex flex-col gap-4  w-full mt-4'>
                <p className='text-base font-medium text-black min-w-40'>مقدمه :</p>
                <input
                    type='text'
                    value={query}
                    placeholder='جستجو'
                    className='w-full bg-white px-4 py-3 rounded-md min-w-72 outline-none border-none text-black shadow-md h-[300px]'
                    onChange={(event) => setQuery(event.target.value)}
                />
            </div>

            <div className='flex flex-col gap-4  w-full mt-4'>
                <p className='text-base font-medium text-black min-w-40'>Meta Description :</p>
                <input
                    type='text'
                    value={query}
                    className='w-full bg-white px-4 py-3 rounded-md min-w-72 outline-none border-none text-black shadow-md'
                    onChange={(event) => setQuery(event.target.value)}
                />
            </div>

            <div className='search-in-table'>
                <p className='!text-black'>لینک بسته :</p>
                <input
                    type='text'
                    value={query}
                    placeholder='فقط به انگلیسی'
                    className='w-[600px]'
                    onChange={(event) => setQuery(event.target.value)}
                />
            </div>

            <div className='search-in-table'>
                <p className='!text-black'>وضعیت :</p>

                <button
                    onClick={() => setStatus(true)}
                    className={`rounded-md h-10 w-24 hover:shadow-lg ${
                        status ? 'text-white bg-green-500' : 'text-blue-500 bg-white'
                    }`}
                >
                    فعال
                </button>
                <button
                    onClick={() => setStatus(false)}
                    className={`rounded-md h-10 w-24 hover:shadow-lg ${
                        !status ? 'text-white bg-red-500' : 'text-blue-500 bg-white'
                    }`}
                >
                    غیرفعال
                </button>
            </div>

            <div className='search-in-table'>
                <p className='!text-black'>Featured :</p>

                <button
                    onClick={() => setFeatured(true)}
                    className={`rounded-md h-10 w-24 hover:shadow-lg ${
                        featured ? 'text-white bg-green-500' : 'text-blue-500 bg-white'
                    }`}
                >
                    فعال
                </button>
                <button
                    onClick={() => setFeatured(false)}
                    className={`rounded-md h-10 w-24 hover:shadow-lg ${
                        !featured ? 'text-white bg-red-500' : 'text-blue-500 bg-white'
                    }`}
                >
                    غیرفعال
                </button>
            </div>

            <div className='search-in-table'>
                <p className='!text-black'>عکس :</p>

                <button className='w-48 h-48 rounded-md flex flex-col items-center justify-center gap-4 bg-white hover:shadow-md text-blue-500 text-base'>
                    <input
                        type='file'
                        id='avatar'
                        accept='image/*'
                        className='hidden'
                    />
                    <span>انتخاب عکس</span>
                    <p className='block w-[calc(100%_-_2rem)] h-[1px] bg-blue-500 '></p>
                    <FaPlus />
                </button>

                <button className='w-48 h-48 rounded-md flex flex-col items-center justify-center gap-4 bg-white hover:shadow-md text-blue-500 text-base'>
                    <input
                        type='file'
                        id='avatar'
                        accept='image/*'
                        className='hidden'
                    />
                    <span>انتخاب BG</span>
                    <p className='block w-[calc(100%_-_2rem)] h-[1px] bg-blue-500 '></p>
                    <FaPlus />
                </button>

                <button className='w-48 h-48 rounded-md flex flex-col items-center justify-center gap-4 bg-white hover:shadow-md text-blue-500 text-base'>
                    <input
                        type='file'
                        id='avatar'
                        accept='image/*'
                        className='hidden'
                    />
                    <span>Thumbnail</span>
                    <p className='block w-[calc(100%_-_2rem)] h-[1px] bg-blue-500 '></p>
                    <FaPlus />
                </button>
            </div>
        </CMSLayout>
    )
}

export default AddBundlePage
