import { swal } from 'react-redux-sweetalert';

export const REACT_ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
export const APOLLO_MUTATION_INIT = 'APOLLO_MUTATION_INIT';
export const APOLLO_MUTATION_RESULT = 'APOLLO_MUTATION_RESULT';

interface Props {
  title: string;
  firstName: string;
  lastName: string;
}
export const showSuccessNotification = ({
  title,
  firstName,
  lastName,
}: Props) =>
  swal({
    title,
    text: `${firstName} ${lastName} is now part of the list`,
    type: 'success',
    showConfirmButton: true,
    closeOnConfirm: true,
  });
