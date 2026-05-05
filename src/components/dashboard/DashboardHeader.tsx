import { useCVStore } from "../../store/useCVStore"

type Stat = {
  title: string
  value: number
}

type Props = {
  stats: Stat[]
}

export default function DashboardHeader({ stats }: Props) {
  const user = useCVStore((state) => state.user);

  return (
    <div className="bg-gradient-to-b from-purple-soft to-purple-deep rounded-2xl p-4 mb-4">
      <p className="text-purple-light text-xs">Xoş gəldin</p>
      <h2 className="text-white text-lg font-semibold">{user?.email}</h2>
      <div className="flex gap-2 mt-3">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white/15 rounded-xl px-3 py-2 flex-1">
            <p className="text-white text-base font-bold">{stat.value}</p>
            <p className="text-purple-light text-xs">{stat.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}