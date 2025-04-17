import { accountDao } from "../persistence/dao/account.dao.js";
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

  async depositAccount(query, amount) {
    const account = await accountDao.findOne(query);
    return await accountDao.update(account._id, { balance: account.balance + amount });
  }

  async extractAccount(query, amount) {
    const account = await accountDao.findOne(query);
    return await accountDao.update(account._id, { balance: account.balance - amount });
  }

  async transfer(query, amount, userId) {
    const originAccount = await accountDao.findOne({ userId });
    const destinationAccount = await accountDao.findOne(query);

    return {
      originAccount: await accountDao.update(originAccount._id, {balance: originAccount.balance - amount}),
      destinationAccount: await accountDao.update(destinationAccount._id, {balance: destinationAccount.balance + amount})
    }
  }
}

export const accountService = new AccountService();
