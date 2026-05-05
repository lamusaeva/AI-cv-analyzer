import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import ScanCard from "../components/ui/ScanCard";
import UploadCard from "../components/ui/UploadCard";
import { useAuth } from "../hooks/useAuth";
import { getScans, type ScanData } from "../services/firestore";
import { useCVStore } from "../store/useCVStore";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const user = useCVStore((state) => state.user);

  const [scans, setScans] = useState<ScanData[]>([]);

  const scanCount = scans.length;
  const avgScore = scans.length
    ? Math.round(scans.reduce((sum, s) => sum + s.score, 0) / scans.length)
    : 0;

    useEffect(() => {
      const load = async () => {
        const data = await getScans(user!.uid);
        setScans(data);
      };
      load();
    }, [user]);

  return (
    <div className="min-h-screen bg-lavender px-4 pt-6 pb-8">
      <div className="flex justify-between mb-3 ">
        <h1 className="text-sm font-semibold text-purple-mid">Dashboard</h1>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="text-xs text-purple-mid"
        >
          Çıx
        </button>
      </div>
      <DashboardHeader
        stats={[
          { title: "Skan", value: scanCount },
          { title: "Orta bal", value: avgScore }
        ]}
      />
      <UploadCard />
      <div className="grid grid-cols-3 gap-3">
        {scans.map((s) => (
          <ScanCard
            key={s.id}
            fileName={s.fileName}
            date={s.date}
            score={s.score}
          />
        ))}
      </div>
    </div>
  );
}
