'use client';
import Title from '@/components/common/title';
import PageLayout from '@/components/layout/page-layout';
import React, { useState } from 'react';

export default function LlamaPage() {
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const info = '일산서구 한류월드 및 킨텍스 지원 부지 내에 위치한 원마운트는 지하 2층, 지상 9층 연면적 16만 1천602㎡ 규모의 3개 건물로 조성된 수도권 북서부 지역 최대 규모의 복합 문화 공간이다. 원마운트는 지상 최고의 놀이터를 모토로 쇼핑몰, 스노우파크, 워터파크, 멤버십 전용 럭셔리 스포츠 클럽 등의 문화 공간을 비롯, 각종 공연 및 이벤트, 파티 등 연중 끊이지 않는 즐길 거리를 제공하고 있다. * 스노우파크 원마운트 스노우파크는 국내 최초로 겨울을 주제로 한 실내형 테마파크로서 눈과 얼음 위에서 다양한 엔터테인먼트를 한 번에 즐길 수 있는 공간이다. 북유럽의 산타마을 콘셉트로 디자인된 부조물과 이색썰매, 동물썰매 등의 101가지의 펀(Fun) 아이템을 즐길 수 있는 아이스 레이크, 7개의 테마 동굴을 지나며 때로는 아찔하게 때로는 몽환적으로 이색적인 체험을 할 수 있는 아이스로드, 1년 내내 영하의 온도에서 하얗게 흩날리는 눈을 맞으며 눈썰매를 탈 수 있는 스노우힐 등으로 구성된다. 얼음으로 만든 동화마을에서 오로라쇼와 아이스쇼를 볼 수 있는 세계 최초의 테마 공간으로, 내국인뿐 아니라 외국인들에게도 매력적인 관광지가 될 것으로 보인다.';
  const fetchPoem = async () => {
    setLoading(true);
    const response = await fetch('/api/llama', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: `Based on the following information, please extract four relevant keywords in Korean without adding parentheses around English terms and present them in an array format only. ${info}` })
    });

    if (response.ok) {
      const data = await response.json();
      setOutput(data.poem);
    } else {
      setOutput('Failed to load API');
    }
    setLoading(false);
  };

  return (
    <div>
      <PageLayout>
        <Title>키워드 생성 테스트</Title>
        
        <button onClick={fetchPoem} disabled={loading} className='bg-red-50'>
          {loading ? 'Loading...' : '키워드 생성하기 버튼'}
        </button>
        <p className='pt-10 text-center '>{output}</p>
      </PageLayout>
    </div>
  );
}
