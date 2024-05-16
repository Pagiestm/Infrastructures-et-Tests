import { HttpBadRequest } from "@httpx/exception";
import { createTransfer as createTransferInRepository } from './transfer.repository';
import { updateAccount } from '../account/account.service';

export async function createTransfer(transfer) {
    if (!transfer || !transfer.fromAccountId || !transfer.toAccountId || !transfer.amount) {
        throw new HttpBadRequest('Invalid transfer object');
    }

    try {
        // Create the transfer in the repository
        const createdTransfer = await createTransferInRepository(transfer);

        // Update the account balances in the account service
        await updateAccount(transfer.fromAccountId, -transfer.amount);
        await updateAccount(transfer.toAccountId, transfer.amount);

        return createdTransfer;
    } catch (error) {
        throw new HttpBadRequest('Invalid parameters');
    }
}