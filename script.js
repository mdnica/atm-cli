const Account = require("./Account");
const CommandLine = require("./CommandLine");

async function main() {
  try {
    const accountName = await CommandLine.ask(
      "Which account would you like to acccess?"
    );
    const account = await Account.find(accountName);
    if (account === null) account = await promptCreateAccount(accountName);
    if (Account != null) await promptTask(account);
  } catch (e) {
    CommandLine.print("ERROR: Please try again");
  }
}

async function promptCreateAccount(accountName) {
  const response = await CommandLine.ask(
    "That account does not exist. Would you like to create it? (yes/no) "
  );

  if (response === "yes") {
    return await Account.create(accountName);
  }
}

async function promptTask(account) {
  const response = await CommandLine.ask(
    "What would you like to do? (view/deposit/whitdraw)"
  );

  if (response === "deposit") {
    const amount = parseFloat(await CommandLine.ask("How much?"));
    await account.deposit(amount);
  } else if (response === "whitdraw") {
    const amount = parseFloat(await CommandLine.ask("How much?"));
    try {
      await account.whitdraw(amount);
    } catch (e) {
      CommandLine.print(
        "We were unable to make the whitdrawal. Please ensure you have enough money in your account"
      );
    }
  }

  CommandLine.print(`your balance is ${account.balance}`);
}

main();
