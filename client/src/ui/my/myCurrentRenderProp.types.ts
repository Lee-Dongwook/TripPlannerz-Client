import type { RenderProfileProp } from "@/ui/my/render/profile/renderProfileProp.types";
import type { RenderBeforeAccountProp } from "@/ui/my/render/account/renderBeforeAccountProp.types";
import type { RenderAfterAccountProp } from "@/ui/my/render/account/renderAfterAccountProp.types";
import type { RenderScheduleProp } from "@/ui/my/render/schedule/renderScheduleProp.types";
import type { RenderWithdrawProp } from "@/ui/my/render/withdraw/renderWithdrawProp.types";

export interface MyCurrentRenderProp {
    currentPageState: string,
    modifyPasswordState: boolean,
    renderProfile: RenderProfileProp,
    renderBeforeAccount: RenderBeforeAccountProp,
    renderAfterAccount: RenderAfterAccountProp,
    renderSchedule: RenderScheduleProp,
    renderWithdraw: RenderWithdrawProp
}