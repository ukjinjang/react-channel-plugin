import React from 'react';
import GitHubButton from 'react-github-btn';
import styled from '@emotion/styled';

//
//
//

const StyledHeader = styled.header`
  h1 {
    display: inline-block;
    margin: 0;
    margin-top: 1rem;
    font-size: 2rem;
    line-height: 1.65;
  }

  p {
    margin: 0;
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 1.65;
    color: #65676a;
  }

  hr {
    margin-bottom: 3rem;
    border: none;
    border-bottom: 1px solid #65676a;
  }
`;

const StyledHeaderTitle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;

  h1 {
    display: inline-block;
    margin: 0;
    margin-right: 0.5rem;
    font-size: 2rem;
    line-height: 1.65;
  }
`;

const StyledHeaderIcon = styled.img`
  display: block;
  width: 6rem;
  height: 6rem;
`;

//
//
//

/**
 *
 */
const Header: React.FC = () => {
  return (
    <StyledHeader>
      <StyledHeaderIcon src="/favicon.png" alt="favicon" />

      <StyledHeaderTitle>
        <h1>react-channel-plugin</h1>

        <GitHubButton
          href="https://github.com/ukjinjang/react-channel-plugin"
          data-size="large"
          data-show-count="true"
          aria-label="Star ukjinjang/react-channel-plugin on GitHub"
        >
          Star
        </GitHubButton>
      </StyledHeaderTitle>

      <p>Playground for react-channel-plugin.</p>

      <hr />
    </StyledHeader>
  );
};

export default Header;
