import React from 'react';
import styled from 'styled-components';
import Button from './Button';

interface StyledSectionProps {
  title: string;
  description: string;
  link: string;
  deprecated?: boolean;
  isActionButtonDisabled?: boolean;
  onActionButtonClick: () => void;
}

const StyledSection = styled.section`
  margin-bottom: 3rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const StyledSectionInfo = styled.div<{ deprecated: boolean }>`
  margin-bottom: 1rem;

  h3 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
    font-weight: bold;
    color: ${props => (props.deprecated ? '#65676A' : '#242428')};
    line-height: 1.65;
    text-decoration: ${props => (props.deprecated ? 'line-through' : 'none')};
    word-break: break-all;
  }

  p {
    margin: 0;
    margin-bottom: 0.25rem;
    color: rgba(36, 36, 40, 0.6);
    line-height: 1.65;
  }

  a {
    color: #5e56f0;
    line-height: 1.65;
    word-break: break-all;
  }
`;

const StyledSectionAction = styled.div``;

const StyledSectionActionButton = styled(Button)`
  text-transform: capitalize;
`;

const FeatureSection: React.FC<StyledSectionProps> = ({
  title,
  description,
  link,
  deprecated = false,
  isActionButtonDisabled = false,
  onActionButtonClick,
}) => {
  return (
    <StyledSection>
      <StyledSectionInfo deprecated={deprecated}>
        <h3>
          {title} {deprecated ? '(deprecated)' : null}
        </h3>
        <p>{description}</p>
        <a href={link} target="_blank" rel="noreferrer">
          {link}
        </a>
      </StyledSectionInfo>

      <StyledSectionAction>
        <StyledSectionActionButton
          data-cy={`action-button-${title}`}
          disabled={isActionButtonDisabled}
          onClick={onActionButtonClick}
        >
          {title}
        </StyledSectionActionButton>
      </StyledSectionAction>
    </StyledSection>
  );
};

export default FeatureSection;
