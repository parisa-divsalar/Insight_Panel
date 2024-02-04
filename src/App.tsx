import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/Home'
import UsersPage from './pages/cms/users/Users'
import AccountPage from './pages/cms/Accounts'
import BundlesPage from './pages/cms/bundles/Bundles'
import NotFoundPage from './pages/not-found/NotFound'
import AddBundlePage from './pages/cms/bundles/add-bundle/AddBundle'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={<HomePage />}
                />

                <Route
                    path='/cms'
                    element={<AccountPage />}
                />
                <Route
                    path='/cms/bundles'
                    element={<BundlesPage />}
                />

                <Route
                    path='/cms/bundles/add-bundle'
                    element={<AddBundlePage />}
                />
                <Route
                    path='/cms/users'
                    element={<UsersPage />}
                />

                <Route
                    path='*'
                    element={<NotFoundPage />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
