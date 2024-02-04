import { Link } from 'react-router-dom'
import RootLayout from '../../_core/components/layouts/root-layout/RootLayout'

const HomePage = () => {
    return (
        <RootLayout>
            <h1>This Is Home Page</h1>

            <Link to={'/cms'}> Got To cms</Link>
        </RootLayout>
    )
}

export default HomePage
