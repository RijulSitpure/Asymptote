from solution import ATM
atm = ATM()
atm.deposit([0,0,1,2,1])
assert atm.withdraw(600) == [0,0,1,0,1]
atm.deposit([0,1,0,1,1])
assert atm.withdraw(600) == [-1]
assert atm.withdraw(550) == [0,1,0,0,1]
print("All tests passed for design-an-atm-machine!")
