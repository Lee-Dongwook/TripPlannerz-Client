import { Comment } from "@/domain/Comment"

export interface CommentProp {
    tripUUID: string
    commentList: Comment[]
}