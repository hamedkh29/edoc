import React, { Fragment } from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { NavLink } from "react-router-dom";

const getMenuTitle = (sub) => {
  return <span>{sub}</span>;
};

const getUrl = (path, sub, index) => {
  if (index === 0) {
    return "";
  } else {
    return path.split(sub)[0] + sub;
  }
};

const BreadcrumbContainer = ({ heading, match }) => {
  return (
    <div className={"d-flex align-content-center align-items-center"}>
      {heading && <h6>{heading} /&nbsp;</h6>} <BreadcrumbItems match={match} />
    </div>
  );
};

export const BreadcrumbItems = ({ match }) => {
  const path = match.substr(1);
  let paths = path.split("/");
  if (paths[paths.length - 1].indexOf(":") > -1) {
    paths = paths.filter((x) => x.indexOf(":") === -1);
  }
  return (
    <Fragment>
      <Breadcrumb className="pt-0 pb-0 mb-0 mt-2 breadcrumb-container d-none d-sm-block d-lg-inline-block">
        {paths.map((sub, index) => {
          return (
            <BreadcrumbItem key={index} active={paths.length === index + 1}>
              {paths.length !== index + 1 ? (
                <NavLink to={"/" + getUrl(path, sub, index)}>
                  {getMenuTitle(sub)}
                </NavLink>
              ) : (
                getMenuTitle(sub)
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </Fragment>
  );
};

export default BreadcrumbContainer;
