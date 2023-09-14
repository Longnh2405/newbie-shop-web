import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Field, FieldArray, Form, Formik } from 'formik';
import { Box } from '@mui/material';
import CustomField from 'components/CustomField';
import { useQueryClient } from 'react-query';
import { useState } from 'react';
import { isEmpty } from 'lodash';
import { COLORS } from 'constants';
import { useGetCatalog } from 'hooks/catalog/useGetCatalog';
import { SIZES } from 'constants';
import * as Yup from 'yup';
import { useUploadFiles } from 'hooks/upload/useUploadFiles';
import { useAddProduct } from 'hooks/product/useAddProduct';
import { showSuccess } from 'helpers/toast';
import { BASE_IMAGE } from 'constants/api';
import { useUpdateProduct } from 'hooks/product/useUpdateProduct';

const useStyles = makeStyles((theme) => {
  return {
    content: {
      width: '60vw',
    },
    headerPopupAddUser: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 36,
      position: 'sticky',
      top: 0,
      zIndex: 10,
      backgroundColor: theme.custom.colors.white,
      '& .label-add-user': {
        fontSize: 16,
        fontWeight: 700,
        textTransform: 'uppercase',
        lineHeight: '24px',
        paddingBottom: '15px',
        borderBottom: '2px solid #ddd',
        color: '#112957',
      },
      '& .icon-close-header-add-user': {
        height: '0%',
        padding: '15px',
        backgroundColor: '#F1F2F4',
        borderRadius: '12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        '&:active': {
          borderRadius: '12px',
          backgroundColor: '#ccc',
        },
      },
    },
    footerPopupAddUser: {
      marginTop: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '20px',
    },
    fieldBox: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      width: '100%',
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
      },
      gridColumnGap: '40px',
      gridRowGap: '15px',
      marginBottom: '30px',
    },
    fieldNote: {
      margin: '30px 0',
    },
    loading: {
      width: '24.5px !important',
      height: '24.5px !important',
    },
    tab: {
      border: '1px solid #C6CCD3 !important',
      borderTopLeftRadius: '8px !important',
      borderTopRightRadius: '8px !important',
      color: '#434D56 !important',
      opacity: '1 !important',
    },
    tabActive: {
      borderTopLeftRadius: '8px !important',
      borderTopRightRadius: '8px !important',
      color: '#ffffff !important',
      opacity: '1 !important',
      backgroundColor: '#6BB8F4 !important',
    },
    labelField: {
      fontWeight: 600,
      color: theme.custom.colors.darkblue,
      marginBottom: 8,
    },
    blockImg: {
      width: '100%',
      minHeight: '120px',
      borderRadius: '12px',
      border: `1px solid ${theme.custom.colors.grayborder}`,
      // display: 'flex',
      // flexWrap: 'wrap',
    },
    imgWrapper: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      flexWrap: 'wrap',
      gap: '12px',
      // position: 'relative',
    },
    imageItem: {
      position: 'relative',
    },
    IconButton: {
      width: '10px !important',
      height: '10px !important',
      color: '#fff',
    },
    ButtonClose: {
      background: 'red',
      borderRadius: '50%',
      width: '18px',
      height: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      position: 'absolute',
      top: -6,
      left: '90px',
      zIndex: 10,
    },
    image: {
      width: '100px',
      height: '90px',
      objectFit: 'scale-down',
      border: '1px dashed #ddd',
    },
    errMsg: {
      color: 'red',
      fontSize: '0.75rem',
    },
    fieldArr: {
      display: 'flex',
      gap: '20px',
      '& .field': {
        flex: 1,
      },
      '& .btn': {
        paddingTop: '32px',
        display: 'flex',
        gap: '8px',
        width: '106px',
      },
    },
    wrapperFieldArr: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    btnPlusCommision: {
      width: '28px',
      height: '40px',
    },
  };
});

const ContentDialog = ({ toggle, item, refetch }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const isEdit = !isEmpty(item);
  const { data: resListCatalog } = useGetCatalog({
    page: 1,
    limit: 1000,
    search: '',
  });
  const listCatalog = resListCatalog?.data?.data || [];
  const catalogOption = listCatalog.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const [imgInit, setImgInit] = useState(item?.image_with_product || []);
  const [filesSelected, setFilesSelected] = useState([]);

  const handleAddFile = (e) => {
    const file = Array.from(e.target.files);

    setFilesSelected((prev) => [...prev, ...file]);
  };

  const handleDeleteFile = (file, index) => {
    if (file?.image?.url) {
      const newFiles = [...imgInit];
      newFiles.splice(index, 1);
      setImgInit(newFiles);
    } else {
      const newFiles = [...filesSelected];
      newFiles.splice(index, 1);
      setFilesSelected(newFiles);
    }
  };

  const [isHasFiles, setIsHasFiles] = useState(true);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Tên là trường bắt buộc'),
    price: Yup.string().required('Giá thành là trường bắt buộc'),
    catalog_id: Yup.string().required('Phân loại là trường bắt buộc'),
    description: Yup.string().required('Mô tả là trường bắt buộc'),
    discount: Yup.string().required('Giá khuyến mại là trường bắt buộc'),
    property: Yup.array().of(
      Yup.object().shape({
        color_id: Yup.string().required('Màu là trường bắt buộc'),
        size_id: Yup.string().required('Size là trường bắt buộc'),
        amount: Yup.string().required('Số lượng là trường bắt buộc'),
      }),
    ),
  });
  const propertyItem =
    item?.product_detail?.map((item) => ({
      color_id: item.color_id,
      size_id: item.size_id,
      amount: item.amount,
    })) || [];
  const initialValues = {
    name: item?.name || '',
    price: item?.price || '',
    catalog_id: item?.catalog_id || '',
    description: item?.description || '',
    discount: item?.discount || '',
    property: isEdit
      ? propertyItem
      : [
          {
            color_id: '',
            size_id: '',
            amount: '',
          },
        ],
  };

  const initValueProperty = {
    color_id: '',
    size_id: '',
    amount: '',
  };

  const { mutateAsync: uploadFiles } = useUploadFiles();
  const { mutateAsync: addProduct } = useAddProduct();
  const { mutateAsync: updateProduct } = useUpdateProduct();

  //! Function

  const handleSubmit = async (value) => {
    const countImg = filesSelected.length + imgInit.length;
    if (countImg >= 2) {
      setIsHasFiles(true);
      const formData = new FormData();
      for (let index = 0; index < filesSelected.length; index++) {
        formData.append('files', filesSelected[index]);
      }
      const initImgId = imgInit.map((item) => item.image_id);
      try {
        let dataImg = [];
        if (!isEmpty(filesSelected)) {
          const resImg = await uploadFiles(formData);
          dataImg = resImg?.data?.data || [];
        }
        const imgIDs = dataImg?.map((item) => item.id) || [];
        const bodyProduct = {
          ...value,
          image_id: [...imgIDs, ...initImgId],
        };
        if (isEdit) {
          await updateProduct({ id: item.id, data: bodyProduct });
          showSuccess('Cập nhật sản phẩm thành công');
        } else {
          await addProduct(bodyProduct);
          showSuccess('Thêm sản phẩm thành công');
        }
        refetch();
        toggle();
      } catch (error) {
        console.log('error: ', error);
        showError(error);
      }
    } else {
      setIsHasFiles(false);
    }
  };

  //! Render
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ values, errors }) => {
        return (
          <Form className={classes.content}>
            <div className={classes.headerPopupAddUser}>
              <div className="label-add-user">{item ? 'Chỉnh sửa thông tin sản phẩm' : 'Thêm mới sản phẩm'}</div>
              <div className="icon-close-header-add-user" onClick={toggle}>
                <CommonIcons.Close sx={{ width: 20, height: 20 }} />
              </div>
            </div>
            <div>
              <Box className={classes.fieldBox}>
                <Field
                  label="Tên sản phẩm"
                  placeholder="Tên sản phẩm"
                  name="name"
                  LabelColorPrimary
                  component={CustomField.InputField}
                />

                <Field
                  label="Giá thành"
                  placeholder="Giá thành"
                  LabelColorPrimary
                  name="price"
                  component={CustomField.InputField}
                />

                <Field
                  label="Phân loại"
                  placeholder="Phân loại"
                  LabelColorPrimary
                  name="catalog_id"
                  component={CustomField.SelectField}
                  options={catalogOption}
                />
                <Field
                  label="Giá khuyến mãi"
                  placeholder="Giá khuyến mãi"
                  LabelColorPrimary
                  name="discount"
                  component={CustomField.InputField}
                />
              </Box>

              <FieldArray name="property">
                {({ remove, push }) => {
                  return (
                    <div className={classes.wrapperFieldArr}>
                      {values.property?.map((item, index) => {
                        return (
                          <div key={index} className={classes.fieldArr}>
                            <div className="field">
                              <Field
                                label="Màu sắc"
                                placeholder="Màu sắc"
                                LabelColorPrimary
                                name={`property.${index}.color_id`}
                                component={CustomField.SelectField}
                                options={COLORS}
                              />
                            </div>
                            <div className="field">
                              <Field
                                label="Size"
                                placeholder="Size"
                                LabelColorPrimary
                                name={`property.${index}.size_id`}
                                component={CustomField.SelectField}
                                options={SIZES}
                              />
                            </div>

                            <div className="field">
                              <Field
                                label="Số lượng"
                                placeholder="Số lượng"
                                LabelColorPrimary
                                name={`property.${index}.amount`}
                                component={CustomField.InputField}
                              />
                            </div>
                            <div className="btn">
                              {values.property.length > 1 && (
                                <CommonStyles.Button className={classes.btnPlusCommision} onClick={() => remove(index)}>
                                  <CommonIcons.Remove />
                                </CommonStyles.Button>
                              )}
                              {index === 0 && (
                                <CommonStyles.Button
                                  className={classes.btnPlusCommision}
                                  onClick={() => push(initValueProperty)}
                                >
                                  <CommonIcons.Add />
                                </CommonStyles.Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              </FieldArray>

              <Box style={{ marginTop: '12px' }}>
                <div className={classes.labelField}>Ảnh sản phẩm</div>
                <div className={classes.blockImg}>
                  <div className={classes.imgWrapper}>
                    {imgInit.map((file, index) => {
                      return (
                        <div key={file.index} className={classes.imageItem}>
                          <img className={classes.image} src={`${BASE_IMAGE}${file.image.url}`} alt={file.id} />
                          <div className={classes.ButtonClose} onClick={() => handleDeleteFile(file, index)}>
                            <CommonIcons.Close className={classes.IconButton} />
                          </div>
                        </div>
                      );
                    })}
                    {Array.from(filesSelected).map((file, index) => {
                      return (
                        <div key={index} className={classes.imageItem}>
                          <img
                            className={classes.image}
                            key={file.name}
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                          />
                          <div className={classes.ButtonClose} onClick={() => handleDeleteFile(file, index)}>
                            <CommonIcons.Close className={classes.IconButton} />
                          </div>
                        </div>
                      );
                    })}
                    <div>
                      <CommonStyles.Button selectMultipe isUpload isIconButton onChangeFile={(e) => handleAddFile(e)}>
                        <CommonIcons.AddPhoto sx={{ fontSize: 50 }} />
                      </CommonStyles.Button>
                    </div>
                  </div>
                  {!isHasFiles && (
                    <div style={{ paddingLeft: '10px' }} className={classes.errMsg}>
                      Chọn 2 ảnh trở lên
                    </div>
                  )}
                </div>
              </Box>
              <Box className={classes.fieldNote}>
                <Field
                  component={CustomField.TextAreaField}
                  LabelColorPrimary
                  minRows={4}
                  label="Mô tả"
                  name="description"
                  placeholder="Mô tả"
                />
              </Box>

              <Box sx={{ width: 'calc(50% - 20px)' }}></Box>
            </div>

            <div className={classes.footerPopupAddUser}>
              <CommonStyles.Button
                type="submit"
                style={{ width: 160 }}
                //  loading={editingUser || addingUser}
              >
                {t('common:save')}
              </CommonStyles.Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ContentDialog;
