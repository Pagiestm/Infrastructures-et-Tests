import { sql } from "../../../infrastructure/db";

export async function createTransfer(transfer) {
    // Validate the transfer object
    if (!transfer || !transfer.fromAccountId || !transfer.toAccountId || !transfer.amount) {
        throw new Error('Invalid transfer object');
    }

    // Insert the transfer into the Transfers table
    const transferResult = await sql`
        INSERT INTO transfers (fromAccountId, toAccountId, amount)
        VALUES (${transfer.fromAccountId}, ${transfer.toAccountId}, ${transfer.amount})
        RETURNING *
        `;

    // Update the account balances
    await sql`
        UPDATE accounts SET amount = amount - ${transfer.amount} WHERE id = ${transfer.fromAccountId}
        `;
    await sql`
        UPDATE accounts SET amount = amount + ${transfer.amount} WHERE id = ${transfer.toAccountId}
        `;

    return transferResult[0];
}