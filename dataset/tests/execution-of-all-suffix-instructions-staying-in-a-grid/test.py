from solution import Solution

def run_tests():
    s = Solution()
    assert s.executeInstructions(3, [0, 1], "RRDDLU") == [1, 5, 4, 3, 1, 0]
    assert s.executeInstructions(2, [1, 1], "LURD") == [4, 1, 0, 0]
    assert s.executeInstructions(1, [0, 0], "LRUD") == [0, 0, 0, 0]
    print("All tests passed for execution-of-all-suffix-instructions-staying-in-a-grid!")

if __name__ == '__main__':
    run_tests()
