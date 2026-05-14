import Image from "next/image"

export const InboxView = () => {
  return (
    <div className="w-full h-full flex justify-center items-center gap-2">
      <Image src="/velora-logo.svg?v=20260514" alt="velora" className="border border-neutral-300 rounded-full p-1" width={50} height={50} />
      <span className="text-[#406AAF] font-semibold text-3xl tracking-tighter">Velora</span>
    </div>
  )
}
