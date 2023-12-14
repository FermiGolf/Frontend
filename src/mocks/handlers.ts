import { APIPath, baseURL } from "../api/const";
import {  mockDraftLeaderboardResponse } from "./endpoints/getDraftLeaderboard";
import {http,HttpResponse} from 'msw';
import { mockTeamInfoResponse } from "./endpoints/getTeamInfo";
export const handlers = [
    http.get(`${baseURL}${APIPath.DRAFTS}/any`,
    async ({ params })=>{
        return HttpResponse.json(mockDraftLeaderboardResponse, { status: 200 })
    }),
    http.get(`${baseURL}${APIPath.DRAFTS}/notFound`,
    async ({ params })=>{
        return HttpResponse.json(mockDraftLeaderboardResponse, { status: 404 ,statusText:'not found'})
    }),

    http.get(`${baseURL}${APIPath.DRAFTS}/any${APIPath.TEAMS}/any`, async ({ params })=>{
        return HttpResponse.json(mockTeamInfoResponse, { status: 200 })
    }),

    http.get(`${baseURL}${APIPath.DRAFTS}/notFound${APIPath.TEAMS}/notFound`,
    async ({ params })=>{
        return HttpResponse.json(mockDraftLeaderboardResponse, { status: 404 ,statusText:'not found'})
    }),

    http.get(`${baseURL}${APIPath.DRAFTS}/any${APIPath.TEAMS}/notFound`,
    async ({ params })=>{
        return HttpResponse.json(mockDraftLeaderboardResponse, { status: 404 ,statusText:'not found'})
    }),
];