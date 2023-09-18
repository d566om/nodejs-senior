export interface RequestModel extends Request {
    user: RequestUserModel
}

export interface RequestUserModel {
    user: string;
    role: string;
}