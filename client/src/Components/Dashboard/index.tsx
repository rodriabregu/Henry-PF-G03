import { NavLink as Link } from 'react-router-dom';
import './dashboard.css'

const AdminDash = () => {
    return (
        <div className='sheet'>
            <div className='div2'>
                <Link style={{ textDecoration: 'none' }} to='/create'>
                    <div className='diva'>
                        <h2>CREATE PRODUCT</h2>
                        <span>Here you can create new products.</span>
                    </div>
                </Link>
                <Link style={{ textDecoration: 'none' }} to='/createCategory'>
                    <div className='diva'>
                        <h2>CREATE CATEGORY</h2>
                        <span>Here you can create new categories for items.</span>
                    </div>
                </Link>
            </div>
            <div className='div2'>
                <Link style={{ textDecoration: 'none' }} to='/allSales'>
                    <div className='diva'>
                        <h2>ALL SALES</h2>
                        <span>Here you can see a list of sales, and more detailed information about them.</span>
                    </div>
                </Link>
                <Link style={{ textDecoration: 'none' }} to='/usersInfo'>
                    <div className='diva'>
                        <h2>MANAGE USERS</h2>
                        <span>Here you can see a list of users, and change their permissions</span>
                    </div>
                </Link>
            </div>
            <div className='div2'>
                <Link style={{ textDecoration: 'none' }} to='/stats'>
                    <div className='diva'>
                        <h2>STATS</h2>
                        <span>Here you can see a stats about products and sells</span>
                    </div>
                </Link>
                </div>
        </div>
    )
};

export default AdminDash;