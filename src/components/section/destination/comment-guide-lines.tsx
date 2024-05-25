import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { CircleHelp } from "lucide-react";

export const CommentGuidelines = () => (
  <p className="hidden sm:flex items-center text-sm text-slate-600">댓글 작성 시 유의사항
    <HoverCard>
      <HoverCardTrigger><CircleHelp className='size-4 ml-2' /></HoverCardTrigger>
      <HoverCardContent>
        보다 건전한 인터넷 문화 정착과 커뮤니티 조성을 위해 이용정책에 어긋난 게시물은 삭제 및 작성 권한 제한 조치가 가해질 수 있습니다. 모두가 즐거운 문화 만들기에 동참해주세요!
      </HoverCardContent>
    </HoverCard>
  </p>
);

export const ImageUploadGuidelines = () => (
  <p className='hidden text-xs sm:flex items-center'>이미지 첨부 기준
    <HoverCard>
      <HoverCardTrigger><CircleHelp className='size-4 ml-2' /></HoverCardTrigger>
      <HoverCardContent>
        댓글에도 이미지를 첨부할 수 있습니다. 댓글을 작성하시고, ‘이미지 첨부’ Button을 클릭하여 내 컴퓨터에 저장되어 있는 10MB 이하의 이미지 파일(.jpg, .jpeg, .gif, .png)을 찾아 첨부 해 주세요.
      </HoverCardContent>
    </HoverCard>
  </p>
);