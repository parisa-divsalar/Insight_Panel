export type BundlesType = {
    id: number
    title: string
    tests: string
    numberOfTests: number
    MeasurementItems: string
    status: string
    priceDollar: number | null
    priceRial: number | null
}

export type TestDetailsType = {
    id: number
    title: string
    category: string
    ageRangeFrom: number
    ageRangeTo: number
    priceDollar: number | null
    priceRial: number | null
    measurementTitle: string
}

export type TableRowType = {
    id: number
    title?: string
    tests?: string
    numberOfTests?: number
    MeasurementItems?: string
    status?: string
    category?: string
    ageRangeFrom?: number
    ageRangeTo?: number
    priceDollar?: number | null
    priceRial?: number | null
    measurementTitle?: string
}

export type ColumIdType = keyof BundlesType | keyof TestDetailsType

export type headCellsType = {
    id: ColumIdType
    label: string
    minWidth?: number
}
