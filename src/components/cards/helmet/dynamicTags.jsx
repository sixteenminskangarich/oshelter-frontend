import { Helmet, HelmetProvider } from 'react-helmet-async';
import Head from 'next/head';

function DynamicMetaTagComponent({ title, description, imageUrl }) {
    return (
        <>
            <head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={imageUrl} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:image" content={imageUrl} />
                <meta property="twitter:description" content={description} />
                <meta name="twitter:card" content="summary" />
            </head>
        </>
        
    );
}

export default DynamicMetaTagComponent;
