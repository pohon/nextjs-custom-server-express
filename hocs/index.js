import { compose } from 'redux';
import withAuth from './withAuth';
import withGuest from './withGuest';
import withIntl from './withIntl';
import withSession from './withSession';

const normalPage = compose(
  withSession,
  withIntl
);


export const pageWithAuth = compose(
  withAuth,
  normalPage
);

export const pageWithGuest = compose(
  withGuest,
  normalPage
)

export default normalPage;