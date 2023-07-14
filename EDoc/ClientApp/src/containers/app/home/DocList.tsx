import React, {useEffect, useState} from "react";
import {Box, Stack, Typography, Button} from "@mui/material";
import {connect} from "react-redux";
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import PdfIcon from '../../../assets/icons/pdf-48.png';
import ImageIcon from '../../../assets/icons/image-48.png';
import ExcelIcon from '../../../assets/icons/excel-48.png';
import WordIcon from '../../../assets/icons/word-48.png';
import TextIcon from '../../../assets/icons/text-48.png';

import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridRowsProp, GridValueGetterParams,
} from "@mui/x-data-grid";
import DocumentPreview from "./DocumentPreview";
import ShareLinkModal from "./ShareLinkModal";
import {documentsIncreaseCount} from "../../../redux/documents/actions";

const DocumentList: React.FC = ({data,documentsIncreaseCount}) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [shareLink, setShareLink] = useState<string | null>(null);

    const generateShareLink = async (id:number) => {
        try {
            const response = await fetch(`${window.ApiUrl}documents/${id}/share`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ duration: "01:00:00" }), // Specify the desired duration
            });

            if (response.ok) {
                const data = await response.json();
                setShareLink(data.shareUrl);
                setIsOpen(true);
            } else {
                console.error("Failed to generate share link");
            }
        } catch (error) {
            console.error("Error generating share link:", error);
        }
    };

    const downloadDocument = (id: number) => {
        const downloadUrl = `${window.ApiUrl}documents/${id}/download`;
        window.open(downloadUrl, "_blank");
        documentsIncreaseCount(id);
    };
    
    const downloadDocuments = async () => {
        try {
            const response = await fetch(`${window.ApiUrl}documents/DownloadDocuments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(selectedIds),
            });

            if (response.ok) {
                // Trigger the file download by creating a temporary link
                const blob = await response.blob();
                const downloadUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.target = '_blank';
                link.download = 'documents.zip'; // Set the desired zip file name
                link.click();
            } else {
                console.error("Failed to download documents");
            }
            for( const id of selectedIds){
                documentsIncreaseCount(id);
            }
        } catch (error) {
            console.error("Error downloading documents:", error);
        }
    };
    
    const columns: GridColDef[] = [
        {field: "name", headerName: "Name", flex: 1},
        {
            field: "type",
            headerName: "Type",
            width: 150,
            renderCell: (params: GridValueGetterParams) => {
                const fileType = params.row.type as string;
                let icon = "";

                if (fileType.includes("pdf")) {
                    icon = PdfIcon; // Replace with your PDF icon component
                } else if (fileType.includes("excel")) {
                    icon = ExcelIcon; // Replace with your Excel icon component
                } else if (fileType.includes("word")) {
                    icon = WordIcon; // Replace with your Word icon component
                } else if (fileType.includes("text")) {
                    icon = TextIcon; // Replace with your Text icon component
                } else if (fileType.includes("image")) {
                    icon = ImageIcon; // Replace with your Image icon component
                }

                return <div><img src={icon} alt={"icon"}/></div>;
            },
        },
        {
            field: "preview",
            headerName: "Preview",
            width: 200,
            renderCell: (params: GridValueGetterParams) => {
                const fileId = params.id;
                const fileType = params.row.type as string;
                const previewUrl = `${window.ApiUrl}documents/${fileId}/preview`; // Replace with your API endpoint for retrieving document preview
                return <DocumentPreview type={fileType} url={previewUrl}/>;
            },
        },
        {
            field: "uploadDateTime",
            headerName: "Upload Date/Time",
            width: 200,
            valueGetter: (params: GridValueGetterParams) => {
                const uploadDate = params.row.uploadDateTime;
                return uploadDate;
            },
        },
        {
            field: "downloadCount",
            headerName: "Download Count",
        },
        {

            field: "id",
            headerName: "Actions",
            width: 150,
            renderCell: (params: GridValueGetterParams) => {
                const fileId = params.id;
                return (
                    <Stack direction={"row"}>
                        <Button onClick={() => generateShareLink(fileId)} title="Share"><ShareIcon/></Button>
                        <Box sx={{ml: 1}}></Box>
                        <Button onClick={() => downloadDocument(fileId)} title="Download"><DownloadIcon/></Button>
                    </Stack>
                )
            },
        },
    ];
    return (
        <>
            <ShareLinkModal isOpen={isOpen} onClose={()=>{setIsOpen(false)}} link={shareLink} />
            <Button onClick={downloadDocuments} disabled={!selectedIds.length}> Download Selection </Button>
            <Box sx={{mb:3}}/>
            <div style={{height: "calc(100vh - 300px)", width: "100%"}}>
                {data && <DataGrid
                    checkboxSelection
                    onRowSelectionModelChange ={(ids) => {
                        setSelectedIds(ids as number[])
                    }}
                    rows={data}
                    columns={columns}
                />}
            </div>

        </>
    );
};
const mapStateToProps = (state: any) => {
    return {
        data: state.documents.data,
        isLoading: state.isLoading,
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        documentsIncreaseCount: (id) => {
            dispatch(documentsIncreaseCount(id));
        },
    };
};
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);