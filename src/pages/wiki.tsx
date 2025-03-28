import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import UserInfo from '@/components/UserInfo';
import WikiAnswerList from '@/components/WikiAnswerList';
import EditButton from '@/components/wikipageButton';
import EmptyState from '@/components/EmptyState';
import EditModal from '@/components/WikipageModal';

type ProfileData = {
  name: string;
  city: string;
  mbti: string;
  job: string;
};

type Answer = {
  question: string;
  answer: string;
};

const WikiPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [wikiData, setWikiData] = useState<Answer[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    if (id) {
      try {
        const res = await fetch(`/api/profiles/${id}`);
        const data = await res.json();
        setProfileData(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <div>불러오는 중...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <div
      className={
        "text-grayscale-grayscale-500 text-left font-pretendard-3xl-32px-semibold-font-family text-pretendard-3xl-32px-semibold-font-size leading-pretendard-3xl-32px-semibold-line-height font-pretendard-3xl-32px-semibold-font-weight relative " +
        className
      }
    >
      이지동{" "}
    </div>
  );
      {profileData ? (
        <UserInfo
          name={profileData.name}
          mbti={profileData.mbti}
          profileImage={profileData.profileImage}
        />
      ) : (
        <EmptyState />
      )}
      <WikiAnswerList answers={wikiData || []} />
      <EditButton onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <EditModal
          initialAnswers={wikiData || []}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(updatedAnswers) => setWikiData(updatedAnswers)}
        />
      )}
    </div>
  );
};

export default WikiPage;
