import { useSelector } from 'react-redux';
import Header from './Header';
import { Outlet, useLocation } from 'react-router-dom';

function AppLayout() {
  const { url } = useSelector((store) => store.poster);

  const location = useLocation();

  return (
    <div
      className="relative flex  h-screen flex-1  flex-col overflow-y-auto bg-cover bg-no-repeat"
      style={{
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundImage: location.pathname === '/' ? `url(${url})` : ``,
        backgroundColor: location.pathname !== '/' ? ` rgb(28 25 23 )` : '',
        transition: 'background-image 0.5s ease',
        minHeight: '100%',
      }}
    >
      <Header />
      <div>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
