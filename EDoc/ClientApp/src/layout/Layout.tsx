import { Container } from 'reactstrap';
import React from "react";
import NavMenu from "../containers/navs/NavMenu";

export default function LayoutComponent(props:any) {
    return (
      <div>
        <NavMenu />
        <Container tag="main">
          {props.children}
        </Container>
      </div>
    );
}
