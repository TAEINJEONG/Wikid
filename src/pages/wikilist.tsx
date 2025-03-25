import { useSnackbar } from '@/context/SnackbarContext';

const WikiList = () => {
  const { showSnackbar } = useSnackbar();

  return (
    <button
      onClick={() =>
        showSnackbar('이건 전역 스낵바야!', {
          type: 'gray',
          duration: 4000,
          position: 'bottom',
        })
      }
      className="bg-green-200 text-white px-4 py-2 rounded"
    >
      스낵바 띄우기
    </button>
  );
};

export default WikiList;
