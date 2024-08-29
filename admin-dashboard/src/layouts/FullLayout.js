
import React, { lazy, Suspense, useState } from 'react';
import { Container } from 'reactstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import Loader from './loader/Loader';

import NotificationPanel from './NotificationPanel';
import { ToastContainer } from 'react-toastify';

const Header = lazy(() => import('./Header'));
const Sidebar = lazy(() => import('./Sidebar'));

function FullLayout() {

    //********  Show mobile menu  ***********/
    const [showSidebar, setShowSidebar] = useState(false);

    //*** NotifincationPanel  toogle state */
    const [isNotifiPanelOpen, setIsNotifiPanelOpen] = useState(false);


    const navigate = useNavigate();

    //******** toggle the state of menu ***********/
    const showMobilemenu = () => {
        setShowSidebar(showSidebar => !showSidebar);
    };

    //**** Notificationtoggle function *****/ 
    const handleNotification = () => {
        setIsNotifiPanelOpen(prev => !prev)
    }

    //*** Logout function *****/
    const handleLogout = () => {
        localStorage.removeItem("isLogin");
        navigate("/login");
    };


    return (

        <main >
            <ToastContainer />
            
            {/*********** Header ***********/}
            <Header showMobilemenu={showMobilemenu} handleNotification={handleNotification} handleLogout={handleLogout} />

            <div className='pageWrapper d-lg-flex'>

                {/**********  Sidebar ********** */}
                <aside className={`sidebarArea shadow ${showSidebar ? 'showSidebar' : ''}`} >
                    <Sidebar showMobilemenu={showMobilemenu} handleLogout={handleLogout} />
                </aside>

                {/***********  Content Area ***********/}
                <div className="contentArea">
                    <Container className='p-4' fluid>
                        <Suspense fallback={<Loader />}>
                            <Outlet />
                        </Suspense>
                    </Container>
                </div>

                {/*********  Notification Panel **********/}
                <div className={`notificationPanel ${isNotifiPanelOpen ? 'open' : 'closed'}`}>
                    {isNotifiPanelOpen ? <NotificationPanel handleNotification={handleNotification} />
                        : ""
                    }
                </div>
            </div>
        </main>
    )
}

export default FullLayout
