import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Field, reduxForm, getFormValues } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import { DatePicker, TimePicker } from 'redux-form-material-ui';

export const NameDialog = ({ formValues, open, displayName, actions, close, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Dialog
      title={`Protect ${displayName}`}
      actions={actions}
      open={open}
      onRequestClose={close}
    >
      <div className="row">
        <div className="col-12">
          Calling {displayName}?
        </div>
        <div className="col-12 col-md-6">
          <Field
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
            defaultValue={null}
            hintText="At what time ?"
            disabled={!(formValues && formValues.callDay)}
            pedantic
          />
        </div>
      </div>


      <div className="row" style={{ marginTop: '10px' }}>
        <div className="col-12">
          Meeting {displayName}?
        </div>
        <div className="col-12 col-md-6">
          <Field
            name="meetingDay"
            component={DatePicker}
            minDate={moment().toDate()}
            formatDate={date => moment(date).format('LL')}
            hintText="Day of meeting"
            autoOk
          />
        </div>
        <div className="col-12 col-md-6">
          <Field
            name="meetingTime"
            component={TimePicker}
            format={value => moment(value).format('THH:mm:ss.SSSZ')}
            defaultValue={null}
            hintText="At what time ?"
            disabled={!(formValues && formValues.meetingDay)}
            pedantic
          />
        </div>
      </div>
    </Dialog>
  </form>
);

const NameDialogForm = reduxForm({
  form: 'protectName',
})(NameDialog);

const mapStateToProps = state => ({
  formValues: getFormValues('protectName')(state)
});

export default connect(
  mapStateToProps
)(NameDialogForm);
