import type { MyCurrentRenderProp } from "@/ui/my/myCurrentRenderProp.types";
import { renderProfilePage } from "@/ui/my/render/profile/renderProfile";
import { renderBeforeAccountPage } from "@/ui/my/render/account/renderBeforeAccount";
import { renderAfterAccountPage } from "@/ui/my/render/account/renderAfterAccount";
import { renderSchedulePage } from "@/ui/my/render/schedule/renderSchedule";
import { renderWithdrawPage } from "@/ui/my/render/withdraw/renderWithdraw";

export const myCurrentRender = ({ currentPageState, modifyPasswordState }: MyCurrentRenderProp) => {
  switch(currentPageState){
    case "profile":
      return renderProfilePage();
    case "account":
      return modifyPasswordState === true ? renderBeforeAccountPage() : renderAfterAccountPage();
    case "schedule":
      return renderSchedulePage();
    case "withdraw":
      return renderWithdrawPage();
    default:
      return null; 
  }
}
