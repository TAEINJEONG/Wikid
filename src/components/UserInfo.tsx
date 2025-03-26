export default function UserInfo({ name, mbti, profileImage }: {
    name: string
    mbti: string
    profileImage: string
  }) {
    return (
      <div className="flex items-center gap-4 mb-6">
        <img
          src={profileImage || '/default-profile.png'}
          alt="프로필"
          className="w-14 h-14 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
          <p className="text-sm text-gray-400">{mbti}</p>
        </div>
      </div>
    )
  }
  