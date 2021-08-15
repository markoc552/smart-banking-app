import {axiosClient as axios} from "./redux/axios"

export const createAccount = async (firstName, lastName, email, address) => {
    const response = await axios.post("/v1/factory/create-account", {firstName, lastName, email, address});

    return response.data;
}

export const sendMoney = async (to, value, mnemonic) => {
   await axios.post("/v1/transaction/send-money", {to, value, mnemonic});
}

export const getAccountStatus = async (address) => {
    const response = await axios.get(`/v1/account/status/${address}`);

    return response.data;
}

export const getTransactionDetails = async (address, index) => {
    const response = await axios.get(`/v1/account/status/${address}/transaction/${index}`);

    return response.data;
}

export const getWaults = async (address) => {
    const response = await axios.get(`/v1/account/status/${address}/waults`);

    return response.data;
}

export const getWaultDetails = async (address) => {
    const response = await axios.get(`/v1/waults/status/${address}`);

    return response.data;
}

export const createWault = async (reason, time, amount, address, mnemonic) => {
    const response = await axios.post(`/v1/waults/create/${address}/${mnemonic}`, {
        reason, time, amount
    });

    return response.data;
}

export const doTransaction = async (to, value, address, mnemonic, action) => {
    const response = await axios.post(`/v1/transaction/contract/${address}/${action}`, {
        to, value, mnemonic
    });

    return response.data;
}