import { describe, it, vi, expect, afterEach, assert } from "vitest";
import { createAccount, getAccounts, deleteAccount } from './account.service';
import { createAccountInRepository, getAccountsFromRepository, deleteAccountFromRepository } from "./account.repository";

let fakeDatabase = [];

vi.mock("./account.repository", async (importOriginal) => ({
    ...(await importOriginal()),
    createAccountInRepository: vi.fn((data) => {
        const newAccount = {
            id: fakeDatabase.length + 1,
            userId: data.userId,
            amount: data.amount,
        };
        fakeDatabase.push(newAccount);
        console.log(`After createAccountInRepository, fakeDatabase is now: ${JSON.stringify(fakeDatabase)}`);
        return newAccount;
    }),
    getAccountsFromRepository: vi.fn((userId) => {
        const accounts = fakeDatabase.filter(account => account.userId === userId);
        console.log(`After getAccountsFromRepository, fakeDatabase is: ${JSON.stringify(fakeDatabase)}`);
        return accounts;
    }),
    deleteAccountFromRepository: vi.fn((userId, accountId) => {
        const index = fakeDatabase.findIndex(account => account.userId === userId && account.id === accountId);
        if (index === -1) {
            console.log(`After deleteAccountFromRepository, fakeDatabase is: ${JSON.stringify(fakeDatabase)}`);
            return null;
        } else {
            const [deletedAccount] = fakeDatabase.splice(index, 1);
            console.log(`After deleteAccountFromRepository, fakeDatabase is now: ${JSON.stringify(fakeDatabase)}`);
            return deletedAccount;
        }
    }),
}));

describe("Account Service", () => {
    afterEach(() => {
        vi.clearAllMocks();
        fakeDatabase = []; 
    });

    it("should create an account successfully", async () => {
        const account = await createAccount({ userId: 1, amount: 1000 });

        expect(account).toBeDefined();
        expect(account.id).toBeDefined();
        expect(account.id).toBeTypeOf("number");
        expect(account).toHaveProperty("userId", 1);
        expect(account.amount).toBeDefined();
        expect(account.amount).toBe(1000);
        expect(createAccountInRepository).toBeCalledTimes(1);
        expect(createAccountInRepository).toBeCalledWith({ userId: 1, amount: 1000 });
    });

    it("should fail to create an account with bad parameters", async () => {
        try {
            await createAccount({ userId: null, amount: 1000 });
            assert.fail("createAccount should trigger an error.");
        } catch (e) {
            expect(e.name).toBe('HttpBadRequest');
            expect(e.statusCode).toBe(400);
        }
    });

    it("should retrieve accounts for a user successfully and verify each account", async () => {
        // Create accounts for the user
        await createAccountInRepository({ userId: 1, amount: 1000 });
        await createAccountInRepository({ userId: 1, amount: 2000 });
    
        const accounts = await getAccounts(1);
    
        expect(accounts).toBeDefined();
        expect(accounts.length).toBe(2);
        accounts.forEach(account => {
            expect(account.id).toBeDefined();
            expect(account.id).toBeTypeOf("number");
            expect(account).toHaveProperty("userId", 1);
            expect(account.amount).toBeDefined();
            expect(account.amount).toBeGreaterThanOrEqual(1000);
        });
        expect(getAccountsFromRepository).toBeCalledTimes(1);
        expect(getAccountsFromRepository).toBeCalledWith(1);
    });
    
    it("should delete an account successfully", async () => {
        // Create an account for the user
        const createdAccount = await createAccountInRepository({ userId: 1, amount: 1000 });
    
        const account = await deleteAccount(1, createdAccount.id);
    
        expect(account).toBeDefined();
        expect(account.id).toBeDefined();
        expect(account.id).toBe(createdAccount.id);
        expect(deleteAccountFromRepository).toBeCalledTimes(1);
        expect(deleteAccountFromRepository).toBeCalledWith(1, createdAccount.id);
    });

    it('should fail to delete an account with a bad account id', async () => {
        try {
            await deleteAccount(1, 2000);
            assert.fail("deleteAccount should trigger an error.");
        } catch (e) {
            expect(e.name).toBe('HttpBadRequest');
            expect(e.message).toBe('Invalid account id');
        }
    });
});