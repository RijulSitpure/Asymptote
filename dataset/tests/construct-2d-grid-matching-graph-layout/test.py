from solution import Solution

def run_tests():
    s = Solution()
    g1 = s.constructGridLayout(4, [[0, 1], [0, 2], [1, 3], [2, 3]])
    assert len(g1) * len(g1[0]) == 4, "Example 1 dimension failed"
    g2 = s.constructGridLayout(5, [[0, 1], [1, 3], [2, 3], [2, 4]])
    assert len(g2) * len(g2[0]) == 5, "Example 2 dimension failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
