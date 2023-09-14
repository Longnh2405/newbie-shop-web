import React, { Fragment, useRef, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import { IconButton, styled } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const LoadingButtonStyled = styled(LoadingButton)((props) => {
  const { variant, color, theme } = props;
  if (variant === 'text') {
    if (color === 'error') {
      return {};
    }
  }
  if (variant === 'contained') {
    if (color === 'error') {
      return {
        backgroundColor: theme.custom.colors.red,
      };
    }
    return {
      backgroundColor: theme.custom.colors.darkblue,
    };
  }
  if (variant === 'outlined') {
    return {
      color: theme.custom.colors.blackblue,
      borderColor: theme.custom.colors.blue,
    };
  }

  return {};
});

const StyledButton = (props) => {
  const {
    children,
    style,
    secondary,
    className,
    isSmallBtn,
    isUpload,
    isIconButton,
    accept,
    onChangeFile,
    selectMultipe,
    disabled,
    ...rest
  } = props;
  const classes = useStyles();
  const refUpload = useRef();
  const [isUploading, setUploading] = useState(false);

  //! Function
  const onClickUpload = () => {
    refUpload.current.click();
  };

  //! Render
  if (isUpload) {
    return (
      <Fragment>
        <input
          ref={refUpload}
          accept={accept}
          style={{ display: 'none' }}
          type="file"
          multiple={selectMultipe}
          onChange={(e) => onChangeFile(e, { ref: refUpload, setUploading })}
          disabled={disabled}
        />

        {isIconButton ? (
          <IconButton onClick={onClickUpload}>{children}</IconButton>
        ) : (
          <LoadingButtonStyled
            loading={isUploading}
            variant="contained"
            sx={{
              textTransform: 'initial',
              minWidth: 36,
              minHeight: 36,
              boxShadow: 'none',
              padding: '12px 24px',
              ...style,
            }}
            className={classNames(classes.root, className)}
            {...rest}
            onClick={onClickUpload}
          >
            {children}
          </LoadingButtonStyled>
        )}
      </Fragment>
    );
  }

  return (
    <LoadingButtonStyled
      variant="contained"
      disabled={disabled}
      sx={{
        textTransform: 'initial',
        minWidth: 36,
        minHeight: 36,
        boxShadow: 'none',
        padding: '12px 24px',
        ...style,
      }}
      className={classNames(classes.root, className)}
      {...rest}
    >
      {children}
    </LoadingButtonStyled>
  );
};

export default StyledButton;
