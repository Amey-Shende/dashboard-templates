import React, { lazy, Suspense, useState } from 'react';
import { Container } from 'reactstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Header = lazy(() => import('./Header'));
const Sidebar = lazy(() => import('./Sidebar'));
const Loader = lazy(() => import('./loader/Loader'));

function FullLayout() {

    //********  Show mobile menu  ***********/
    const [showSidebar, setShowSidebar] = useState(false);

    const navigate = useNavigate();

    //******** toggle the state of menu ***********/
    const showMobilemenu = () => {
        setShowSidebar(showSidebar => !showSidebar);
    };

    //*** Logout function *****/
    const handleLogout = () => {
        localStorage.removeItem("token");
        // localStorage.removeItem("isLogin");
        navigate("/login");
    };

    return (

        <main className='vh-100 vw-100 d-flex'>
            <ToastContainer />

            {/**********  Sidebar ********** */}
            {/* <div className=''> */}
            <aside className={`sidebarArea shadow ${showSidebar ? 'showSidebar' : ''}`} >
                <Sidebar showMobilemenu={showMobilemenu} handleLogout={handleLogout} />
            </aside>
            {/* </div> */}

            {/***********  Content Area ***********/}
            <div className='pageWrapper'>
                <div className="contentArea">
                    <Header showMobilemenu={showMobilemenu} handleLogout={handleLogout} />

                    <Container className='p-4' fluid>
                        <Suspense fallback={<Loader />}>
                            <Outlet />
                        </Suspense>
                    </Container>

                </div>
            </div>
        </main >
    )
}

export default FullLayout
