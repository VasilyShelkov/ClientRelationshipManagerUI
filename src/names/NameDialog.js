import React from 'react';
import moment from 'moment';
import { Field, reduxForm } from 'redux-form';
import Dialog from 'material-ui/Dialog';
import { DatePicker, TimePicker } from 'redux-form-material-ui';

export const NameDialog = ({ displayName, actions }) => (
  <Dialog
    title={`Protect ${displayName}`}
    actions={actions}
    open={true}
    onRequestClose={() => ({})}
  >
    <form>
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
            defaultValue={null}
            hintText="At what time ?"
            pedantic
          />
        </div>
      </div>
    </form>

  </Dialog>
);

export default reduxForm({
  form: 'protectName',
})(NameDialog);
