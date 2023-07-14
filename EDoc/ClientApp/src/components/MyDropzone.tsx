import React, {useState} from "react";
import { useDropzone } from "react-dropzone";
import {Box} from "@mui/material";
import {connect} from "react-redux";
import {documentsFindAllEndpoint} from "../redux/documents/actions";

const MyDropzone: React.FC = (props) => {
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: ".pdf,.xlsx,.xls,.doc,.docx,.txt,image/*",
        onDrop: async (acceptedFiles) => {
            const previews = acceptedFiles.map((file: File) =>
                URL.createObjectURL(file)
            );
            setFilePreviews(previews);
            try {
                const formData = new FormData();
                acceptedFiles.forEach((file) => {
                    formData.append("files", file);
                });

                const response = await fetch(`${window.ApiUrl}documents/Upload`, {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Access-Control-Allow-Origin':'*',
                    },
                    mode: 'no-cors'
                });
                if (response.ok) {
                    console.log("File upload successful!");
                } else {
                    console.error("File upload failed.");
                }
                props.findAll();
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        },
    });

    const fileItems = acceptedFiles.map((file: File, index: number) => (
        <li key={file.name}>
            {file.type.includes("image/") && (
                <img src={filePreviews[index]} alt={file.name} style={{ width: "100px" }} />
            )}
            {' '}
            {file.name} - {file.size / 1024} KB
        </li>
    ));

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop some files here, or click to select files</p>
            <ul>{fileItems}</ul>
        </div>
    );
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        findAll: () => {
            dispatch(documentsFindAllEndpoint());
        },
    };
};
export default connect(null, mapDispatchToProps)(MyDropzone);
