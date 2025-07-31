import React from 'react';
import { useParams } from 'react-router-dom';
import CatalogViewer from './CatalogViewer';

const EmbedViewer: React.FC = () => {
  // For embedded version, we use the same viewer but without navigation
  return <CatalogViewer />;
};

export default EmbedViewer;