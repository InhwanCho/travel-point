
import React from 'react';
import { Camera, CircleHelp, Plus } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import CommentItem from '../common/comment-item';
import Title from '../common/title';


export default function DestinationComment() {

  return (
    <>
      <Title className='pt-8'>여행 톡</Title>
      <div className="bg-slate-100/90 relative rounded p-4 mt-8">
        <div className="flex justify-end items-center pb-2">
          <p className="flex items-center text-sm text-slate-600">댓글 작성 시 유의사항
            <HoverCard>
              <HoverCardTrigger><CircleHelp className='size-4 ml-2' /></HoverCardTrigger>
              <HoverCardContent>
                보다 건전한 인터넷 문화 정착과 커뮤니티 조성을 위해이용정책에 어긋난 게시물은 삭제 및 작성 권한 제한 조치가가해질 수 있습니다. 모두가 즐거운 문화 만들기에 동참해주세요!
              </HoverCardContent>
            </HoverCard>
          </p>
        </div>
        <form className='flex w-full'>
          <label className='size-20 float-left relative flex justify-center items-center flex-col border-y border-l bg-white' htmlFor='input-img'>
            <input id='input-img' type="file" className='hidden' />
            <Camera className='size-8' strokeWidth={1} />
            <p className='text-xs'>이미지 첨부</p>
          </label>
          <div className='flex-grow'>
            <textarea name="opinion" className='bg-white w-full h-full border p-2 placeholder:text-sm text-sm focus:outline-none caret-slate-500' placeholder='댓글 또는 의견을 작성해주세요.'></textarea>
          </div>
          <div className='size-20 float-right flex justify-center items-center border-r border-y bg-[#333333]/90'>
            <input type="submit" value='등록' className='text-slate-50' />
          </div>
        </form>
        <div className='flex justify-between text-sm text-slate-600 pt-3 px-1'>
          <p className='text-xs flex items-center'>이미지 첨부 기준
            <HoverCard>
              <HoverCardTrigger><CircleHelp className='size-4 ml-2' /></HoverCardTrigger>
              <HoverCardContent>
                댓글에도 이미지를 첨부할 수 있습니다.댓글을 작성하시고, ‘이미지 첨부’ Button을 클릭하여내 컴퓨터에 저장되어 있는 10MB 이하의 이미지 파일(.jpg, .jpeg, .gif, .png)을 찾아 첨부 해 주세요.
              </HoverCardContent>
            </HoverCard>
          </p>
          <p className='text-xs'>0 / 1,000자</p>
        </div>
      </div>
      <div className='py-4'>
        <p className='pl-3 font-medium pb-1'>댓글 2</p>
        <div className='border-t-2 flex flex-col'>
          {[...Array(2)].map((item, i) => (<CommentItem key={i} />))}
          <div>
            <p className='flex justify-center items-center py-2'>댓글 더보기
              <Plus className='size-4 ml-2' />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}