import moment from 'moment';

export const cleanCharacters = (string) => {
  let clean = string;
  const replaces = [
    { character: 'À', value: 'A' },
    { character: 'Á', value: 'A' },
    { character: 'Â', value: 'A' },
    { character: 'Ã', value: 'A' },
    { character: 'Ä', value: 'A' },
    { character: 'Å', value: 'A' },
    { character: 'Æ', value: 'AE' },
    { character: 'à', value: 'a' },
    { character: 'á', value: 'a' },
    { character: 'â', value: 'a' },
    { character: 'ã', value: 'a' },
    { character: 'ä', value: 'a' },
    { character: 'å', value: 'a' },
    { character: 'æ', value: 'ae' },
    { character: 'È', value: 'E' },
    { character: 'É', value: 'E' },
    { character: 'Ê', value: 'E' },
    { character: 'Ë', value: 'E' },
    { character: 'è', value: 'e' },
    { character: 'é', value: 'e' },
    { character: 'ê', value: 'e' },
    { character: 'ë', value: 'e' },
    { character: 'Ì', value: 'I' },
    { character: 'Í', value: 'I' },
    { character: 'Î', value: 'I' },
    { character: 'Ï', value: 'I' },
    { character: 'ì', value: 'i' },
    { character: 'í', value: 'i' },
    { character: 'î', value: 'i' },
    { character: 'ï', value: 'i' },
    { character: 'Ò', value: 'O' },
    { character: 'Ó', value: 'O' },
    { character: 'Ô', value: 'O' },
    { character: 'Õ', value: 'O' },
    { character: 'Ö', value: 'O' },
    { character: 'Ø', value: 'O' },
    { character: 'Œ', value: 'OE' },
    { character: 'ò', value: 'o' },
    { character: 'ó', value: 'o' },
    { character: 'ô', value: 'o' },
    { character: 'õ', value: 'o' },
    { character: 'ö', value: 'o' },
    { character: 'ø', value: 'o' },
    { character: 'œ', value: 'oe' },
    { character: 'Ù', value: 'U' },
    { character: 'Ú', value: 'U' },
    { character: 'Û', value: 'U' },
    { character: 'Ü', value: 'U' },
    { character: 'ù', value: 'u' },
    { character: 'ú', value: 'u' },
    { character: 'û', value: 'u' },
    { character: 'ü', value: 'u' },
    { character: 'Ç', value: 'C' },
    { character: 'Ð', value: 'E' },
    { character: 'Ñ', value: 'N' },
    { character: 'Š', value: 'S' },
    { character: 'Ý', value: 'Y' },
    { character: 'Ÿ', value: 'Y' },
    { character: 'ç', value: 'c' },
    { character: 'ð', value: 'e' },
    { character: 'ñ', value: 'n' },
    { character: 'š', value: 's' },
    { character: 'ý', value: 'y' },
    { character: 'ÿ', value: 'y' },
    { character: ' ', value: '+' }
  ];
  replaces.forEach((replace) => {
    // eslint-disable-next-line security/detect-non-literal-regexp
    const reg = new RegExp(replace.character, 'g');
    clean = clean.replace(reg, replace.value);
  });
  return clean;
};

export const dateFormat = (type) => {
  switch (type) {
    case 'day':
      return moment(new Date()).format('DD');
    case 'month':
      return moment(new Date()).format('MM');
    case 'year':
      return moment(new Date()).format('YYYY');
    default:
  }
  return null;
};
