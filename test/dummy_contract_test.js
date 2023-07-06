const dummy_contract_test = artifacts.require("dummy_contract_test");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("dummy_contract_test", function (/* accounts */) {
  it("should assert true", async function () {
    await dummy_contract_test.deployed();
    return assert.isTrue(true);
  });
});
