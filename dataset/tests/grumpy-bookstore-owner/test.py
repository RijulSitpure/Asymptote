from typing import List

class Solution:
    def maxSatisfied(self, customers: List[int], grumpy: List[int], minutes: int) -> int:
        baseline = sum(c for c, g in zip(customers, grumpy) if g == 0)
        extra = 0
        cur = 0
        for i in range(len(customers)):
            if grumpy[i] == 1:
                cur += customers[i]
            if i >= minutes and grumpy[i - minutes] == 1:
                cur -= customers[i - minutes]
            extra = max(extra, cur)
        return baseline + extra

def test():
    sol = Solution()
    c = [1,0,1,2,1,1,7,5]
    g = [0,1,0,1,0,1,0,1]
    assert sol.maxSatisfied(c, g, 3) == 16, "test 1 failed"
    assert sol.maxSatisfied([1], [0], 1) == 1, "test 2 failed"
    print("✓ grumpy-bookstore-owner passed")

if __name__ == "__main__":
    test()
