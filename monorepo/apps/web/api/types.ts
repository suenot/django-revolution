// Proxy types for the API (KISS style)
import type { PublicTypes } from '@repo/api';

export type Post = PublicTypes.PostReadable;
export type PostCreate = PublicTypes.PostWritable;
export type PostUpdate = PublicTypes.PatchedPostWritable;
export type PaginatedPostList = PublicTypes.PaginatedPostListReadable;

// API request/response types
export type PostsListData = PublicTypes.ApiPublicApiPostsListData;
export type PostsCreateData = PublicTypes.ApiPublicApiPostsCreateData;
export type PostsRetrieveData = PublicTypes.ApiPublicApiPostsRetrieveData;
export type PostsUpdateData = PublicTypes.ApiPublicApiPostsUpdateData;
export type PostsDestroyData = PublicTypes.ApiPublicApiPostsDestroyData;
