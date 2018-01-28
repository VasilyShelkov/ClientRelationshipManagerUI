import * as React from 'react';
// import * as Cookies from 'js-cookie';
import { TextField } from 'redux-form-material-ui';
// import places from 'places.js';
import { WrappedFieldProps } from 'redux-form';

import { colors } from 'material-ui';
import { Error as ErrorIcon } from 'material-ui-icons';

// import DropDownMenu from 'material-ui/DropDownMenu';
// import MenuItem from 'material-ui/MenuItem';
// import PrivateIcon from 'material-ui/svg-icons/action/visibility';
// import PublicIcon from 'material-ui/svg-icons/social/people';
import './FormElements.css';
import Notification from './Notification';

export const required = (value: string) => (value ? undefined : 'Required');
export const minLength = (value: string) =>
  value.length > 6 ? undefined : 'Minimum length of 6 characters';

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
export const emailFormat = (value: string) =>
  emailRegex.test(value) ? undefined : 'Not a valid email address';

interface TextFieldInputProps {
  label: string;
}
type TextFieldProps = TextFieldInputProps & WrappedFieldProps;
export const renderTextField: React.StatelessComponent<TextFieldProps> = ({
  input,
  label,
  meta: { touched, error },
  ...customProps
}) => (
  <TextField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...customProps}
  />
);

// export class AddressField extends React.Component {
//   componentDidMount() {
//     if (!Cookies.get('disable-places')) {
//       places({
//         container: document.querySelector('#company-address-input'),
//       });
//     }
//   }

//   render() {
//     const {
//       input,
//       label,
//       meta: { touched, error },
//       ...customProps
//     } = this.props;

//     return (
//       <TextField
//         id="company-address-input"
//         floatingLabelText={label}
//         errorText={touched && error}
//         {...input}
//         {...customProps}
//       />
//     );
//   }
// }

// export const renderCheckbox = ({ input, label }) => (
//   <TextField label={label} checked={input.value} onCheck={input.onChange} />
// );

// export const renderIconDropdown = ({ input: { value, onChange } }) => (
//   <DropDownMenu
//     id="name-visibility-field"
//     anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//     value={value}
//     onChange={(event, index, dropdownValue) => onChange(dropdownValue)}
//     style={{ height: '35px' }}
//     iconStyle={{ top: '-1px', right: '-35px', padding: '0px' }}
//     labelStyle={{ padding: '0px' }}
//     underlineStyle={{ borderTop: '0px' }}
//   >
//     <MenuItem
//       id="private-comment-visibility-choice"
//       value="private"
//       leftIcon={<PrivateIcon />}
//       label={<PrivateIcon />}
//       primaryText={
//         <div style={{ lineHeight: '20px' }}>
//           <strong>Private</strong>
//           <div>Only you can see it</div>
//         </div>
//       }
//     />
//     <MenuItem
//       id="public-comment-visibility-choice"
//       value="public"
//       leftIcon={<PublicIcon />}
//       label={<PublicIcon />}
//       primaryText={
//         <div style={{ lineHeight: '20px' }}>
//           <strong>Public</strong>
//           <div>Whole company can see it</div>
//         </div>
//       }
//     />
//   </DropDownMenu>
// );

export const FormErrorNotification = ({
  message = 'An error has occured!',
  zDepth = 2,
  backgroundColor = colors.red[600],
}) => (
  <Notification
    message={message}
    zDepth={zDepth}
    backgroundColor={colors.red[600]}
    icon={
      <ErrorIcon
        className="Form__notification__icon"
        style={{ color: 'white' }}
      />
    }
  />
);
