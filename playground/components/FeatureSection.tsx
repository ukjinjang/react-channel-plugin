import React from 'react';
import styled from '@emotion/styled';

import Button from './Button';

//
//
//

interface StyledSectionProps {
  children?: React.ReactNode;
  title: string;
  description: React.ReactNode;
  link?: string;
  deprecated?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

//
//
//

const StyledSection = styled.section`
  margin-bottom: 3rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const StyledSectionInfo = styled.div`
  margin-bottom: 1rem;

  h3 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
    font-weight: bold;
    color: #242428;
    line-height: 1.65;
    word-break: break-all;

    &[data-deprecated='true'] {
      color: #65676a;
      text-decoration: line-through;
    }
  }

  p {
    margin: 0;
    color: rgba(36, 36, 40, 0.6);
    line-height: 1.65;
  }

  a {
    margin-top: 0.25rem;
    color: #5e56f0;
    line-height: 1.65;
    word-break: break-all;
  }
`;

//
//
//

const StyledSectionAction = styled.div``;

const StyledSectionActionButton = styled(Button)`
  text-transform: capitalize;
`;

const FeatureSection: React.FC<StyledSectionProps> = ({
  children,
  title,
  description,
  link,
  deprecated = false,
  disabled = false,
  onClick,
}) => {
  /**
   * Section information
   */
  const renderSectionInfo = () => {
    return (
      <StyledSectionInfo data-deprecated={deprecated}>
        <h3>
          {title} {deprecated ? '(deprecated)' : null}
        </h3>
        <p>{description}</p>
        {link ? (
          <a href={link} target="_blank" rel="noreferrer">
            {link}
          </a>
        ) : null}
      </StyledSectionInfo>
    );
  };

  /**
   *
   */
  const renderSectionAction = () => {
    return (
      <StyledSectionAction>
        {children}
        {onClick ? (
          <StyledSectionActionButton
            data-cy={`action-button-${title}`}
            disabled={disabled}
            onClick={onClick}
          >
            {title}
          </StyledSectionActionButton>
        ) : null}
      </StyledSectionAction>
    );
  };

  //
  //
  //

  return (
    <StyledSection>
      {renderSectionInfo()}
      {renderSectionAction()}
    </StyledSection>
  );
};

export default FeatureSection;
