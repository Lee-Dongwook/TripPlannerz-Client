import { renderProfilePage } from "@/ui/my/render/profile/renderProfile.tsx";
import { renderBeforeAccountPage } from "@/ui/my/render/account/renderBeforeAccount";
import { renderAfterAccountPage } from '@/ui/my/render/account/renderAfterAccount';
import { renderSchedulePage } from "@/ui/my/render/schedule/renderSchedule";
import { renderWithdrawPage } from "@/ui/my/render/withdraw/renderWithdraw";
import type { MyCurrentRenderProp } from "@/ui/my/myCurrentRenderProp.types";

export const myCurrentRender = (
  {
    currentPageState,
    modifyPasswordState, 
    renderProfile, 
    renderBeforeAccount, 
    renderAfterAccount, 
    renderSchedule, 
    renderWithdraw
  }: MyCurrentRenderProp) => {
  switch(currentPageState){
    case "profile":
      return renderProfilePage(renderProfile);
    case "account":
      return modifyPasswordState === true ? renderBeforeAccountPage(renderBeforeAccount) : renderAfterAccountPage(renderAfterAccount);
    case "schedule":
      return renderSchedulePage(renderSchedule);
    case "withdraw":
      return renderWithdrawPage(renderWithdraw);
    default:
      return null; 
  }
}
