import React from "react";

interface DocumentPreviewProps {
    url: string;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({type, url }) => {
    const isImage = type.startsWith("image") || type.endsWith("pdf");

    if (isImage) {
        return <img src={url} alt="Document Preview" style={{ maxWidth: "100%", maxHeight: "100%" }} />;
    }
    else {
        return <p>No preview available</p>;
    }
};

export default DocumentPreview;