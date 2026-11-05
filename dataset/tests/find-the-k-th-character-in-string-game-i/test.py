from solution import Solution

def run_tests():
    s = Solution()
    assert s.kthCharacter(5) == "b", "Example 1 failed"
    assert s.kthCharacter(10) == "c", "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
