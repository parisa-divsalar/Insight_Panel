import CMSLayout from '../../../_core/components/layouts/cms-dashboard/CMSLayout'
import { Link } from 'react-router-dom'
import { FaPlus, FaUsers } from 'react-icons/fa'

const UsersPage = () => {
    return (
        <CMSLayout>
            <div className='page-header-style'>
                <h2 className='title-page-style'>
                    <FaUsers className='text-3xl text-inherit' />
                    کاربران
                </h2>

                <Link
                    to={'#'}
                    className='new-link-page'
                >
                    <FaPlus />
                    کاربر&nbsp;جدید
                </Link>
            </div>

            <div className='text-center mt-12'>
                <h1>This Is Users Page</h1>
            </div>
        </CMSLayout>
    )
}

export default UsersPage
