interface Column {
    title: string
    dataIndex: string
    key: string
}

interface Data {
    key: string
    name: string
    gender: string
    email: string
    rankList: any
}

export interface RenderProfileProp {
    accompanyList: any[],
    columns: Column[],
    data: Data[]
    onClick: {
        responseAccompanyTrue: (e:any) => any
        responseAccompanyFalse: (e:any) => any
    }
}