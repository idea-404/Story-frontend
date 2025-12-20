import { Quote } from "@/assets";

type IntroduceProps = {
  introduce: string;
};

export default function Introduce({ introduce }: IntroduceProps) {
  return (
    <div className="mt-10 flex w-full justify-center p-8">
      <div className="w-full max-w-xl text-center">
        <div className="mb-8 flex justify-center">
          <Quote />
        </div>

        <p className="whitespace-pre-wrap break-words text-[1.25rem] leading-relaxed text-gray-800">
          {introduce}
        </p>
      </div>
    </div>
  );
}
