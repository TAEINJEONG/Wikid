module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        animation: {
          windEffect: "windEffect 5s ease-in-out infinite", // 애니메이션 이름과 시간을 설정
        },
        keyframes: {
          windEffect: {
            '0%': {
              transform: 'translateX(-50px)', // 애니메이션 시작 시
              opacity: 0.5,
            },
            '50%': {
              transform: 'translateX(50px)', // 애니메이션 중간 시
              opacity: 1,
            },
            '100%': {
              transform: 'translateX(-50px)', // 애니메이션 끝 시
              opacity: 0.5,
            },
          },
        },
      },
    },
    plugins: [],
};