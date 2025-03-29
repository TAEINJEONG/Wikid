import { SearchIcon } from "@/components/common/Icons";
import { Card } from "@/components/wikilistComponent";
import axiosInstance from "@/lib/api/axios";
import { useEffect, useRef, useState } from "react";

interface cardProps {
  id: number;
  name: string;
  code: string;
  city: string;
  nationality: string;
  job: string;
}

const WikiList = () => {
  
  const [cardList, setCardList] = useState<cardProps[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const currentSearchWord = useRef<string>("");

  let page: number = 0;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const mockdata = [
    {
      id: 1,             
      name: "김동욱",
      code: "donghuk",
      city: "서울",
      nationality: "대한민국",
      job: "경찰"
    },
    {
      id: 2,
      name: "이민준",
      code: "minjun",
      city: "부산",
      nationality: "대한민국",
      job: "의사"
    },
    {
      id: 3,
      name: "박서연",
      code: "seoyeon",
      city: "인천",
      nationality: "대한민국",
      job: "교사"
    },
    {
      id: 4,
      name: "최지훈",
      code: "jihoon",
      city: "대전",
      nationality: "대한민국",
      job: "개발자"
    },
    {
      id: 5,
      name: "한예린",
      code: "yerin",
      city: "광주",
      nationality: "대한민국",
      job: "디자이너"
    },
    {
      id: 6,
      name: "정우성",
      code: "woosung",
      city: "대구",
      nationality: "대한민국",
      job: "배우"
    },
    {
      id: 7,
      name: "김수현",
      code: "soohyun",
      city: "울산",
      nationality: "대한민국",
      job: "가수"
    },
    {
      id: 8,
      name: "오하늘",
      code: "haneul",
      city: "제주",
      nationality: "대한민국",
      job: "작가"
    },
    {
      id: 9,
      name: "백승민",
      code: "seungmin",
      city: "수원",
      nationality: "대한민국",
      job: "소방관"
    },
    {
      id: 10,
      name: "윤지아",
      code: "jia",
      city: "창원",
      nationality: "대한민국",
      job: "간호사"
    }
  ];
  

  async function fetchGetProfiles() {
    try{
      const { data } = await axiosInstance.get('/profiles');
      console.log(data);
      setCardList(mockdata);
      page = Math.ceil(cardList.length/3);
    } catch {
      console.log("데이터 불러오기 실패");
    }
  }

  function searchProfile() {
    currentSearchWord.current = searchWord;

    if(searchWord.length !== 0){
      const searchedProfiles = mockdata.filter(
        (profile) => profile.name.includes(searchWord)
      );

      setCardList(searchedProfiles);
    } else {
      setCardList(mockdata);
    }
  }

  function handlePageNation(e: React.MouseEvent<HTMLDivElement>) {
    setCurrentPage(Number(e.currentTarget.textContent));
  }

  function showPageNation() {
    const pageNumbers: number[] = [];
    for(let i=0; i<page; i++)
      pageNumbers.push(i+1);

    return(
      <>
        <div className="mr-[15px] w-[45px] h-[45px] flex items-center justify-center border border-black-500 text-center cursor-pointer">&lt;</div>
          <div className="flex gap-[10px]">
            {pageNumbers.map((index) => 
            <div key={index} 
            className="w-[45px] h-[45px] flex items-center justify-center border border-black-500 cursor-pointer"
            onClick={ handlePageNation }>
              { index }
            </div>)}
          </div>
        <div className="ml-[15px] w-[45px] h-[45px] flex items-center justify-center border border-black-500 text-center cursor-pointer">&gt;</div>
      </>
    );
  }

  function showCardList() {
    page = Math.ceil(cardList.length/3);

    const currentCardList = cardList.slice(currentPage*3 - 3, currentPage*3);

    if(cardList.length > 0)
      return (
        <>
          <div className="mt-[57px] flex flex-col gap-[24px]">
            {currentCardList.map((profile) => (
              <Card
                key={profile.id}
                name={profile.name}
                code={profile.code}
                city={profile.city}
                nationality={profile.nationality}
                job={profile.job}
              />
            ))}
          </div>
          <div className="mt-[121px] mb-[136px] flex">
            { showPageNation() }
          </div>
        </>
      );
    else
      return (
        <div className="flex flex-col items-center gap-[32px]">
          <div>
            <p className="mt-[204px] font-pre text-xl-m text-gray-400">"{currentSearchWord.current}"과 일치하는 검색 결과가 없어요.</p>
          </div>
          {SearchIcon({size:185})}
        </div>
      );
  }
  
  useEffect(() => {
    fetchGetProfiles();
  },[])

  useEffect(() => {
    showCardList();
  },[cardList, currentPage])

  return (
    <>
      <div>헤더</div>
      <div className="flex flex-col items-center">
        <div>검색창</div>
        <input className="border border-green-500" placeholder="검색어 입력" onChange={(e) => setSearchWord(e.target.value)}></input>
        <button className="border border-yellow-500 cursor-pointer" onClick={searchProfile}>검색</button>
        { showCardList() }
      </div>
    </>
  );
}

export default WikiList;