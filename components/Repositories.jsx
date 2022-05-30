import styled from "styled-components";
import formatDistance from "date-fns/formatDistance";
import Link from "next/link";
import { useRouter } from "next/router";

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

const RepositoryPagination = styled.div`
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 3px;
  width: fit-content;
  margin: auto;
  margin-top: 20px;
  button {
    padding: 6px 12px;
    font-size: 14px;
    border: 0;
    color: #0366d6;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    &:first-child {
      border-right: 1px solid rgba(27, 31, 35, 0.15);
    }
    &:hover:not([disabled]) {
      background-color: #0366d6;
      color: white;
    }
    &:disabled {
      color: rgba(27, 31, 35, 0.3);
    }
  }
`;

function Repositories({ user, repos }) {
  const router = useRouter();
  const { page = "1" } = router.query;

  if (!user || !repos) {
    return null;
  }

  return (
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
      <RepositoryPagination>
        <Link href={`/user/${user.login}?page=${Number(page) - 1}`}>
          <a>
            <button type="button" disabled={page && page === "1"}>
              Previous
            </button>
          </a>
        </Link>
        <Link href={`/user/${user.login}?page=${!page ? "2" : Number(page) + 1}`}>
          <a>
            <button type="button" disabled={repos.length < 10}>
              Next
            </button>
          </a>
        </Link>
      </RepositoryPagination>
    </ReposWrapper>
  );
}

export default Repositories;
