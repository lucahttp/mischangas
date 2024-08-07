import React from 'react';
import ReactDOM from 'react-dom';
//import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';
import JobOffer, { getOffer } from "./JobOffer";
import NewJobOffer from './NewJobOffer';
import { RouterProvider, createBrowserRouter, createRoutesFromElements,BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Profile from './Profile';
import { data } from 'autoprefixer';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route exact path="/" element={<App />} />
      <Route
        path="/offer/:offerId"
        element={<JobOffer />}
        loader={async ({ params }) => {
          const res = await getOffer(params.offerId);
          console.log("res")
          console.log(res)
          return res;
        }}
        /*
        action={async ({ request }) => {
          return updateFakeTeam(await request.formData());
        }}
        */
        errorElement={<><p>Error no encontramos tu offer</p></>}
      />


      <Route path="/new" element={<NewJobOffer />} />
      <Route path="/account" element={<Profile />} />
      <Route exact path="/" element={<App />} />
    </Route>
  )
);




ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    <RouterProvider router={router} />
  </div>)
/*
ReactDOM.createRoot(document.getElementById('root')).render(

<React.StrictMode>
<Router>
  <Routes>
    <Route element={<Layout />}>
      <Route exact path="/" element={<App />} />
      <Route
        path="/offer/:offerId"
        element={<JobOffer />}
        loader={async ({ params }) => {
          return await getOffer(params.offerId);
        }}
        errorElement={<><p>Error no encontramos tu offer</p></>}
      />


      <Route path="/new" element={<NewJobOffer />} />
      <Route path="/account" element={<Profile />} />
      <Route exact path="/" element={<App />} />
    </Route>

  </Routes>
</Router>
</React.StrictMode>
);
*/
