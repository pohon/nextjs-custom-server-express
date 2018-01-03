import { Component } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import locales from '/locales';

import { connect } from 'react-redux';
import { changeLocale } from '/actions/app';

/** Remember current locale and translation on page changes */
let locale;
let localePath;
let translation;
let isLocaleDataReady = false;

global.Intl = require('intl');

function withIntl(EnhancedComponent) {
  class WithIntl extends Component {
    static async getInitialProps (ctx) {
      if (!process.browser) {
        locale = ctx.req.locale;
        localePath = ctx.req.localePath;
        translation = require(`../locales/${locale}.json`);
      }

      let additionalProps = {
        locale,
        localePath,
        translation
      }

      if (EnhancedComponent.getInitialProps) {
        additionalProps = {
          ...additionalProps,
          ...await EnhancedComponent.getInitialProps(ctx)
        }
      }

      return additionalProps;
    }

    constructor(props) {
      super(props);

      /** Apply locale */
      locale = props.locale;
      localePath = props.localePath;
      translation = props.translation;
      props.dispatch(changeLocale(locale, localePath));

      /**
       * if locale data is not ready, initialize it
       */
      if (!isLocaleDataReady) {
        addLocaleData(locales[locale]);
        isLocaleDataReady = true;
      }
    }

    componentDidMount() {
      window.locale = locale;
      window.localePath = localePath;
    }

    render() {
      /**
       * Return enhanced component
       */
      return (
        <IntlProvider locale={locale} messages={translation}>
          <EnhancedComponent {...this.props} />
        </IntlProvider>
      );
    }
  }

  return connect()(WithIntl);
}

export default withIntl;