from solution import Bank

def run_tests():
    b = Bank([10, 100, 20, 50, 30])
    assert b.withdraw(3, 10) == True
    assert b.transfer(5, 1, 20) == True
    assert b.deposit(5, 20) == True
    assert b.transfer(3, 4, 15) == False
    assert b.withdraw(10, 50) == False
    print("All tests passed for simple-bank-system!")

if __name__ == "__main__":
    run_tests()
