'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import UserInfo from '@/components/UserInfo'
import WikiAnswerList from '@/components/WikiAnswerList'
import EditButton from '@/components/EditButton'
import EmptyState from '@/components/EmptyState'
import EditModal from '@/components/EditModal'

type Answer = {
  question: string
  answer: string
}

type WikiData = {
  name: string
  mbti: string
  profileImage: string
  answers: Answer[]
}

export default function WikiPage() {
  const params = useParams()
  const code = params?.code as string  

  const [wikiData, setWikiData] = useState<WikiData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://wikied-api.vercel.app/13-3/wiki/${code}`)
        const data = await res.json()
        setWikiData(data)
      } catch (err) {
        console.error('데이터 불러오기 실패', err)
      } finally {
        setLoading(false)
      }
    }

    if (code) fetchData()
  }, [code])

  async function handleSubmit(updatedAnswers: Answer[]) {
    try {
      const res = await fetch(`https://wikied-api.vercel.app/13-3/wiki/${code}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: updatedAnswers }),
      })
      const updated = await res.json()

      setWikiData((prev) => ({
        ...prev!,
        answers: updated.answers,
      }))
      setIsModalOpen(false)
    } catch (err) {
      console.error('저장 실패', err)
    }
  }

  if (loading) return <div className="text-center mt-10">불러오는 중 </div>

  const isEmpty =
    !wikiData ||
    !wikiData.answers ||
    wikiData.answers.length === 0 ||
    wikiData.answers.every((a) => a.answer.trim() === '')

  if (isEmpty) return <EmptyState />

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <UserInfo
        name={wikiData.name}
        mbti={wikiData.mbti}
        profileImage={wikiData.profileImage}
      />
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
