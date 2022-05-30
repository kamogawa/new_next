import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { IoLogoGithub } from "react-icons/io";

const HeaderWrapper = styled.div`
  padding: 14px 14px;
  background-color: #24292e;
  line-height: 0;
  display: flex;
  align-items: center;
`;

const HeaderSearchForm = styled.form`
  input {
    margin: 0px 16px;
    background-color: hsla(0, 0%, 100%, 0.125);
    width: 300px;
    height: 28px;
    border: none;
    border-radius: 5px;
    outline: none;
    color: white;
    padding: 0px 12px;
    font-size: 14px;
    font-weight: bold;
  }
`;

const HeaderNavigations = styled.nav`
  a {
    color: white;
    margin-right: 16px;
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
  }
`;

function Header() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    router.push(`/user/${username}`);
    setUsername("");
  };

  return (
    <div>
      <HeaderWrapper>
        <IoLogoGithub color="white" size={36} />
        <HeaderSearchForm onSubmit={onSubmit}>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </HeaderSearchForm>
        <HeaderNavigations>
          <a href="https://github.com/pulls">Pull Requests</a>
          <a href="https://github.com/issyes">Issues</a>
          <a href="https://github.com/marketplace">Marketplace</a>
          <a href="https://github.com/explore">Explore</a>
        </HeaderNavigations>
      </HeaderWrapper>
    </div>
  );
}

export default Header;
