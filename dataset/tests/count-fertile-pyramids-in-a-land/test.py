from solution import Solution

def run_tests():
    s = Solution()
    assert s.countPyramids([[0,1,1,0],[1,1,1,1]]) == 2
    assert s.countPyramids([[1,1,1],[1,1,1]]) == 2
    assert s.countPyramids([[1,1,1,1,0],[1,1,1,1,1],[1,1,1,1,1],[0,1,0,0,0]]) == 13
    print("All tests passed for count-fertile-pyramids-in-a-land!")

if __name__ == '__main__':
    run_tests()
