import { describe, it, vi, expect, afterEach } from "vitest";
import { createTransfer } from './transfer.service';
import { createTransferInRepository } from "./transfer.repository";

let fakeDatabase = [];

vi.mock("./transfer.repository", async (importOriginal) => ({
    ...(await importOriginal()),
    createTransferInRepository: vi.fn((data) => {
        const newTransfer = {
            id: fakeDatabase.length + 1,
            fromAccountId: data.fromAccountId,
            toAccountId: data.toAccountId,
            amount: data.amount,
        };
        fakeDatabase.push(newTransfer);
        console.log(`After createTransferInRepository, fakeDatabase is now: ${JSON.stringify(fakeDatabase)}`);
        return newTransfer;
    }),
}));

describe("Transfer Service", () => {
    afterEach(() => {
        vi.clearAllMocks();
        fakeDatabase = []; 
    });

    it("should create a transfer successfully", async () => {
        const transfer = await createTransfer({ fromAccountId: 1, toAccountId: 2, amount: 100 });

        expect(transfer).toBeDefined();
        expect(transfer.id).toBeDefined();
        expect(transfer.id).toBeTypeOf("number");
        expect(transfer).toHaveProperty("fromAccountId", 1);
        expect(transfer).toHaveProperty("toAccountId", 2);
        expect(transfer.amount).toBeDefined();
        expect(transfer.amount).toBe(100);
        expect(createTransferInRepository).toBeCalledTimes(1);
        expect(createTransferInRepository).toBeCalledWith({ fromAccountId: 1, toAccountId: 2, amount: 100 });
    });

    it("should fail to create a transfer with bad parameters", async () => {
        try {
            await createTransfer({ fromAccountId: null, toAccountId: 2, amount: 100 });
            assert.fail("createTransfer should trigger an error.");
        } catch (e) {
            expect(e.name).toBe('HttpBadRequest');
            expect(e.statusCode).toBe(400);
        }
    });
});