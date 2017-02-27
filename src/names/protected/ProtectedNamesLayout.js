import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';

import { ProtectedIcon, MetWithProtectedIcon } from '../../app/icons';
import {
  ProtectedNamesWithData, MetWithProtectedNamesWithData
} from './ProtectedNamesWithData';

export const ProtectedNameTabs = ({ selectedNameDrawerOpen }) => (
  <div
    className={selectedNameDrawerOpen && 'protected__container__names'}
    style={{ marginTop: '20px' }}
  >
    <Tabs>
      <Tab icon={<ProtectedIcon />} label="PROTECTED">
        <ProtectedNamesWithData />
      </Tab>

      <Tab icon={<MetWithProtectedIcon />} label="MET WITH">
        <MetWithProtectedNamesWithData />
      </Tab>
    </Tabs>
  </div>
);

const mapStateToProps = state => ({
  selectedNameDrawerOpen: state.name.selectedProtected !== false
});

export default connect(mapStateToProps)(ProtectedNameTabs);
