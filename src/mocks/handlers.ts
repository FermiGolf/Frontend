import { APIPath } from "../api/const";
import {  mockDraftLeaderboardResponse } from "./endpoints/getDraftLeaderboard";
import {http,HttpResponse} from 'msw';
import { mockTeamInfoResponse } from "./endpoints/getTeamInfo";
export const handlers = [
    http.get(APIPath.DRAFTS,
    async ({ params })=>{
        return HttpResponse.json(mockDraftLeaderboardResponse, { status: 200 })
    }),
    http.get(`${APIPath.TEAMS}`, async ({ params })=>{
        return HttpResponse.json(mockTeamInfoResponse, { status: 200 })
    })
];