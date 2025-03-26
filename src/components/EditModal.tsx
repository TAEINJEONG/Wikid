'use client'

import { useState } from 'react'
import EditButton from '@/components/EditButton'; 
type Answer = {
  question: string
  answer: string
}

type Props = {
  initialAnswers: Answer[]
  onClose: () => void
  onSubmit: (updatedAnswers: Answer[]) => void
}

export default function EditModal({ initialAnswers, onClose, onSubmit }: Props) {
  const [formAnswers, setFormAnswers] = useState<Answer[]>(initialAnswers)

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...formAnswers]
    newAnswers[index].answer = value
    setFormAnswers(newAnswers)
  }

  const handleSave = () => {
    onSubmit(formAnswers)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">위키 수정</h2>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {formAnswers.map((item, idx) => (
            <div key={idx}>
              <p className="font-medium text-gray-700 mb-1">Q. {item.question}</p>
              <textarea
                className="w-full border border-gray-300 rounded p-2"
                value={item.answer}
                onChange={(e) => handleChange(idx, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </div> 
       <div>
      <h1>위키 페이지</h1>
      <EditButton />
    </div>
    </div>
    
  )
}
