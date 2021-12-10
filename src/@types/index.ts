import { GetProjectQuery, GetTokenListQuery } from 'api/gen/requests';

export type Token = GetTokenListQuery['tokensList']['data'][number];
export type Project = GetProjectQuery['getProject'];
