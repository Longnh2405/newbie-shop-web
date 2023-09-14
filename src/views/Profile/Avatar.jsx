import React, { Fragment, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { Box, CircularProgress, IconButton } from '@mui/material';
import Camera from 'assets/IconsSVG/Profile/Camera.svg';
import defaultAvatar from 'assets/images/Profile/avatar.png';
// import { useUploadLogo } from 'hooks/projects/useUploadLogo';
import { BASE_IMAGE } from 'constants/api';
// import { useEditUser } from 'hooks/users/useEditUser';
import { showError, showSuccess } from 'helpers/toast';
import httpServices from 'services/httpServices';

const useStyles = makeStyles((theme) => {
  return {
    avatar: {
      width: '168px',
      height: '168px',
      borderRadius: '50%',
      backgroundImage: `url(${defaultAvatar})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      marginBottom: '24px',
      '& .cameraContainer': {
        position: 'absolute',
        bottom: '0',
        right: '0',
        width: '48px',
        height: '48px',
        '& .camera': {
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundImage: `url(${Camera})`,
          backgroundSize: '50%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          border: 'solid 3px #fff',
          backgroundColor: '#E7E7E7',
          position: 'absolute',
          bottom: '0',
          right: '0',
        },
      },
    },
  };
});

const Avatar = ({ item, id }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const [avatar, setAvatar] = useState(item || null);
  // const { isLoading: isLoadingUpload, mutateAsync: uploadLogo } = useUploadLogo();
  // const { isLoading: editingUser, mutateAsync: editUser } = useEditUser();

  //! Function
  const handleChangeImage = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    try {
      // const response = await uploadLogo(formData);
      // const logoUrl = response?.data?.data.uri;
      // setAvatar(logoUrl);
      // await editUser({
      //   avatar: logoUrl,
      //   _id: id,
      // });
      // const user = httpServices.getUserInfoStorage();
      // httpServices.saveUserInfoStorage({ ...user, avatar: logoUrl });
      showSuccess(t('common:profile_update_success'));
    } catch (error) {
      showError(t('common:profile_update_fail'));
    }
  };

  //! Render
  return (
    <div className={classes.avatar} style={{ backgroundImage: `url(${avatar ? BASE_IMAGE + avatar : defaultAvatar})` }}>
      <IconButton color="primary" aria-label="upload picture" component="label" className="cameraContainer">
        {1 === 2 ? (
          <Box>
            <CircularProgress />
          </Box>
        ) : (
          <Fragment>
            <input hidden accept="image/*" type="file" onChange={handleChangeImage} />
            <div className="camera"></div>
          </Fragment>
        )}
      </IconButton>
    </div>
  );
};

export default Avatar;
