import styled from "styled-components";

const ProfileBox = styled.div`
  width: 20%;
  max-width: 272px;
  margin-right: 26px;
`;

const ProfileImage = styled.img`
  display: block;
  width: 100%;
`;

const ProfileImageWrapper = styled.div`
  width: 100%;
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

const name = ({ user }) => {
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
    </ProfileBox>
  );
};

//서버사이드 랜더링 초기 데이터 설정 : getServerSideProps
// 9.3 이하의 버전에서는 getInitalProps를 사용
// export const getServerSideProps = async ({ query }) => {

//동적인 페이지에서 getStaticProps
//getStaticPaths로 값을 초기화 함
export const getServerSideProps = async ({ query }) => {
  const { name } = query;
  try {
    const res = await fetch(`https://api.github.com/users/${name}`);
    if (res.status === 200) {
      const user = await res.json();
      return { props: { user } };
    }
    return { props: {} };
  } catch (e) {
    console.log(e);
    return { props: {} };
  }
};

export default name;
