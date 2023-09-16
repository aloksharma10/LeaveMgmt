import Image from "next/image";
import LoadingGif from '@/public/assets/loading_layout.gif'
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <Image height={500} width={500} alt="loading..." src={LoadingGif} className="text-6xl"/>
    </div>
  );
}
