export interface ILoginRequest {
	email: string
	password: string
}

export interface IAuthResponse {
	access_token: string
}

export interface IRegisterRequest extends ILoginRequest {
	name: string
}

export interface IUser {
	id: string
	email: string
	name: string
}
