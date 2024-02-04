import CMSSidebar from './cms-sidebar/CMSSidebar'

const CMSLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full h-full bg-insight-500 flex p-8'>
            <div className='w-[20rem] h-full'>
                <CMSSidebar />
            </div>

            <div className='flex-[2] h-full overflow-scroll bg-insight-100 rounded-3xl p-6'>{children}</div>
        </div>
    )
}

export default CMSLayout
