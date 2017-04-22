import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Field, reduxForm, getFormValues } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import { DatePicker, TimePicker, TextField } from 'redux-form-material-ui';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import { red500 } from 'material-ui/styles/colors';

export const NameDialog = ({
  formValues, open, title, displayName, actions, close, handleSubmit,
  initialValues, change
}) => {
  const fieldsToShow = Object.keys(initialValues);
  return (
    <Dialog
      title={title}
      actions={actions}
      open={open}
      onRequestClose={close}
    >
      <form id="protectNameForm" onSubmit={handleSubmit}>
        {
          fieldsToShow.includes('callDay') &&
          <div className="row">
            <div className="col-12" style={{ display: 'flex', alignItems: 'center' }}>
              Calling {displayName}?
              <IconButton
                id="clearCallBooking"
                onClick={() => {
                  change('callDay', null);
                  change('callTime', null);
                }}
                tooltip="Clear Call Booking"
              >
                <ClearIcon color={red500} />
              </IconButton>
            </div>

            <div className="col-12 col-md-6">
              <Field
                dialogContainerStyle="calender"
                name="callDay"
                component={DatePicker}
                minDate={moment().toDate()}
                formatDate={date => moment(date).format('LL')}
                hintText="Day of call"
                autoOk
              />
            </div>
            <div className="col-12 col-md-6">
              <Field
                name="callTime"
                component={TimePicker}
                hintText="At what time ?"
                disabled={!(formValues && formValues.callDay)}
                pedantic
              />
            </div>
          </div>
        }


        {
          fieldsToShow.includes('meetingDay') &&
          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-12" style={{ display: 'flex', alignItems: 'center' }}>
              Meeting {displayName}?
              <IconButton
                id="clearMeetingBooking"
                onClick={() => {
                  change('meetingDay', null);
                  change('meetingTime', null);
                }}
                tooltip="Clear Meeting Booking"
              >
                <ClearIcon color={red500} />
              </IconButton>
            </div>

            <div className="col-12 col-md-6">
              <Field
                name="meetingDay"
                component={DatePicker}
                minDate={moment().toDate()}
                formatDate={date => moment(date).format('LL')}
                hintText="Day of booked meeting"
                autoOk
              />
            </div>
            <div className="col-12 col-md-6">
              <Field
                name="meetingTime"
                component={TimePicker}
                hintText="At what time ?"
                disabled={!(formValues && formValues.meetingDay)}
                pedantic
              />
            </div>
          </div>
        }

        {
          fieldsToShow.includes('pastMeetingDay') &&
          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-12" style={{ display: 'flex', alignItems: 'center' }}>
              Had a meeting with {displayName}?
              <IconButton
                id="clearMeeting"
                onClick={() => {
                  change('pastMeetingDay', null);
                  change('pastMeetingTime', null);
                }}
                tooltip="Clear Meeting"
              >
                <ClearIcon color={red500} />
              </IconButton>
            </div>

            <div className="col-12 col-md-6">
              <Field
                name="pastMeetingDay"
                component={DatePicker}
                maxDate={moment().toDate()}
                formatDate={date => moment(date).format('LL')}
                hintText="When did you meet ?"
                autoOk
              />
            </div>
            <div className="col-12 col-md-6">
              <Field
                name="pastMeetingTime"
                component={TimePicker}
                hintText="At what time ?"
                disabled={!(formValues && formValues.pastMeetingDay)}
                pedantic
              />
            </div>
          </div>
        }

        <div>
          <Field
            name="comment"
            component={TextField}
            floatingLabelText="Write a comment..."
            floatingLabelFixed
            fullWidth
            multiLine
            rows={2}
            rowsMax={4}
          />
        </div>
      </form>
    </Dialog>
  );
};

const NameDialogForm = reduxForm({
  form: 'protectName',
})(NameDialog);

const mapStateToProps = state => ({
  formValues: getFormValues('protectName')(state)
});

export default connect(
  mapStateToProps
)(NameDialogForm);
