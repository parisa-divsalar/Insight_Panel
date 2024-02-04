import Logo from '../../../logo/Logo'
import { FaUsers } from 'react-icons/fa'
import { GrBundle } from 'react-icons/gr'
import { IoIosLogOut } from 'react-icons/io'
import { Link, useLocation } from 'react-router-dom'
import { MdManageAccounts, MdOutlineAccountCircle } from 'react-icons/md'

const CMSSidebar = () => {
    const pathname = useLocation().pathname

    var daysPersian = ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه']
    var daysEnglish = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const date = new Date()
    const linkStyles =
        'w-full flex items-center justify-start gap-4 text-lg text-insight-100 rounded-tr-3xl rounded-br-3xl p-4 hover:bg-insight-300 hover:text-insight-500 hover:text-white mt-1'
    const linkHoverStyles = 'bg-insight-100 text-insight-500'

    return (
        <div className='w-full flex flex-col gap-4 h-full overflow-scroll justify-between'>
            <div className='flex gap-4 items-center justify-start border-b border-insight-300 pb-4'>
                <MdOutlineAccountCircle className='text-4xl text-insight-300' />
                <div>
                    <p className='text-insight-300 text-base font-medium'>اردوان مفیدی</p>
                    <p className='text-insight-300 text-base font-medium'>ardavanmofidi@gmail.com</p>
                </div>
            </div>

            <div className='flex-[2] overflow-y-scroll'>
                <Link
                    to={'/cms'}
                    className={`${linkStyles} ${pathname === '/cms' && linkHoverStyles}`}
                >
                    <MdManageAccounts className='text-2xl' />
                    حساب
                </Link>

                <Link
                    to={'/cms/bundles'}
                    className={`${linkStyles} ${pathname.startsWith('/cms/bundles') && linkHoverStyles}`}
                >
                    <GrBundle className='text-2xl' />
                    بسته ها
                </Link>

                <Link
                    to={'/cms/users'}
                    className={`${linkStyles} ${pathname.startsWith('/cms/users') && linkHoverStyles}`}
                >
                    <FaUsers className='text-2xl' />
                    کاربران
                </Link>

                <span className='block my-2 border-b border-insight-300 '></span>

                <button
                    className={linkStyles}
                    onClick={() => alert('log out')}
                >
                    <IoIosLogOut className='text-2xl' />
                    خروج
                </button>
            </div>

            <div className='p-4 border-t pb-0 border-insight-300 ml-4'>
                <p className='text-insight-300 text-lg font-medium text-center'>
                    {daysEnglish[date.getDay()]}
                    {', '}
                    {date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    <br />
                    {daysPersian[date.getDay()]}
                    {', '}
                    {date.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </div>

            <div className='flex items-center justify-center gap-4 p-4 pb-0 border-t border-insight-300 ml-4'>
                <span className='bg-insight-300 p-1 rounded-md flex items-center justify-center'>
                    <Logo />
                </span>
                <h3 className='text-insight-300 text-xl font-bold'>کلینیک اینسایت</h3>
            </div>
        </div>
    )
}

export default CMSSidebar
