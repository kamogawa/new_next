import Link from "next/link";
import fetch from "isomorphic-unfetch";

const name = ({ coin, time }) => {
  const coinName = coin && coin.id;
  const coinDesc = coin && coin.description;

  return (
    <div>
      <h2>Link pages {coinName}</h2>
      <div>{coinDesc}</div>
      <div>{time}</div>
      <Link href="/">Move to index</Link>
    </div>
  );
};

//서버사이드 랜더링 초기 데이터 설정 : getServerSideProps
export const getServerSideProps = async ({ query }) => {
  const { name } = query;
  try {
    const res = await fetch(`https://api.coinpaprika.com/v1/coins/${name}`);
    if (res.status === 200) {
      const coin = await res.json();

      return { props: { coin } };
    }
    return { props: {} };
  } catch (e) {
    console.log(e);
    return { props: {} };
  }
};



export default name;
