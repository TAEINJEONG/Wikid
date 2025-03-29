import Link from 'next/link';
// import { useAuth } from '@/lib/context/authProvider';
import { WikidmarkImage } from '@/components/common/Images';
import { AlarmIcon, ProfileIcon, MenuIcon } from '@/components/common/Icons';
import { useState } from 'react';

const Header = () => {
  // const { isLoggedIn } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full flex items-center justify-between px-6 py-3 bg-white shadow-md">
      <Link href="/">
        <WikidmarkImage className="h-8 cursor-pointer" alt="로고" />
      </Link>

      <nav className="hidden md:flex items-center gap-6">
        <Link
          href="/wikilist"
          className="text-md font-medium hover:text-green-300"
        >
          위키목록
        </Link>
        <Link
          href="/boards"
          className="text-md font-medium hover:text-green-300"
        >
          자유게시판
        </Link>
      </nav>

      {/* 아이콘 */}
      <div className="hidden md:flex items-center gap-4">
        {/* {isLoggedIn ? ( */}
        <>
          <AlarmIcon size={24} className="cursor-pointer" />
          <ProfileIcon size={24} className="cursor-pointer" />
        </>
        {/* ) : ( */}
        <Link href="/login">
          <button className="px-4 py-2 bg-green-200 rounded-md text-white hover:bg-green-300">
            로그인
          </button>
        </Link>
        {/* )} */}
      </div>

      {/*메뉴*/}
      <button className="md:hidden" onClick={() => setMenuOpen(!isMenuOpen)}>
        <MenuIcon size={28} className="cursor-pointer hover:text-green-300" />
      </button>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md py-4 flex flex-col items-center gap-4 md:hidden z-20">
          <Link
            href="/wikilist"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium"
          >
            위키목록
          </Link>
          <Link
            href="/boards"
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium"
          >
            자유게시판
          </Link>
          {/* {isLoggedIn ? ( */}
          <>
            <AlarmIcon
              size={24}
              className="cursor-pointer hover:text-green-300"
            />
            <ProfileIcon
              size={24}
              className="cursor-pointer hover:text-green-300"
            />
          </>
          {/* ) : ( */}
          <Link href="/login">
            <button className="px-4 py-2 bg-green-200 rounded-md text-white hover:bg-green-300">
              로그인
            </button>
          </Link>
          {/* )} */}
        </div>
      )}
    </header>
  );
};

export default Header;
