import { useMediaQuery } from 'react-responsive';

export const useResponsiveDesign = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // For mobile screens
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' }); // For desktops or large screens
  const isScreenSmall = useMediaQuery({ query: '(max-height: 724px)' }); // For desktops or large screens

  return { isMobile, isDesktop,isScreenSmall };
};
 