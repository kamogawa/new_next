const staticPage = ({ time }) => {
  return <div>{time}</div>;
};

//static 데이터를 생성
//revalidate 지정한 초 간격으로 갱신
export const getStaticProps = async () => {
  return { props: { time: new Date().toISOString() }, revalidate: 3 };
};

export default staticPage;
