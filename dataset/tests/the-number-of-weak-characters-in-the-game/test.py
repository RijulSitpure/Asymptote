from solution import Solution

def run_tests():
    s = Solution()
    assert s.numberOfWeakCharacters([[5, 5], [6, 3], [3, 6]]) == 0
    assert s.numberOfWeakCharacters([[2, 2], [3, 3]]) == 1
    assert s.numberOfWeakCharacters([[1, 5], [10, 4], [4, 3]]) == 1
    print("All tests passed for the-number-of-weak-characters-in-the-game!")

if __name__ == "__main__":
    run_tests()
