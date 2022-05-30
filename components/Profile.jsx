import styled from "styled-components";
import { GoMail, GoLocation } from "react-icons/go";

const ProfileBox = styled.div`
  width: 20%;
  max-width: 272px;
  margin-right: 26px;
`;

const ProfileImage = styled.img`
  display: block;
  width: 250px;
`;

const ProfileImageWrapper = styled.div`
  width: 155p;
  border: 1px solid #e1e4e8;
  ${ProfileImage}
`;

const ProfileUsername = styled.h2`
  margin: 0;
  padding-top: 15px;
  font-size: 25px;
`;

const ProfileUserLogin = styled.p`
  margin: 0;
  font-size: 20px;
`;

const ProfileUserBio = styled.p`
  margin: 0;
  padding-top: 15px;
  font-size: 14px;
`;

const ProfileUserInfo = styled.p`
  display: flex;
  align-items: center;
  margin: 4px 0 0;
`;

const ProfileUserInfoText = styled.span`
  margin-left: 6px;
`;

const Profile = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <ProfileBox>
      <ProfileImageWrapper>
        <ProfileImage src={user.avatar_url} alt={`${user.name} 프로필 이미지`} />
      </ProfileImageWrapper>
      <ProfileUsername>{user.name}</ProfileUsername>
      <ProfileUserLogin>{user.login}</ProfileUserLogin>
      <ProfileUserBio>{user.bio}</ProfileUserBio>
      <ProfileUserInfo>
        <GoMail size={12} color="#6a737d" />
        <ProfileUserInfoText>test@email.com</ProfileUserInfoText>
      </ProfileUserInfo>
      <ProfileUserInfo>
        <GoLocation size={12} color="#6a737d" />
        <ProfileUserInfoText>{user.location}</ProfileUserInfoText>
      </ProfileUserInfo>
    </ProfileBox>
  );
};

export default Profile;
