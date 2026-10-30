from solution import Solution

def run_tests():
    s = Solution()
    assert s.minimumCost("i love leetcode", 12) == 36
    assert s.minimumCost("apples and bananas taste great", 7) == 21
    print("All tests passed for minimum-cost-to-separate-sentence-into-rows!")

if __name__ == "__main__":
    run_tests()
