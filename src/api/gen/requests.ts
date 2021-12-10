import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type AddTokenInfoInput = {
  address: Scalars['String'];
  chain: Scalars['String'];
  decimals: Scalars['Int'];
  enabled: Scalars['Boolean'];
  logoURI: Scalars['String'];
  minValue: Scalars['Float'];
  name: Scalars['String'];
  symbol: Scalars['String'];
};

export type CreateOrderInput = {
  addressReceiverSender: Scalars['String'];
  chain: Scalars['String'];
  decimals: Scalars['Int'];
  getTokenBuy: Scalars['String'];
  pid: Scalars['String'];
  priceUsd: Scalars['String'];
  sendTokensBuy: Scalars['String'];
  symbolPaymentToken: Scalars['String'];
};

export type LocaleItem = {
  __typename?: 'LocaleItem';
  lang: Scalars['String'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addToken: TokenInfo;
  createOrder: Order;
  createProject: Project;
};


export type MutationAddTokenArgs = {
  data: AddTokenInfoInput;
};


export type MutationCreateOrderArgs = {
  data: CreateOrderInput;
};


export type MutationCreateProjectArgs = {
  data: ProjectInput;
};

export type Order = {
  __typename?: 'Order';
  addressReceiverSender: Scalars['String'];
  addressSendTo: Scalars['String'];
  chain: Scalars['String'];
  decimals: Scalars['Int'];
  getTokenBuy: Scalars['String'];
  pid: Scalars['String'];
  priceGas: Scalars['String'];
  priceUsd: Scalars['String'];
  sendTokensBuy: Scalars['String'];
  symbolPaymentToken: Scalars['String'];
};

export type PaymentAddress = {
  __typename?: 'PaymentAddress';
  address: Scalars['String'];
  chain: Scalars['String'];
  name: Scalars['String'];
};

export type PriceHistory = {
  __typename?: 'PriceHistory';
  date: Scalars['DateTime'];
  price: Scalars['Float'];
};

export type Project = {
  __typename?: 'Project';
  address: Scalars['String'];
  chain: Scalars['String'];
  coinLogo: Scalars['String'];
  createdDate: Scalars['DateTime'];
  description: Scalars['String'];
  email: Scalars['String'];
  finishDate: Scalars['DateTime'];
  /** Project ID */
  pid: Scalars['String'];
  price: ProjectPrice;
  priceHistory: Array<PriceHistory>;
  profileImage?: Maybe<Scalars['String']>;
  projectApproved?: Maybe<Scalars['Boolean']>;
  refCode: Scalars['String'];
  social?: Maybe<Social>;
  status?: Maybe<ProjectStatus>;
  telegramHandle: Scalars['String'];
  telegramId: Scalars['String'];
  title: Scalars['String'];
  tokenSymbol: Scalars['String'];
  updatedDate?: Maybe<Scalars['DateTime']>;
  whitePaper: Scalars['String'];
};

export type ProjectInput = {
  address: Scalars['String'];
  chain: Scalars['String'];
  /** logo coin URL */
  coinLogo: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  finishDate: Scalars['DateTime'];
  price: ProjectPriceInput;
  profileImage?: InputMaybe<Scalars['String']>;
  refCode?: InputMaybe<Scalars['String']>;
  social?: InputMaybe<SocialInput>;
  telegramHandle?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  /** Maximal length is 4 characters */
  tokenSymbol: Scalars['String'];
  whitePaper?: InputMaybe<Scalars['String']>;
};

export type ProjectPrice = {
  __typename?: 'ProjectPrice';
  decimals: Scalars['Float'];
  goal: Scalars['Float'];
  raised: Scalars['Float'];
  token: Scalars['Float'];
};

export type ProjectPriceInput = {
  decimals: Scalars['Int'];
  goal: Scalars['Float'];
  /** Token price */
  token: Scalars['Float'];
};

export enum ProjectStatus {
  Done = 'done',
  Presale = 'presale',
  Sale = 'sale',
  Scam = 'scam',
  Seed = 'seed'
}

export type ProjectsResult = {
  __typename?: 'ProjectsResult';
  data: Array<Project>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  totalSize?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  auth: Scalars['JSONObject'];
  getLocale: Scalars['JSONObject'];
  getNewWallet: WalletUser;
  getProject?: Maybe<Project>;
  localesList: Array<LocaleItem>;
  paymentAddress: PaymentAddress;
  projects: ProjectsResult;
  test: Scalars['JSONObject'];
  tokenListPrices: Scalars['JSONObject'];
  tokenPrice: Scalars['JSONObject'];
  tokenTest: Scalars['JSONObject'];
  tokensList: TokenInfoResult;
};


export type QueryAuthArgs = {
  id: Scalars['String'];
};


export type QueryGetLocaleArgs = {
  lang?: InputMaybe<Scalars['String']>;
};


export type QueryGetNewWalletArgs = {
  chain: Scalars['String'];
  pid: Scalars['String'];
};


export type QueryGetProjectArgs = {
  pid?: InputMaybe<Scalars['String']>;
};


export type QueryPaymentAddressArgs = {
  chain: Scalars['String'];
};


export type QueryProjectsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


export type QueryTestArgs = {
  address: Scalars['String'];
  amount?: InputMaybe<Scalars['Float']>;
  chain: Scalars['String'];
  fromAddress?: InputMaybe<Scalars['String']>;
};


export type QueryTokenPriceArgs = {
  chain: Scalars['String'];
  symbol: Scalars['String'];
};


export type QueryTokenTestArgs = {
  chain: Scalars['String'];
  symbol: Scalars['String'];
};


export type QueryTokensListArgs = {
  chain?: InputMaybe<Scalars['String']>;
};

export type Social = {
  __typename?: 'Social';
  blog?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  linkedIn?: Maybe<Scalars['String']>;
  siteUrl?: Maybe<Scalars['String']>;
  telegramChat?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  youtube?: Maybe<Scalars['String']>;
};

export type SocialInput = {
  blog?: InputMaybe<Scalars['String']>;
  github?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  linkedIn?: InputMaybe<Scalars['String']>;
  siteUrl?: InputMaybe<Scalars['String']>;
  telegramChat?: InputMaybe<Scalars['String']>;
  twitter?: InputMaybe<Scalars['String']>;
  youtube?: InputMaybe<Scalars['String']>;
};

export type TokenInfo = {
  __typename?: 'TokenInfo';
  address: Scalars['String'];
  chain: Scalars['String'];
  decimals: Scalars['Int'];
  logoURI: Scalars['String'];
  minValue: Scalars['Float'];
  name: Scalars['String'];
  symbol: Scalars['String'];
};

export type TokenInfoResult = {
  __typename?: 'TokenInfoResult';
  data?: Maybe<Array<TokenInfo>>;
};

export type WalletUser = {
  __typename?: 'WalletUser';
  address: Scalars['String'];
  chain: Scalars['String'];
  mnemonic: Scalars['String'];
  name: Scalars['String'];
  /** Project ID */
  pid: Scalars['String'];
};

export type CreateOrderMutationVariables = Exact<{
  pid: Scalars['String'];
  chain: Scalars['String'];
  symbolPaymentToken: Scalars['String'];
  decimals: Scalars['Int'];
  addressReceiverSender: Scalars['String'];
  sendTokensBuy: Scalars['String'];
  getTokenBuy: Scalars['String'];
  priceUsd: Scalars['String'];
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'Order', pid: string, chain: string, symbolPaymentToken: string, decimals: number, addressReceiverSender: string, sendTokensBuy: string, getTokenBuy: string, addressSendTo: string, priceUsd: string } };

export type GetNewWalletQueryVariables = Exact<{
  chain: Scalars['String'];
  pid: Scalars['String'];
}>;


export type GetNewWalletQuery = { __typename?: 'Query', getNewWallet: { __typename?: 'WalletUser', mnemonic: string, address: string, chain: string, name: string } };

export type GetProjectQueryVariables = Exact<{
  pid?: InputMaybe<Scalars['String']>;
}>;


export type GetProjectQuery = { __typename?: 'Query', getProject?: { __typename?: 'Project', contractAddress: string, email: string, pid: string, title: string, address: string, chain: string, description: string, status?: ProjectStatus | null | undefined, coinLogo: string, profileImage?: string | null | undefined, telegramHandle: string, tokenSymbol: string, price: { __typename?: 'ProjectPrice', goal: number, token: number, raised: number, decimals: number }, priceHistory: Array<{ __typename?: 'PriceHistory', price: number, date: any }>, social?: { __typename?: 'Social', siteUrl?: string | null | undefined, linkedIn?: string | null | undefined, github?: string | null | undefined, telegramChat?: string | null | undefined, youtube?: string | null | undefined, instagram?: string | null | undefined, blog?: string | null | undefined, twitter?: string | null | undefined } | null | undefined } | null | undefined };

export type GetProjectsForListQueryVariables = Exact<{
  size?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}>;


export type GetProjectsForListQuery = { __typename?: 'Query', projects: { __typename?: 'ProjectsResult', page?: number | null | undefined, size?: number | null | undefined, totalSize?: number | null | undefined, data: Array<{ __typename?: 'Project', email: string, pid: string, title: string, address: string, chain: string, description: string, tokenSymbol: string, whitePaper: string, status?: ProjectStatus | null | undefined, coinLogo: string, telegramHandle: string, profileImage?: string | null | undefined, price: { __typename?: 'ProjectPrice', goal: number, token: number, raised: number }, priceHistory: Array<{ __typename?: 'PriceHistory', price: number, date: any }>, social?: { __typename?: 'Social', siteUrl?: string | null | undefined, linkedIn?: string | null | undefined, github?: string | null | undefined, telegramChat?: string | null | undefined, youtube?: string | null | undefined, instagram?: string | null | undefined, blog?: string | null | undefined, twitter?: string | null | undefined } | null | undefined }> } };

export type GetTokenListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTokenListQuery = { __typename?: 'Query', tokensList: { __typename?: 'TokenInfoResult', data?: Array<{ __typename?: 'TokenInfo', chain: string, symbol: string, name: string, address: string, decimals: number, logoURI: string, minValue: number }> | null | undefined } };

export type GetTokenListPricesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTokenListPricesQuery = { __typename?: 'Query', tokenListPrices: any };


export const CreateOrderDocument = gql`
    mutation CreateOrder($pid: String!, $chain: String!, $symbolPaymentToken: String!, $decimals: Int!, $addressReceiverSender: String!, $sendTokensBuy: String!, $getTokenBuy: String!, $priceUsd: String!) {
  createOrder(
    data: {pid: $pid, chain: $chain, symbolPaymentToken: $symbolPaymentToken, decimals: $decimals, addressReceiverSender: $addressReceiverSender, sendTokensBuy: $sendTokensBuy, getTokenBuy: $getTokenBuy, priceUsd: $priceUsd}
  ) {
    pid
    chain
    symbolPaymentToken
    decimals
    addressReceiverSender
    sendTokensBuy
    getTokenBuy
    addressSendTo
    priceUsd
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      pid: // value for 'pid'
 *      chain: // value for 'chain'
 *      symbolPaymentToken: // value for 'symbolPaymentToken'
 *      decimals: // value for 'decimals'
 *      addressReceiverSender: // value for 'addressReceiverSender'
 *      sendTokensBuy: // value for 'sendTokensBuy'
 *      getTokenBuy: // value for 'getTokenBuy'
 *      priceUsd: // value for 'priceUsd'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const GetNewWalletDocument = gql`
    query GetNewWallet($chain: String!, $pid: String!) {
  getNewWallet(chain: $chain, pid: $pid) {
    mnemonic
    address
    chain
    name
  }
}
    `;

/**
 * __useGetNewWalletQuery__
 *
 * To run a query within a React component, call `useGetNewWalletQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNewWalletQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNewWalletQuery({
 *   variables: {
 *      chain: // value for 'chain'
 *      pid: // value for 'pid'
 *   },
 * });
 */
export function useGetNewWalletQuery(baseOptions: Apollo.QueryHookOptions<GetNewWalletQuery, GetNewWalletQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNewWalletQuery, GetNewWalletQueryVariables>(GetNewWalletDocument, options);
      }
export function useGetNewWalletLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNewWalletQuery, GetNewWalletQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNewWalletQuery, GetNewWalletQueryVariables>(GetNewWalletDocument, options);
        }
export type GetNewWalletQueryHookResult = ReturnType<typeof useGetNewWalletQuery>;
export type GetNewWalletLazyQueryHookResult = ReturnType<typeof useGetNewWalletLazyQuery>;
export type GetNewWalletQueryResult = Apollo.QueryResult<GetNewWalletQuery, GetNewWalletQueryVariables>;
export const GetProjectDocument = gql`
    query GetProject($pid: String) {
  getProject(pid: $pid) {
    contractAddress
    email
    pid
    title
    email
    address
    chain
    description
    status
    coinLogo
    profileImage
    telegramHandle
    tokenSymbol
    price {
      goal
      token
      raised
      decimals
    }
    priceHistory {
      price
      date
    }
    social {
      siteUrl
      linkedIn
      github
      telegramChat
      youtube
      instagram
      blog
      twitter
    }
  }
}
    `;

/**
 * __useGetProjectQuery__
 *
 * To run a query within a React component, call `useGetProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectQuery({
 *   variables: {
 *      pid: // value for 'pid'
 *   },
 * });
 */
export function useGetProjectQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
      }
export function useGetProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
        }
export type GetProjectQueryHookResult = ReturnType<typeof useGetProjectQuery>;
export type GetProjectLazyQueryHookResult = ReturnType<typeof useGetProjectLazyQuery>;
export type GetProjectQueryResult = Apollo.QueryResult<GetProjectQuery, GetProjectQueryVariables>;
export const GetProjectsForListDocument = gql`
    query GetProjectsForList($size: Int = 3, $page: Int = 1) {
  projects(size: $size, page: $page) {
    data {
      email
      pid
      title
      email
      address
      chain
      description
      tokenSymbol
      whitePaper
      status
      coinLogo
      telegramHandle
      profileImage
      description
      price {
        goal
        token
        raised
      }
      priceHistory {
        price
        date
      }
      social {
        siteUrl
        linkedIn
        github
        telegramChat
        youtube
        instagram
        blog
        twitter
      }
    }
    page
    size
    totalSize
  }
}
    `;

/**
 * __useGetProjectsForListQuery__
 *
 * To run a query within a React component, call `useGetProjectsForListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsForListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsForListQuery({
 *   variables: {
 *      size: // value for 'size'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetProjectsForListQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsForListQuery, GetProjectsForListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsForListQuery, GetProjectsForListQueryVariables>(GetProjectsForListDocument, options);
      }
export function useGetProjectsForListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsForListQuery, GetProjectsForListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsForListQuery, GetProjectsForListQueryVariables>(GetProjectsForListDocument, options);
        }
export type GetProjectsForListQueryHookResult = ReturnType<typeof useGetProjectsForListQuery>;
export type GetProjectsForListLazyQueryHookResult = ReturnType<typeof useGetProjectsForListLazyQuery>;
export type GetProjectsForListQueryResult = Apollo.QueryResult<GetProjectsForListQuery, GetProjectsForListQueryVariables>;
export const GetTokenListDocument = gql`
    query getTokenList {
  tokensList(chain: "") {
    data {
      chain
      symbol
      name
      address
      decimals
      logoURI
      minValue
    }
  }
}
    `;

/**
 * __useGetTokenListQuery__
 *
 * To run a query within a React component, call `useGetTokenListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTokenListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTokenListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTokenListQuery(baseOptions?: Apollo.QueryHookOptions<GetTokenListQuery, GetTokenListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTokenListQuery, GetTokenListQueryVariables>(GetTokenListDocument, options);
      }
export function useGetTokenListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTokenListQuery, GetTokenListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTokenListQuery, GetTokenListQueryVariables>(GetTokenListDocument, options);
        }
export type GetTokenListQueryHookResult = ReturnType<typeof useGetTokenListQuery>;
export type GetTokenListLazyQueryHookResult = ReturnType<typeof useGetTokenListLazyQuery>;
export type GetTokenListQueryResult = Apollo.QueryResult<GetTokenListQuery, GetTokenListQueryVariables>;
export const GetTokenListPricesDocument = gql`
    query getTokenListPrices {
  tokenListPrices
}
    `;

/**
 * __useGetTokenListPricesQuery__
 *
 * To run a query within a React component, call `useGetTokenListPricesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTokenListPricesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTokenListPricesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTokenListPricesQuery(baseOptions?: Apollo.QueryHookOptions<GetTokenListPricesQuery, GetTokenListPricesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTokenListPricesQuery, GetTokenListPricesQueryVariables>(GetTokenListPricesDocument, options);
      }
export function useGetTokenListPricesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTokenListPricesQuery, GetTokenListPricesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTokenListPricesQuery, GetTokenListPricesQueryVariables>(GetTokenListPricesDocument, options);
        }
export type GetTokenListPricesQueryHookResult = ReturnType<typeof useGetTokenListPricesQuery>;
export type GetTokenListPricesLazyQueryHookResult = ReturnType<typeof useGetTokenListPricesLazyQuery>;
export type GetTokenListPricesQueryResult = Apollo.QueryResult<GetTokenListPricesQuery, GetTokenListPricesQueryVariables>;
