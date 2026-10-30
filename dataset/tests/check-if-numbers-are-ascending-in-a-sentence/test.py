from solution import Solution

def run_tests():
    s = Solution()
    assert s.areNumbersAscending("1 box has 3 blue 4 red 6 green and 12 yellow marbles") == True
    assert s.areNumbersAscending("hello world 5 x 5") == False
    assert s.areNumbersAscending("sunset is at 7 51 pm and overnight low will be 44 and 75") == False
    print("All tests passed for check-if-numbers-are-ascending-in-a-sentence!")

if __name__ == "__main__":
    run_tests()
