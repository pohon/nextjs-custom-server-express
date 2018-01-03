import Confirm from '../components/Confirm';
import { createConfirmation } from 'react-confirm';

const defaultConfirmation = createConfirmation(Confirm);

export default function confirm(message, options = {}) {
  return defaultConfirmation({ message, ...options });
}