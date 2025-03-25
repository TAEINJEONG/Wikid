type Answer = {
  question: string
  answer: string
}

export default function WikiAnswerList({
  answers,
}: {
  answers: Answer[]
}) {
  return (
    <div className="space-y-6">
      {answers.map((item, idx) => (
        <div key={idx}>
          <p className="text-gray-500 font-semibold mb-1">Q. {item.question}</p>
          <p className="text-gray-800">{item.answer}</p>
        </div>
      ))}
    </div>
  )
}
