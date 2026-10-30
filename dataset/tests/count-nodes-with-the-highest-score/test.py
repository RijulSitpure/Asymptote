from solution import Solution

def run_tests():
    s = Solution()
    assert s.countHighestScoreNodes([-1, 2, 0, 2, 0]) == 3
    assert s.countHighestScoreNodes([-1, 2, 0]) == 2
    print("All tests passed for count-nodes-with-the-highest-score!")

if __name__ == "__main__":
    run_tests()
