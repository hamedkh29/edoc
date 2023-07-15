E Doc
=====

The E Doc application is a web-based document library that allows users to store and share their documents with others. It is built using TypeScript, React, ASP.NET Core, and Material-UI (MUI).

Table of Contents
-----------------

*   [Features](#features)
*   [Prerequisites](#prerequisites)
*   [Installation](#installation)
*   [Usage](#usage)
*   [Technologies Used](#technologies-used)
*   [Architecture and Design Decisions](#architecture-and-design-decisions)
*   [Improvements](#improvements)

Features
--------

The E Doc application provides the following features:

*   Uploading documents of various types, including PDF, Excel, Word, Text, and images.
*   Displaying a list of available documents with their name, type, preview image (for PDF and images), upload date/time, and download count.
*   Generating a shareable link for a document that can be accessed by others for a specified time period.
*   Downloading individual documents and multiple selected documents as a ZIP file.
*   Previewing the first page of a PDF document using Ghostscript.

Prerequisites
-------------

Before running the E Doc application, ensure you have the following software installed:

*   Node.js
*   .NET SDK
*   Ghostscript (for PDF preview) https://ghostscript.com/releases/gsdnld.html
*   Windows OS

Installation
------------

Follow these steps to install and set up the E Doc application:

1.  Clone the repository:

`git clone https://github.com/hamedkh29/edoc.git`

2.  Navigate to the project directory:

`cd edoc`

3.  Install the frontend dependencies:

`cd ClientApp npm install`

4.  Install the backend dependencies:

`cd .. dotnet restore`

5. Install Ghostscript:

`Visit the official Ghostscript website at http://www.ghostscript.com/download/gsdnld.html and download the compatible version`

Usage
-----

To run the E Doc application, Open EDoc.sln file using Visual Studio and click on run!

Technologies Used
-----------------

The E Doc application utilizes the following technologies:

*   **TypeScript**: Programming language for the frontend React application.
*   **React**: JavaScript library for building user interfaces.
*   **Redux**: State management library for managing application state.
*   **Redux Thunk**: Middleware for handling asynchronous actions in Redux.
*   **ASP.NET Core**: Web framework for building backend APIs.
*   **Material-UI (MUI)**: React UI component library for styling the frontend.
*   **InMemory Database**: In-memory database for storing and retrieving document data.
*   **Ghostscript**: Library for rendering PDF files and generating document previews.

Architecture and Design Decisions
---------------------------------

The E Doc application follows a client-server architecture, with React serving as the frontend and ASP.NET Core serving as the backend API. The frontend uses Redux for state management, allowing for centralized storage and easy access to application data. Redux Thunk middleware is used for handling asynchronous actions, such as API requests.

The backend API is built using ASP.NET Core, providing RESTful endpoints for document management. An in-memory database is used to store and retrieve document data during runtime.

For PDF preview functionality, the Ghostscript library is utilized. Ghostscript is responsible for rendering the first page of PDF documents and generating the preview image.

Improvements
------------

Here are some potential areas for improvement in the E Doc application:

*   Implement user authentication and authorization to secure access to documents and features.
*   Add pagination or infinite scrolling for the document list to handle large numbers of documents more efficiently.
*   Improve error handling and provide informative error messages to users.
*   Enhance the UI and user experience with additional styling and interactive features.
*   Implement unit tests and integration tests to ensure the reliability and stability of the application.
*   Make it cross platform friendly.
*   Deploy the application to a hosting environment for production use.
*   Enhance cross-platform compatibility to ensure the application works seamlessly on different operating systems such as Windows, macOS, and Linux.
These improvements can help enhance the functionality, performance, and usability of the E Doc application.

* * *
