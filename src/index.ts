import {
    mountClientResponseErrorTokenHook,
    APIClient as AuthupAPIClient,
    ClientResponseErrorTokenHookOptions
} from '@authup/core';

import {
    APIClient as CentralAPIClient,
} from '@personalhealthtrain/core';

// ----------------------------------

const CENTRAL_API_URL = 'https://dev.personalhealthtrain.de/api/';
const AUTHUP_API_URL = 'https://dev.personalhealthtrain.de/auth/';


const hookOptions : ClientResponseErrorTokenHookOptions = {
    baseURL: AUTHUP_API_URL,
    tokenCreator: {
        type: 'user',
        name: 'admin',
        password: 'start123',
    },
}
// ----------------------------------

const authupClient = new AuthupAPIClient({
    baseURL: AUTHUP_API_URL
});
mountClientResponseErrorTokenHook(authupClient, hookOptions);

// ----------------------------------

const centralClient = new CentralAPIClient({
    baseURL: CENTRAL_API_URL,
});
mountClientResponseErrorTokenHook(centralClient, hookOptions);

// ----------------------------------

(async () => {
    const response = await centralClient.proposal.getMany();
    console.log(response);

    const tokenGrantResponse = await authupClient.token.createWithPasswordGrant({
        username: 'admin',
        password: 'start123'
    });

    console.log(tokenGrantResponse);

    /*
    const tokenInfo = await authupClient.token.introspect({token: tokenGrantResponse.access_token});
    console.log(tokenInfo);

    const { data: proposals } = await centralClient.proposalStation.getMany({
    });
    console.log(proposals);

     */
})();
