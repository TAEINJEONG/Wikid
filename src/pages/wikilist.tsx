import axiosInstance from "@/lib/api/axios";
import { useEffect, useState } from "react";

const WikiList = () => {
  
  const [cardList, setCardList] = useState<any>();

  async function fetchGetProfiles() {
    try{
      const { data } = await axiosInstance.get('/profiles');
      setCardList(data);
      console.log(data);
      console.log(cardList);
    } catch {
      console.log("데이터 불러오기 실패");
    }
  }

  function showCardList() {
    console.log(cardList);
  }
  
  useEffect(() => {
    fetchGetProfiles();
  },[])

  return (
    <>
      <div>헤더</div>
      <div className="flex flex-col items-center">
        <div>검색창</div>
        <div>위키 카드 리스트</div>
      </div>
    </>
  );
}

export default WikiList;