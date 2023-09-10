export const fonts = {
  Lato: require('../../assets/fonts/LatoRegular.ttf'),
  RobotoMono: require('../../assets/fonts/RobotoMono.ttf'),
  Poppins: require('../../assets/fonts/PoppinsRegular.ttf'),
  OpenSans: require('../../assets/fonts/OpenSans.ttf'),
} as const;

export const getFontOptions = () => {
  return [
    { label: 'RobotoMono', value: fonts.RobotoMono },
    { label: 'Lato', value: fonts.Lato },
    { label: 'Poppins', value: fonts.Poppins },
    { label: 'OpenSans', value: fonts.OpenSans },
  ] as const;
};
