import { useSnackbar } from '@/context/SnackbarContext';

const WikiList = () => {
  const { showSnackbar } = useSnackbar();

  return (
    <button
      onClick={() =>
        showSnackbar('다른 친구가 편집하고 있어요. 나중에 다시 시도해 주세요', {
          type: 'red',
          duration: 3000,
          position: 'top',
          size: 'large',
        })
      }
      className="bg-green-200 text-white px-4 py-2 rounded"
    ></button>
  );
};

export default WikiList;
