import { swal } from 'react-redux-sweetalert';

export const APOLLO_MUTATION_INIT = 'APOLLO_MUTATION_INIT';
export const APOLLO_MUTATION_RESULT = 'APOLLO_MUTATION_RESULT';
export const showSuccessNotification = ({ title, firstName, lastName }) =>
  swal({
    title,
    text: `${firstName} ${lastName} is now part of the list`,
    type: 'success',
    showConfirmButton: true,
    closeOnConfirm: true
  });
