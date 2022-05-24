import React, { useEffect, useState } from 'react';
import './DevModeContent.css';

const DevModeContent = ({accessControlConditions}) => {
  const [accTextArea, setAccTextArea] = useState('');

  useEffect(() => {
    console.log('accessControlConditions', accessControlConditions)
    if (accessControlConditions) {
      const prettify = JSON.stringify(accessControlConditions, undefined, 4);
      console.log('prettify', prettify)
      setAccTextArea(prettify);
    }
  }, [accessControlConditions])

  return (
    <div className={'lsm-dev-mode-container'}>
      <label>Raw Access Control Conditions</label>
      <textarea className={'lsm-dev-mode-textarea'} rows={35} value={accTextArea} onChange={(e) => setAccTextArea(e.target.value)} />
    </div>
  )
}

export default DevModeContent;
