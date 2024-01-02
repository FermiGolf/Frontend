import { APIPath, baseURL } from "../api/const";
import {  mockDraftLeaderboardResponse } from "./endpoints/getDraftLeaderboard";
import {http,HttpResponse} from 'msw';
import { mockTeamInfoResponse } from "./endpoints/getTeamInfo";
import { mockGetListOfTornaments, mockGetTornamentDetails } from "./endpoints/getTornaments";
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
    http.get(`${baseURL}${APIPath.TORNAMENTS}/World%20Golf%20Championships-Dell%20Technologies%20Match%20Play`,
    async ({ params })=>{
        return HttpResponse.json(mockGetTornamentDetails, { status: 200 })
    }),
    http.get(`${baseURL}${APIPath.TORNAMENTS}`,
    async ({ params })=>{
        return HttpResponse.json(mockGetListOfTornaments, { status: 200 })
    }),

    // http.get(`${baseURL}${APIPath.TORNAMENTS}`,
    // async ({ params })=>{
    //     return HttpResponse.json('error', { status: 404 ,statusText:'not found'})
    // }),
    

    http.get(`${baseURL}${APIPath.TORNAMENTS}/notFound`,
    async ({ params })=>{
        return HttpResponse.json('error', { status: 404 ,statusText:'not found'})
    }),
];