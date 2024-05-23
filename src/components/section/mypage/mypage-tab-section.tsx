import DestinationCard from "@/components/common/destination-card";
import DestinationPagination from "@/components/common/destination-pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 탭 섹션을 렌더링하는 함수 
export function MypageTabSection({ data, paginatedData, currentPage, totalPages, onPageChange }: any) {
  return (
    <Tabs defaultValue="myFavs" className="w-full" id='mainSection'>
      <TabsList className='w-full py-6 flex space-x-8'>
        <TabsTrigger value="myFavs" className='underline-link'>내가 찜한 여행지</TabsTrigger>
        <TabsTrigger value="myComments" className='underline-link'>내가 쓴 리뷰</TabsTrigger>
        <TabsTrigger value="recentDestionation" className='underline-link'>최근 본 여행지</TabsTrigger>
      </TabsList>
      <TabsContent value="myFavs">
        <div className="min-h-dvh p-4">
          {data ? paginatedData.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 md:px-12 py-2">
              {paginatedData.map((item: any, index: number) => (
                <div key={index} className="p-4 relative">
                  <button className="absolute top-0 -right-1 text-xl text-gray-500 hover:text-gray-700">×</button>
                  <DestinationCard
                    location={item.location}
                    title={item.title}
                    description={item.description}
                  />
                </div>
              ))}
              <div className='flex justify-center pb-8 mt-5 col-span-2 md:col-span-3'>
                <DestinationPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page: number) => onPageChange(page)}
                />
              </div>
            </div>
          ) : (
            <div>데이터가 없습니다.</div>
          ) : <div>데이터가 없습니다.</div>}
        </div>
      </TabsContent>
    </Tabs>
  );
}
