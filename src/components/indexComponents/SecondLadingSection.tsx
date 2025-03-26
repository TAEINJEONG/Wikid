import { useEffect, useRef } from 'react';
import Image from 'next/image';
import loudSpeaker from '@/assets/images/loudSpeaker.svg';
import WikidMark from '@/assets/images/WikidMark.svg';
import phone from '@/assets/images/phone.svg';
import speechBalloon from '@/assets/images/speechBalloon.svg';

const SecondLadingSection: React.FC = () => {
  const images = [loudSpeaker, WikidMark, phone, speechBalloon];
  const backgroundColors = ['#B2A5FD', '#ADEDDE', '#DEE5F5', '#DEE5F5'];
  const trackRef = useRef<HTMLDivElement | null>(null); // 애니메이션의 DOM을 참조할 ref의 데이터 타입

  /* 
    rAF가 useEffect 내부에서 사용된 이유는
    1. DOM 참조가 준비된 이후에 실행되어야 하기 때문에 (ref를 사용하고 있음)
    2. cancelAnimationFrame부분이 실행 되려면 컴포넌트가 언마운트 되어야 하는데 useEffect 내부에 넣어서 실행하면 컴포넌트가 사라질 때 자동으로 루프를 정리
    https://inpa.tistory.com/entry/%F0%9F%8C%90-requestAnimationFrame-%EA%B0%80%EC%9D%B4%EB%93%9C <- 참고
  */

  useEffect(() => {
    let position = 0;
    let animationFrameId: number;
    let lastTimestamp = 0; // 이전 프레임의 timestamp
    let verticalTime = 0; // 누적된 vertical 시간 (밀리초 단위로 변수에 담음)

    const delay = 0.5; // 0.5초 지연 (초 단위)
    const timeScale = 2; // sin 애니메이션의 속도를 조절하는 상수

    const animate = (timestamp: number) => {
      // lastTimestamp는 이전 프레임의 시간을 저장함
      if (lastTimestamp === 0) {
        lastTimestamp = timestamp; // lastTimestamp(이전 프레임)이 0이면 timestamp에도 0을 주어 초기화함
      }
      const delta = timestamp - lastTimestamp; // delta는 현재 프레임과 이전 프레임의 차이를 가지고 있음 (이를 통해 프레임간 시간이 얼마가 흘렀는지 알 수 있음)
      verticalTime += delta; // verticalTime에는 애니메이션에 사용될 누적 시간, 매 프레임마다 delta값을 더해서 전체 경과 시간을 변수에 담음 (이 값으로 sin함수 계산에 사용됨)
      lastTimestamp = timestamp; // 현재 프레임의 timestamp를 lastTimestamp에 저장해 다음 프레임에서 새로운 시간 차이를 계산 가능함

      if (trackRef.current) {
        position -= 2; // 속도 조절이 가능한 곳 (한 프레임당 -2px씩 이동함)
        if (Math.abs(position) >= trackRef.current.scrollWidth / 4) {
          position = 0; // position의 절댓값을 구해서 trackRef.scrollWidth를 4로 나눈 값보다 크거나 같으면 position을 0으로 변환 (이미지 배열을 4번 사용하고 있어서 4로 나눔)
        }
        trackRef.current.style.transform = `translateX(${position}px)`; // trackRef의 transform을 현재 position만큼 x축으로 이동

        // .float-box요소를 floatElements라는 이름으로 감쌈
        const floatElements: NodeListOf<HTMLElement> =
          trackRef.current.querySelectorAll('.float-box');

        floatElements.forEach((el, index) => {
          /*
            위의 x를 초기화하는 부분에서 y의 위치와는 상관 없이 초기화가 되어서 y값이 어색하게 초기화되는 문제가 있었음
            imageIndex라는 변수를 활용해 현재의 이미지의 인덱스를 담았음
            그냥 index값을 써도되지 않나 싶지만 실제로 아래 jsx부분에서 images를 4번 map으로 사용하니 index 2번 이미지(phone.svg)와 index 6번 이미지(phone.svg)
            가 같은 이미지 인데도 다른 인덱스를 갖게됨 그래서 같은 이미지를 같은 인덱스로 만들어 주는거임
          */
          const imageIndex = index % images.length;
          /*
            삼각함수를 사용하는 Math.sin을 활용함 
            https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/sin <- 참고
           1. (verticalTime(애니메이션에 사용될 시간) / 1초) - delay(0.5초)
           2. 위의 값을 * 3000밀리초 (애니메이션의 속도)
           3. 현재 이미지의 인덱스를 담은 imageIndex값을 더함
           4. 최종 나온 값을 10을 곱해 y값의 최대 높이를 정함
          */
          const y = Math.sin((verticalTime / 1000 - delay) * timeScale + imageIndex) * 10;

          // 나온 y값을 반영
          el.style.transform = `translateY(${y}px)`;
        });
      }
      animationFrameId = requestAnimationFrame(animate); // 함수 내부에 rAF를 호출하여 애니메이션을 animate함수를 반복함
    };

    animationFrameId = requestAnimationFrame(animate); // 최초 애니메이션 실행

    return () => cancelAnimationFrame(animationFrameId); // 컴포넌트가 언마운트 되면 예약된 애니메이션 루프를 중단하여 메모리 누수를 방지하여 최적화
  }, [images.length]);

  return (
    <div className="bg-white text-end py-25 md:py-40 xl:py-50">
      <div className="max-w-[335px] md:max-w-[648px] xl:max-w-[924px] w-full px-5 mx-auto mb-10 md:mb-20 mb-text-end">
        <p className="mb-[10px] md:mb-[32px] xl:mb-[20px] text-[10px] md:text-[20px] xl:text-[30px] font-[700] text-green-200">
          SHARE
        </p>
        <p className="text-gray-500 text-lg-r md:text-3xl-b md:font-[400] xl:text-[50px] xl:font-[400] xl:leading-[52px]">
          내 위키 만들고
          <br />
          친구에게 공유해요
        </p>
      </div>
      <div className="flex items-center overflow-hidden w-full h-[100px] md:h-[170px] xl:h-[380px] relative">
        <div ref={trackRef} className="flex w-max whitespace-nowrap will-change-transform">
          {[...images, ...images, ...images, ...images].map((img, i) => (
            <div
              key={i}
              className="w-[76px] h-[76px] md:w-[147px] md:h-[147px] xl:w-[360px] xl:h-[360px] mx-[10px] xl:mx-[35px] relative flex-shrink-0 float-box"
            >
              <Image
                src={img}
                alt={`이미지 ${i + 1}`}
                fill
                className="object-contain rounded-xl"
                style={{
                  backgroundColor: backgroundColors[i % images.length],
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecondLadingSection;
