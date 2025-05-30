import { SearchIcon } from "@/components/common/Icons";
import Pagination from "@/components/common/Pagenation";
import SearchBar from "@/components/common/SearchBar";
import { Card } from "@/components/wikilistComponent";
import axiosInstance from "@/lib/api/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface cardProps {
    id: number;
    name: string;
    code: string;
    city: string;
    nationality: string;
    job: string;
  }

const SearchedWikiList = () => {
    const router = useRouter();
    const { keyword } = router.query;

    const [cardList, setCardList] = useState<cardProps[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function fetchSearchProfiles() {
        try{
            const { data } = await axiosInstance.get(`/profiles?name=${ keyword }&pageSize=20`);
            setIsLoading(false);
            setCardList(data.list);
            setTotalPage(Math.ceil(data.totalCount/3));
        } catch {
            console.log("데이터 불러오기 실패");
        }
    }

    function handleSearchBar(keyWord: string) {
        router.push(`/wikilist/search?keyword=${keyWord}`);
    }

    function handlePageChange(page: number) {
      setCurrentPage(page);
    }

    function showCardList() {
      if(isLoading)
        return <div>로딩중...</div>;

      if(cardList.length > 0) {
        const currentCardList = cardList.slice(currentPage*3 - 3, currentPage*3);

        return (
          <>
            <div className="mt-[57px] h-[474px] flex flex-col gap-[24px]">
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
            <div className="mt-[121px]">
              { <Pagination totalPages={totalPage} currentPage={currentPage} onPageChange={handlePageChange} /> }
            </div>
          </>
        );
      }
      else
        return (
          <div className="mt-[204px] flex flex-col items-center gap-[32px]">
            <div>
              <p className="font-pre text-xl-m text-gray-400">"{keyword}"과 일치하는 검색 결과가 없어요.</p>
            </div>
            { SearchIcon({ size:185 }) }
          </div>
        );
    }

    useEffect(() => {
      fetchSearchProfiles();
    },[keyword])

    return (
        <>
          <div>헤더</div>
          <div className="mt-[80px] mx-auto w-[859px] flex flex-col items-center border border-red-500">
            <div className="">
              <SearchBar placeholder="검색어를 입력해 주세요." onSearch={handleSearchBar} />
            </div>
            { showCardList() }
          </div>
        </>
      );
}

export default SearchedWikiList;