import React from "react";
//import ReactDOM from 'react-dom';
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import JobOffer, { getOffer } from "./JobOffer";
import NewJobOffer from "./NewJobOffer";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from "./Layout";
import Profile from "./Profile";
import { data } from "autoprefixer";
import ChatView, { getChat } from "./components/ChatView";


import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://7e47386f876034aeff53e5521cde6c73@o4509110161702912.ingest.us.sentry.io/4509110162817024",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration()
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route exact path="/" element={<App />} />
      <Route
        path="/offer/:offerId"
        element={<JobOffer />}
        loader={async ({ params }) => {
          const res = await getOffer(params.offerId);
          console.log("res");
          console.log(res);
          return res;
        }}
        /*
        action={async ({ request }) => {
          return updateFakeTeam(await request.formData());
        }}
        */
        errorElement={
          <>
            <p>Error no encontramos tu offer</p>
          </>
        }
      />

      <Route
        path="/chat/:chatId"
        element={<ChatView/>}
        loader={async ({ params }) => {
          const res = await getChat(params.chatId);
          console.log("res");
          console.log(res);
          return res;
        }}
        /*
        action={async ({ request }) => {
          return updateFakeTeam(await request.formData());
        }}
        */
        errorElement={
          <>
            <p>Error no encontramos tu chat</p>
          </>
        }
      />

      <Route path="/new" element={<NewJobOffer />} />
      <Route path="/account" element={<Profile />} />
      <Route exact path="/" element={<App />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <RouterProvider router={router} />
  </div>
);
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
