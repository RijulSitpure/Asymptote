from solution import Solution

def run_tests():
    s = Solution()
    assert s.asteroidsDestroyed(10, [3, 9, 19, 5, 21]) is True
    assert s.asteroidsDestroyed(5, [4, 9, 23, 4]) is False
    print("All tests passed for destroying-asteroids!")

if __name__ == '__main__':
    run_tests()
