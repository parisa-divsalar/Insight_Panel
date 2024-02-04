const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full overflow-scroll'>
            <h1>Root Layout</h1>

            <div>{children}</div>
        </div>
    )
}

export default RootLayout
