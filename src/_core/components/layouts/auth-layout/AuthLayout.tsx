const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full overflow-scroll'>
            <h1>Auth Layout</h1>
            <div>{children}</div>
        </div>
    )
}

export default AuthLayout
