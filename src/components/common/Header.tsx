import Link from 'next/link';
import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/api/axios';
import { useAuthService } from '@/lib/hook/useAuthService';
import { useAuth } from '@/lib/context/authProvider';
import { WikidmarkImage } from '@/components/common/Images';
import Image from 'next/image';
import {
  AlarmIcon,
  ProfileIcon,
  MenuIcon,
  WikiedIcon,
} from '@/components/common/Icons';

const Header = () => {
  const { logout } = useAuthService();
  const { isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleProfileMenu = () => setProfileMenuOpen((prev) => !prev);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const { data: userData } = await axiosInstance.get('/users/me');
        const code = userData?.profile?.code;
        if (code) {
          const res = await axiosInstance.get(`/profiles/${code}`);
          const img = res?.data?.image;
          if (img) setProfileImage(img);
        }
      } catch {
        setProfileImage(null);
        setIsLoading(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn) fetchProfileImage();
  });

  if (isLoading)
    return (
      <div className="w-full h-[79px] bg-white shadow-sm border-b border-gray-100"></div>
    );

  return (
    <header className="w-full h-[79px] bg-white shadow-sm border-b-[1px] border-gray-100">
      <div className="max-w-[1920px] mx-auto w-full h-full flex items-center justify-between px-5 py-2.5 lg:px-[80px] lg:py-[20px] text-sm leading-6">
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
              className="text-md font-medium hover:text-gray-400"
            >
              위키목록
            </Link>
            <Link
              href="/boards"
              className="text-md font-medium hover:text-gray-400"
            >
              자유게시판
            </Link>
          </nav>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <AlarmIcon size={24} className="cursor-pointer" />
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="프로필"
                  className="w-6 h-6 rounded-full cursor-pointer object-cover"
                  onClick={toggleProfileMenu}
                />
              ) : (
                <ProfileIcon
                  size={24}
                  className="cursor-pointer"
                  onClick={toggleProfileMenu}
                />
              )}
              {isProfileMenuOpen && (
                <div className="absolute top-20 right-0 w-[110px] h-[131] rounded-md shadow-md lg:right-[60px] bg-gray-50 py-4 flex flex-col items-center gap-4  z-20">
                  <Link
                    href="/myPage"
                    onClick={() => setProfileMenuOpen(false)}
                    className="hover:text-gray-400"
                  >
                    계정 설정
                  </Link>
                  <Link
                    href="/wiki[id]"
                    onClick={() => setProfileMenuOpen(false)}
                    className="hover:text-gray-400"
                  >
                    내 위키
                  </Link>

                  <button
                    onClick={() => {
                      logout();

                      setProfileMenuOpen(false);
                    }}
                    className="text-gray-400 hover:text-gray-300 bg-gray-50"
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link href="/login" className="hover:text-gray-300 ">
              로그인
            </Link>
          )}
        </div>

        <button className="md:hidden" onClick={toggleMenu}>
          <MenuIcon size={28} className="cursor-pointer hover:text-green-300" />
        </button>

        {isMenuOpen && (
          <div className="absolute top-20 right-0 w-[120px] h-[176] rounded-md shadow-md bg-white py-4 flex flex-col items-center gap-4 md:hidden z-20">
            <Link href="/wikilist" onClick={() => setMenuOpen(false)}>
              위키목록
            </Link>
            <Link href="/boards" onClick={() => setMenuOpen(false)}>
              자유게시판
            </Link>

            <Link href="/boards" onClick={() => setMenuOpen(false)}>
              알림
            </Link>
            <Link href="/myPage" onClick={() => setMenuOpen(false)}>
              마이페이지
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
