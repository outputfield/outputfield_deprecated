import '../styles/globals.css';

// declare module 'csstype' {
//   interface Properties {
//     '--iconcolor'?: any;
//     '--col'?: any;
//   }
// }

// function MyApp({Component, pageProps}) {
//   return <Component {...pageProps} />;
// }

// export default MyApp;

import type {ReactElement, ReactNode} from 'react';
import type {NextPage} from 'next';
import type {AppProps} from 'next/app';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps &{
  Component: NextPageWithLayout
}

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
  // Use layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps}/>);
}
