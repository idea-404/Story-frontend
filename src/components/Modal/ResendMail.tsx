export default function ResendMail() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[280px] rounded-xl bg-white px-6 py-5 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-main1 text-white">
          ↻
        </div>

        <p className="mb-5 text-sm font-medium leading-relaxed text-gray-800">
          인증 메일을 <br />
          재전송하시겠습니까?
        </p>

        <div className="flex gap-2">
          <button className="flex-1 rounded-lg bg-gray-100 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
            아니요
          </button>
          <button className="flex-1 rounded-lg bg-primary-main1 py-2 text-sm font-medium text-white hover:bg-purple-400">
            예
          </button>
        </div>
      </div>
    </div>
  );
}
