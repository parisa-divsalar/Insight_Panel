import CMSLayout from '../../_core/components/layouts/cms-dashboard/CMSLayout'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import { MdManageAccounts } from 'react-icons/md'

const AccountPage = () => {
    return (
        <CMSLayout>
            <div className='page-header-style'>
                <h2 className='title-page-style'>
                    <MdManageAccounts className='text-3xl text-inherit' />
                    حساب
                </h2>

                <Link
                    to={'#'}
                    className='new-link-page'
                >
                    <FaPlus />
                    حساب&nbsp;جدید
                </Link>
            </div>

            <div className='text-center mt-12'>
                <h1>This Is Account Page</h1>
            </div>
        </CMSLayout>
    )
}

export default AccountPage
