import React from 'react';
import ImageGrid from './sidebar';
import Layout from './layout';
import SpeechRecognizer from './SpeechRecognizer';

function HomePage() {
  return (
    <div>
        <ImageGrid />
        <div>
            <Layout />
        </div>
        <SpeechRecognizer />
    </div>
  );
}

export default HomePage;
