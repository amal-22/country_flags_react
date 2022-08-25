import { client } from '../interceptor/axiosInterceptor';

export const GetCountryDetails = () => {
    let URL = '/all?fields=name,region,flag ';
    return client({ url: URL, method: 'get' });
};