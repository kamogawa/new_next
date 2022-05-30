import styled from "styled-components";
import Profile from "../../components/Profile";
import Repositories from "../../components/Repositories";

const UserContentsWrapper = styled.div`
  display: flex;
  padding: 20px;
`;

const name = ({ user, repos }) => {
  return (
    <UserContentsWrapper>
      <Profile user={user} />
      <Repositories user={user} repos={repos} />
    </UserContentsWrapper>
  );
};

//서버사이드 랜더링 초기 데이터 설정 : getServerSideProps
// 9.3 이하의 버전에서는 getInitalProps를 사용
// export const getServerSideProps = async ({ query }) => {

//동적인 페이지에서 getStaticProps
//getStaticPaths로 값을 초기화 함
export const getServerSideProps = async ({ query }) => {
  const { name, page } = query;
  try {
    let user;
    let repos;

    const userRes = await fetch(`https://api.github.com/users/${name}`);
    if (userRes.status === 200) {
      user = await userRes.json();
    }
    const repoRes = await fetch(`https://api.github.com/users/${name}/repos?sort=updated&page=${page}&per_page=10`);
    if (repoRes.status === 200) {
      repos = await repoRes.json();
    }
    return { props: { user, repos } };
  } catch (e) {
    return { props: {} };
  }
};

export default name;
