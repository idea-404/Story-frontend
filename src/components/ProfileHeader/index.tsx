import { Arrow, Person } from "@/assets";

export default function ProfileHeader() {
  return (
    <header className="mx-auto flex h-[4.5rem] w-[37.5rem] items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <button className="flex items-center justify-center">
          <Arrow />
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-300">
          <Person />
        </div>
        <span className="text-base font-semibold text-gray-900">
          1210 이남진
        </span>
      </div>
      <button className="rounded-full bg-gray-100 px-4 py-1 text-sm font-medium text-purple-500">
        프로필 설정
      </button>
    </header>
  );
}
