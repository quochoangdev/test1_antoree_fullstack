import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import { arrayRoutes } from './main/routes/routes';
import DefaultLayout from './frontend/layout/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <div className="App">
        <Routes>
          {arrayRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
          })}
        </Routes>
        <ToastContainer
          autoClose={900}
          position="top-center"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
