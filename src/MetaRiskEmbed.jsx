import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import StitchMetaApp from './StitchMetaApp';

const MetaRiskEmbed = ({ accessToken, onLogout }) => {
  const hostRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!hostRef.current) {
      return undefined;
    }

    const shadowRoot = hostRef.current.shadowRoot || hostRef.current.attachShadow({ mode: 'open' });
    if (!rootRef.current) {
      rootRef.current = createRoot(shadowRoot);
    }

    rootRef.current.render(
      <StitchMetaApp accessToken={accessToken} embedded onLogout={onLogout} />
    );

    return undefined;
  }, [accessToken, onLogout]);

  useEffect(() => {
    return () => {
      rootRef.current?.unmount();
      rootRef.current = null;
    };
  }, []);

  return <div ref={hostRef} style={{ width: '100%', minHeight: '100%', height: '100%' }} />;
};

export default MetaRiskEmbed;
