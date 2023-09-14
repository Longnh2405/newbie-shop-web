import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Field, useFormikContext } from 'formik';
import CustomField from 'components/CustomField';
import { useGetProvince } from 'hooks/location/useGetProvince';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const useStyles = makeStyles((theme) => {
  return {};
});

const FieldLocation = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { values, setFieldValue } = useFormikContext();
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const getProvince = async () => {
      const res = await fetch('https://provinces.open-api.vn/api/?depth=3');
      const jsonData = await res.json();
      setProvinces(jsonData);
    };
    getProvince();
  }, []);

  const provinceOption = useMemo(() => {
    const provincesConvert = provinces?.map((item) => ({
      ...item,
      value: item?.code,
      label: item?.name,
    }));
    return provincesConvert;
  }, [provinces]);

  const districtOption = useMemo(() => {
    if (!values.province) return [];
    const districts = values.province.districts;
    return districts.map((item) => ({
      ...item,
      value: item?.code,
      label: item?.name,
    }));
  }, [values.province, provinces]);

  const wardOption = useMemo(() => {
    if (!values.district) return [];
    const wards = values.district.wards;
    return wards.map((item) => ({
      ...item,
      value: item?.code,
      label: item?.name,
    }));
  }, [values.province, values.district, provinces]);

  //! Function
  useEffect(() => {
    setFieldValue('district', '');
    setFieldValue('ward', '');
  }, [values.province]);

  useEffect(() => {
    setFieldValue('ward', '');
  }, [values.district]);

  //! Render
  return (
    <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
      <Field
        component={CustomField.SelectField}
        isAutoCompleteOne
        options={provinceOption}
        label="Tỉnh/ Thành phố"
        name="province"
        placeholder="Chọn tỉnh/ thành phố"
        required
      />
      <Field
        component={CustomField.SelectField}
        isAutoCompleteOne
        options={districtOption}
        label="Quận/ huyện"
        name="district"
        placeholder="Chọn quận/ huyện"
        required
      />
      <Field
        component={CustomField.SelectField}
        isAutoCompleteOne
        options={wardOption}
        label="Xã/ phường"
        name="ward"
        placeholder="Chọn xã/ phường"
        required
      />
    </div>
  );
};

export default FieldLocation;
