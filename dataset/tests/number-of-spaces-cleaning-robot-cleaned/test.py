from solution import Solution

def run_tests():
    s = Solution()
    assert s.numberOfSpacesCleaned([[0, 0, 0], [1, 1, 0], [0, 0, 0]]) == 7
    assert s.numberOfSpacesCleaned([[0, 1, 0], [1, 0, 0], [0, 0, 0]]) == 1
    print("All tests passed for number-of-spaces-cleaning-robot-cleaned!")

if __name__ == "__main__":
    run_tests()
