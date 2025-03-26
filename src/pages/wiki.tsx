import { useState } from 'react'
import { useRouter } from 'next/router'
import UserInfo from '@/components/UserInfo'
import WikiAnswerList from '@/components/WikiAnswerList'
import EditButton from '@/components/EditButton'
import EmptyState from '@/components/EmptyState'
import EditModal from '@/components/EditModal'
import profileData from '@/pages/wiki/[id].tsx/profileData';
 

type WikiData = {
  name: string
  mbti: string
  profileImage: string
  answers: Answer[]
}
type ProfileData = {
  name: string;
  city: string;
  mbti: string;
  job: string;
};
export default function WikiPage() {
  const router = useRouter()
  
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)


 
  if (loading) return <div className="text-center mt-10">불러오는 중...</div>

  const isEmpty =
    !wikiData ||
    !wikiData.answers ||
    wikiData.answers.length === 0 ||
    wikiData.answers.every((a) => a.answer.trim() === '')

  if (isEmpty) return <EmptyState />

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      {/* 프로필 데이터 표시 */}
      {profileData && (
        <UserInfo
          name={profileData.name}
          mbti={profileData.mbti}
          profileImage={profileData.profileImage}
        />
      )}

      <WikiAnswerList answers={wikiData.answers} />
      <EditButton onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <EditModal
          initialAnswers={wikiData.answers}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}
