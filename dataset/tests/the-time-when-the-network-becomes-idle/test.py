from solution import Solution

def run_tests():
    s = Solution()
    assert s.networkBecomesIdle([[0, 1], [1, 2]], [0, 2, 1]) == 8
    assert s.networkBecomesIdle([[0, 1], [0, 2], [1, 2]], [0, 10, 10]) == 3
    print("All tests passed for the-time-when-the-network-becomes-idle!")

if __name__ == "__main__":
    run_tests()
