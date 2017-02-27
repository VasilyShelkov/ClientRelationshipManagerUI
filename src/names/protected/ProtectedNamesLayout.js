import React, { Component } from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import { Tabs, Tab } from 'material-ui/Tabs';

import { ProtectedIcon, MetWithProtectedIcon } from '../../app/icons';
import StandardProtectedNamesWithData from './StandardProtectedNamesWithData';
import { getNameByNameId } from '../nameListShapeShifter';

export default class ProtectedNamesLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'protected',
    };
  }

  handleChangeTab = (value) => {
    this.setState({ value });
  }

  render() {
    const {
      id, loadingProtected, protectedNames,
      loadingMetWithProtected, metWithProtectedNames,
      selectedNameId
    } = this.props;

    const selectedProtected = getNameByNameId(protectedNames, selectedNameId);
    const selectedProtectedNameDrawerOpen = Boolean(selectedProtected) && this.state.value === 'protected';

    const selectedMetWithProtected = getNameByNameId(metWithProtectedNames, selectedNameId);
    const selectedMetWithProtectedNameDrawerOpen = Boolean(selectedMetWithProtected) && this.state.value === 'metWith';
    const selectedNameDrawerOpen = (
      selectedProtectedNameDrawerOpen || selectedMetWithProtectedNameDrawerOpen
    );

    return (
      <Tabs
        className={selectedNameDrawerOpen && 'protected__container__names'}
        style={{ marginTop: '20px' }}
        value={this.state.value}
        onChange={this.handleChangeTab}
      >
        <Tab
          label="PROTECTED"
          value="protected"
          icon={loadingProtected ? <CircularProgress /> : <ProtectedIcon />}
        >
          <StandardProtectedNamesWithData
            userId={id}
            loading={loadingProtected}
            names={protectedNames}
            selectedProtected={selectedProtected}
            selectedNameDrawerOpen={selectedProtectedNameDrawerOpen}
            selectedNameId={selectedNameId}
            nameListType="protected"
          />
        </Tab>

        <Tab
          label="MET WITH"
          value="metWithProtected"
          icon={loadingMetWithProtected ? <CircularProgress /> : <MetWithProtectedIcon />}
        >
          <StandardProtectedNamesWithData
            userId={id}
            loading={loadingMetWithProtected}
            names={metWithProtectedNames}
            selectedProtected={selectedMetWithProtected}
            selectedNameDrawerOpen={selectedProtectedNameDrawerOpen}
            selectedNameId={selectedNameId}
            nameListType="metWithProtected"
          />
        </Tab>
      </Tabs>
    );
  }
}
