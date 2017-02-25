import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import { fullWhite, green500 } from 'material-ui/styles/colors';

import Name from './Name';

export default ({
  names, selectedNamePosition, showCreateNameForm = null, openNameDetails, isProtected
}) => (
  <div>
    {
      names.length ?
        names.map((name, index) => (
          <Name
            key={`name-${index}`}
            selected={index === selectedNamePosition}
            showMoreDetails={() => openNameDetails(index)}
            isProtected={isProtected}
            selectedNameDrawerOpen={selectedNamePosition !== false}
            {...name}
          />
        ))
      :
        <div>
          {
            showCreateNameForm ?
              <RaisedButton
                onClick={showCreateNameForm}
                labelStyle={{ color: fullWhite }}
                backgroundColor={green500}
                label="Create first name"
                icon={<AddIcon color={fullWhite} />}
                fullWidth
              />
            :
              'You currently have none'
          }
        </div>
    }
  </div>
);
