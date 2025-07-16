import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null); // 데이터 저장용 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // API 호출 함수
  const fetchData = async () => {
    try {
      // 기본 실행
      setLoading(true); // 시작할 때 로딩상태
      const response = await fetch(url); // API를 통해 데이터 호출
      const data = await response.json(); // 받아온 내용을 JSON 형태로 변경
      setData(data); // 데이터 상태 저장
    } catch (error) {
      // reject시 실행되는 내용
      setError(error); // 에러 발생 시, 에러 상태에 저장
    } finally {
      // reject, fulfill 상관 없이 실행되는 내용
      setLoading(false); // 마지막으로 로딩 상태 해제
    }
  };
  // useEffect로 페이지 시작시 호출, url이 변경할 때마다 재실행
  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, fetchData };
};
export default useFetch;
