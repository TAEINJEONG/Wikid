 
import WikiPageModal from '@/components/WikipageModal';

export default function blankpage() {
  // onClose와 onSubmit 함수 구현
  const handleClose = () => { 
  };

  const handleSubmit = () => { 
  };

  return (
    <div>
      <WikiPageModal 
        initialAnswers={[]} 
        onClose={handleClose} 
        onSubmit={handleSubmit} 
      >
         </WikiPageModal> 
       
    </div>
  );
}
