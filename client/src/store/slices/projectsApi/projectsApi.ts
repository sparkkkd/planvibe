import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../../api/axiosBaseQuery'
import type {
	IProjectRequest,
	IProjectResponse,
	SortOrder,
} from '../../../types/project.types'

export const projectsApi = createApi({
	reducerPath: 'projectsApi',
	baseQuery: axiosBaseQuery(),
	endpoints: (builder) => ({
		fetchUserProjects: builder.query<
			IProjectResponse[],
			{
				search?: string
				sortBy?: SortOrder
			}
		>({
			query: ({ search, sortBy }) => ({
				url: '/projects',
				method: 'GET',
				params: { search, sortBy },
			}),
		}),

		createProject: builder.mutation<IProjectRequest, IProjectResponse>({
			query: (project) => ({
				url: '/projects',
				method: 'POST',
				data: project,
			}),
		}),
	}),
})

export const { useFetchUserProjectsQuery, useCreateProjectMutation } =
	projectsApi
