import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Icon,
  InputAdornment,
  //   Autocomplete,
  //   TextField,
  makeStyles,
  useTheme,
} from '@openemp-mf/styleguide';

import langs from 'assets/i18n/translation.json';

const useStyles = makeStyles(() => ({
  select: {
    '& :focus': {
      backgroundColor: 'transparent',
    },
  },
  selectRtl: {
    '& .MuiSelect-outlined': {
      paddingLeft: 32,
      paddingRight: 14,
    },
  },
}));

export default function LangSelector() {
  const classes = useStyles();
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState('en');

  const handleChange = (event) => {
    const lang = event.target.value;
    i18n.changeLanguage(lang).then(() => {
      const langDir = i18n.dir(lang);
      document.querySelector('body').setAttribute('dir', langDir);
      theme.direction = langDir;
      localStorage.setItem('lang', JSON.stringify({ name: lang, dir: langDir }));
      setValue(lang);
    });
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="langLabel">{t('Language')}</InputLabel>
      <Select
        className={clsx(classes.select, theme.direction === 'rtl' && classes.selectRtl)}
        id="language"
        onChange={handleChange}
        label="Language"
        value={value}
        IconComponent={() => (
          <InputAdornment position={theme.direction === 'rtl' ? 'end' : 'start'}>
            <Icon>language</Icon>
          </InputAdornment>
        )}
      >
        {Object.keys(langs).map((lang) => (
          <MenuItem value={lang} key={langs[lang].name}>
            {langs[lang].nativeName}
          </MenuItem>
        ))}
      </Select>
      {/* <Autocomplete
        id="combo-box-demo"
        options={top100Films}
        getOptionLabel={(option) => option.title}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
      /> */}
    </FormControl>
  );
}
