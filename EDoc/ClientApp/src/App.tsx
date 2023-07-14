import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import Layout from "./layout/Layout";
import "./styles.scss";

const App = () => {
  const displayName = App.name;
  return (
    <Layout>
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
      </Routes>
    </Layout>
  );
};
export default App;
