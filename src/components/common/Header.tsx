import Link from 'next/link';
// import { useAuth } from '@/lib/context/authProvider';
import { WikidmarkImage } from '@/components/common/Images';
import {
  AlarmIcon,
  ProfileIcon,
  MenuIcon,
  WikiedIcon,
} from '@/components/common/Icons';
import { useState } from 'react';
import { useAuth } from '@/lib/context/authProvider';

const Header = () => {
  const { isLoggedIn } = useAuth();
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full h-[80px] bg-white shadow-md">
      <div className="max-w-[1920px] mx-auto w-full h-full flex items-center justify-between px-5 py-2.5 lg:px-[80px] lg:py-[20px]">
        <nav className="flex items-center justify-between gap-[40px] mr-[165px]">
          <Link
            href="/"
            className="flex items-center justify-between w-[107px]"
          >
            <WikidmarkImage className="h-8 cursor-pointer" alt="로고" />
            <WikiedIcon />
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
        </nav>

        <div className="hidden md:flex items-center gap-6">
          {!isLoggedIn ? (
            <>
              <AlarmIcon size={24} className="cursor-pointer" />
              <ProfileIcon size={24} className="cursor-pointer" />
            </>
          ) : (
            <Link href="/login">
              <Link href="/login" className=" hover:bg-gray-100">
                로그인
              </Link>
            </Link>
          )}
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!isMenuOpen)}>
          <MenuIcon size={28} className="cursor-pointer hover:text-green-300" />
        </button>

        {isMenuOpen && (
          <div className="absolute top-20 right-0 w-[120px] h-[176] rounded-md shadow-md bg-white py-4 flex flex-col items-center gap-4 md:hidden z-20">
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

            <Link
              href="/boards"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium"
            >
              알림
            </Link>
            <Link
              href="/myPage"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium"
            >
              마이페이지
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
