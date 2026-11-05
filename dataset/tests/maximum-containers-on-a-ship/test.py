class Solution:
    def maxContainers(self, n: int, w: int, maxWeight: int) -> int:
        return min(n * n, maxWeight // w)

def run_tests():
    s = Solution()
    assert s.maxContainers(2, 3, 15) == 4
    assert s.maxContainers(3, 5, 20) == 4
    print("All tests passed for maximum-containers-on-a-ship")

if __name__ == '__main__':
    run_tests()
