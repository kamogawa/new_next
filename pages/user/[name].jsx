import styled from "styled-components";
import formatDistance from "date-fns/formatDistance";
import Profile from "../../src/components/Profile";

const UserContentsWrapper = styled.div`
  display: flex;
  padding: 20px;
`;

const ReposWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: scroll;
  padding: 0px 16px;
`;

const ReposHeader = styled.div`
  padding: 16px 0;
  font-size: 14px;
  font-weight: 600;
  border-bottom: 1px solid #e1e4e8;
`;

const ReposCount = styled.span`
  display: inline-block;
  padding: 2px 5px;
  margin-left: 6px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  color: #586069;
  background-color: rgba(27, 31, 35, 0.08);
  border-radius: 20px;
`;

const RepositoryWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #e1e4e8;
  padding: 24px 0;
  a {
    text-decoration: none;
  }
  h2 { 
    text-decoration: underline;
  }
`;

const RepositoryDesc = styled.p`
  margin: 0;
  font-size: 14px;
  padding: 12px 0;
`;

const RepositoryLang = styled.p`
  margin: 0;
  font-size: 14px;
`;

const RepositoryUpdatedAt = styled.span`
  margin-left: 20px;
`;

const name = ({ user, repos }) => {
  if (!user) {
    return null;
  }

  return (
    <UserContentsWrapper>
      <Profile user={user} />
      <ReposWrapper>
        <ReposHeader>
          Repsitories
          <ReposCount>{user.public_repos}</ReposCount>
        </ReposHeader>
        {user && repos &&
          repos.map((repo, i) => (
            <RepositoryWrapper key={i}>
              <a target="_blank" rel="noreferrer" href={`https://github.com/${user.login}/${repo.name}`}>
                <h2>{repo.name}</h2>
              </a>
              <RepositoryDesc>
                {repo.description}
              </RepositoryDesc>
              <RepositoryLang>
                {repo.language}
                <RepositoryUpdatedAt>
                  {formatDistance(new Date(repo.updated_at), new Date(), {
                    addSuffix: true,
                  })}
                </RepositoryUpdatedAt>
              </RepositoryLang>
            </RepositoryWrapper>
          ))
        }
      </ReposWrapper>
    </UserContentsWrapper>
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
    let user;
    let repos;

    const userRes = await fetch(`https://api.github.com/users/${name}`);
    if (userRes.status === 200) {
      user = await userRes.json();
    }
    const repoRes = await fetch(`https://api.github.com/users/${name}/repos?sort=updated&page=1&per_page=10`);
    if (repoRes.status === 200) {
      repos = await repoRes.json();
    }
    return { props: { user, repos } };
  } catch (e) {
    console.log(e);
    return { props: {} };
  }
};

export default name;
