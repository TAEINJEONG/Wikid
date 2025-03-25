type Props = {
  onClick: () => void
}

export default function EditButton({ onClick }: Props) {
  return (
    <div className="mt-8 text-right">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={onClick}
      >
        수정하기
      </button>
    </div>
  )
}
