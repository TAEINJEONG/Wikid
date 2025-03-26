import { useRef, useState } from 'react';
import SearchBar, { SearchBarRef } from '@/components/common/SearchBar';
import Button from '@/components/common/Button';

const mockWikiList = [
  { id: 1, title: '나만의 위키 만들기' },
  { id: 2, title: '위키 스타일 가이드' },
  { id: 3, title: '프론트엔드 위키' },
];

const WikiListPage = () => {
  const searchRef = useRef<SearchBarRef>(null);
  const [results, setResults] = useState(mockWikiList);

  const handleSearch = (term: string) => {
    const filtered = mockWikiList.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="p-6">
      <div className="flex gap-2 items-center">
        <SearchBar ref={searchRef} onSearch={handleSearch} />
        <Button
          buttonText="검색"
          width="80px"
          height="45px"
          onClick={() => searchRef.current?.search()}
        />
      </div>

      <div className="mt-6 space-y-2">
        {results.map((item) => (
          <div key={item.id} className="p-3 border rounded">
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WikiListPage;
