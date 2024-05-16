import { HttpBadRequest } from "@httpx/exception";
import { createAccountInRepository, getAccountsFromRepository, deleteAccountFromRepository } from './account.repository';

export async function createAccount(params) {
    if (!params || !params.userId || typeof params.userId !== 'number' || !params.amount || typeof params.amount !== 'number') {
        throw new HttpBadRequest('Invalid parameters');
    }
    try {
        return await createAccountInRepository(params);
    } catch (error) {
        throw new HttpBadRequest('Invalid parameters');
    }
}

export async function getAccounts(userId) {
    try {
        return await getAccountsFromRepository(userId);
    } catch (error) {
        throw new HttpBadRequest('Invalid account id');
    }
}

export async function deleteAccount(userId, accountId) {
    if (!Number.isInteger(accountId)) {
        throw new HttpBadRequest('Invalid account id');
    }

    const result = await deleteAccountFromRepository(userId, accountId);

    if (!result) {
        throw new HttpBadRequest('Invalid account id');
    }

    return result;
}