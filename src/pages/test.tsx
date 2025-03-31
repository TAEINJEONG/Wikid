import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  const router = useRouter();
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const animateText = setInterval(() => {
      setRotate((prev) => (prev === 5 ? -5 : 5));
      setScale((prev) => (prev === 1 ? 1.3 : 1));
    }, 1500);
    return () => clearInterval(animateText);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-4 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-2/3 h-2/3 bg-green-200 rounded-full blur-3xl"></div>
      </div>
      
      <h1
        className="text-7xl font-extrabold mb-4 text-[#4CBFA4] drop-shadow-xl"
      >
        404
      </h1>
      <p className="text-xl mb-4 text-[#4CBFA4] font-semibold">죄송합니다. 페이지를 찾을 수 없습니다.</p>
      
      {/* 404 이미지 */}
      <div>
        <Image src="/404-astronaut.png" alt="404 Astronaut" width={350} height={350} className="drop-shadow-lg filter hue-rotate-90" />
      </div>
      
      {/* 버튼 */}
      <div className="mt-4 flex space-x-4">
        <Link href="/" className="px-4 py-2 bg-[#4CBFA4] text-white rounded-lg shadow-lg hover:bg-[#3AA98E] transition-colors duration-300">
          메인 페이지로 이동
        </Link>
        <Link href="/previous" className="px-4 py-2 border-2 border-[#4CBFA4] text-[#4CBFA4] rounded-lg shadow-lg hover:bg-[#4CBFA4] hover:text-white transition-colors duration-300">
          이전 페이지로 이동
        </Link>
      </div>
    </div>
  );
}
