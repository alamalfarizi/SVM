// project imports
import HeaderPublicLayout from './Header';
import FooterPublicLayout from './Footer';

const PublicLayout = ({ children }) => {
  return (
    <>
      <HeaderPublicLayout />
      {children}
      {/* <FooterPublicLayout /> */}
    </>
  );
};

export default PublicLayout;
