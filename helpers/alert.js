import Alert from '../components/Alert';
import { createConfirmation } from 'react-confirm';

const defaultAlert = createConfirmation(Alert);

export default function alert(message, options = {}) {
  return defaultAlert({ message, ...options });
}