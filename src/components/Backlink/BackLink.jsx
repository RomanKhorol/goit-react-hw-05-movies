import { HiArrowLeft } from 'react-icons/hi';
import { StyledBackLink } from './Backlink.styled';
const BackLink = ({ to, children }) => {
  return (
    <StyledBackLink to={to}>
      <HiArrowLeft size="24" />
      {children}
    </StyledBackLink>
  );
};
export default BackLink;
