import React, { useState } from 'react';
import { MainBox } from '../styles';
import { EducatorProfileStep } from '../../EducatorOnBoarding/Steps/EducatorProfileStep/educatorProfileStep';
import { EducatorProfiles } from '../../EducatorProfiles/educatorProfiles';

export const Profile = () => {
  const [edit, setEdit] = useState(false);
  return (
    <MainBox width={"full"}>
      {edit ? (
        <EducatorProfileStep setEdit={setEdit} edit={edit} />
      ) : (
        <EducatorProfiles setEdit={setEdit} edit={edit} dashboard={true}/>
      )}
    </MainBox>
  );
};
