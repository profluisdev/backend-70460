import { accountDao } from "../persistence/dao/account.dao.js";
import { movementDao } from "../persistence/dao/movement.dao.js";
import { userDao } from "../persistence/dao/user.dao.js";

class AccountService {
  async createAccount(data) {
    const { userId, firstName, lastName } = data;
    console.log(data);
    const newAccount = {
      accountNumber: Math.floor(Math.random() * 1000000000),
      alias: `${firstName.toLowerCase()}${lastName.toLowerCase()}.${userId.toString().slice(0, 4)}`,
      userId,
    };
    const account = await accountDao.create(newAccount);
    await userDao.update(userId, { account: account._id });
    return account;
  }

  async depositAccount(query, amount, description) {
    const account = await accountDao.findOne(query);
    const movement = await movementDao.create({
      description: description ? description : "",
      operationType: "Deposito",
      destinationAccountId: account._id,
      amount,
    });

    const user = await userDao.findOne({ _id: account.userId });
    user.movements.push({ movement: movement._id });

    await userDao.update(account.userId, { movements: user.movements });

    return await accountDao.update(account._id, { balance: account.balance + amount });
  }

  async extractAccount(query, amount, description) {
    const account = await accountDao.findOne(query);
    if (account.balance < amount) return { status: "error", msg: "Saldo insuficiente" };

    const movement = await movementDao.create({
      description: description ? description : "",
      operationType: "Extracción",
      destinationAccountId: account._id,
      amount: amount * -1,
    });

    const user = await userDao.findOne({ _id: account.userId });
    user.movements.push({ movement: movement._id });
    await userDao.update(account.userId, { movements: user.movements });
    return await accountDao.update(account._id, { balance: account.balance - amount });
  }

  async transfer(query, amount, userId, description) {
    const originAccount = await accountDao.findOne({ userId });
    if (originAccount.balance < amount) return { status: "crocante", msg: "No hay plata" };
    const destinationAccount = await accountDao.findOne(query);
    const movementOrigin = await movementDao.create({
      description: description ? description : "",
      operationType: "Transferencia",
      destinationAccountId: destinationAccount._id,
      originAccountId: originAccount._id,
      amount: amount * -1,
    });

    const userOrigin = await userDao.findOne({ _id: userId });
    userOrigin.movements.push({ movement: movementOrigin._id });
    await userDao.update(userId, { movements: userOrigin.movements });

    const movementDestination = await movementDao.create({
      description: description ? description : "",
      operationType: "Transferencia",
      destinationAccountId: originAccount._id,
      originAccountId: destinationAccount._id,
      amount: amount,
    });

    const userDestination = await userDao.findOne({ _id: destinationAccount.userId });
    userDestination.movements.push({ movement: movementDestination._id });
    await userDao.update(destinationAccount.userId, { movements: userDestination.movements });
    return {
      originAccount: await accountDao.update(originAccount._id, { balance: originAccount.balance - amount }),
      destinationAccount: await accountDao.update(destinationAccount._id, {
        balance: destinationAccount.balance + amount,
      }),
    };
  }
}

export const accountService = new AccountService();
