import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from "react-dom/client";
import ShareModal from './shareModal/ShareModal'
// import './index.css'

const container = document.getElementById('root');

const root = createRoot(container);
root.render(<ShareModal />)
  // <React.StrictMode>
  //   <ShareModal />
  // </React.StrictMode>,
// )
