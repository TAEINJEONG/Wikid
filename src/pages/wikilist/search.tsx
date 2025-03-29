import axiosInstance from "@/lib/api/axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SearchedWikiList = () => {
    const router = useRouter();
    const { keyword } = router.query;

    async function fetchSearchProfiles() {
        try{
            const { data } = await axiosInstance.get(`/profiles?name=${ keyword }`);
        //   setCardList(data.list);
        //   setInitialData(data.list);
        //   page = Math.ceil(cardList.length/3);
        console.log(data.list);
        } catch {
            console.log("데이터 불러오기 실패");
        }
    }

    useEffect(() => {
        fetchSearchProfiles();
    },[])

    return (
        <div>검색된 페이지</div>
    );
}

export default SearchedWikiList;