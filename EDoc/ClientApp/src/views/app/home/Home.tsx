import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import DocList from "../../../containers/app/home/DocList";
import UploadComponent from "../../../containers/app/home/UploadDocument";
import {Box} from "@mui/material";
import {documentsFindAllEndpoint} from "../../../redux/documents/actions";
import documents from "../../../redux/documents/reducer";
function Home(props: any) {
  useEffect(() => {
    // Data from backend
    props.findAll();
  }, []);
  
  return (
      <>
        <UploadComponent/>
        <hr/>
        <Box sx={{mt:5}}></Box>
        <DocList/>
      </>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    findAll: () => {
      dispatch(documentsFindAllEndpoint());
    },
  };
};

// @ts-ignore
export default connect(null, mapDispatchToProps)(Home);
