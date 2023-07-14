import React from "react";
import MyDropzone from "../../../components/MyDropzone";
import {connect} from "react-redux";
import {documentsFindAllEndpoint} from "../../../redux/documents/actions";
import {Box} from "@mui/material";
import DocList from "./DocList";

const UploadComponent: React.FC = (props) => {
    return props.isLoading ? (
        <span>Loading ... </span>
    ) : (
        <div>
            <h1>Upload Documents</h1>
            <MyDropzone />
        </div>
    );
};
const mapStateToProps = (state: any) => {
    return {
        isLoading: state.isLoading,
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        findAll: () => {
            dispatch(documentsFindAllEndpoint());
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadComponent);
