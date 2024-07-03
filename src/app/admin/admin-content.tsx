/* eslint-disable @next/next/no-img-element */
'use client';
import { checkReports } from "@/services/fetch-admin";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Report {
  reason: string;
  details: string;
}

export function AdminContent() {
  const user = useUserStore((state) => state.user);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await checkReports();
        console.log(response);
        if (response.response) {
          setReports(response.result);
        } else {
          setError(response.message || 'Failed to fetch reports');
        }
      } catch (error) {
        setError('Failed to fetch reports');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);
  // if (user?.role !== "ADMIN") {
  //   router.push('/');
  // }
  const temReports = [
    { "reason": '신고 이유1', "details": '신고 내용1' },
    { "reason": '신고 이유2', "details": '신고 내용2' }
  ];
  return (
    <section>
      <div className='flex flex-col justify-center items-center my-8 sm:my-14'>
        {user && user.userImgUrl ? (
          <img src={user.userImgUrl} alt={`${user.username}'s profile`} className="rounded-full w-24 h-24" />
        ) : (
          <img src={'/assets/image/characters/anonymous.png'} alt='character image' width={128} height={128} className='rounded-full border' />
        )}        
        <div>{user && user.username}</div>
        <div>{user && user.email}</div>
        
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : reports.length > 0 ? (
          <ul>
            {reports.map((report, index) => (
              <li key={index} className="border p-4 mb-2">
                <h3 className="font-semibold">Reason: {report.reason}</h3>
                <p>Details: {report.details}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reports found</p>
        )}
        {/* {temReports.map((report, index) => (
          <li key={index} className="border p-4 mb-2 list-none">
            <h3 className="font-semibold">Reason: {report.reason}</h3>
            <p>Details: {report.details}</p>
          </li>
        ))} */}
      </div>
    </section>
  );
}
