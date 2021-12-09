import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { LoadingProgressProvider } from '../services/loadingProgress';
import { Router } from 'next/router';
import { CookiesProvider } from 'react-cookie';
import { storeWrapper } from '../redux/store';

// NProgress.configure({ parent: '#main-loader' });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <LoadingProgressProvider
        startProgress={NProgress.start}
        stopProgress={NProgress.done}
      >
        <Component {...pageProps} />
      </LoadingProgressProvider>
    </CookiesProvider>
  );
}

export default storeWrapper.withRedux(MyApp);
