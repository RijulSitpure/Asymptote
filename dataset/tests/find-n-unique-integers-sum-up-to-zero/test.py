class Solution:
    def sumZero(self, n: int) -> list[int]:
        res = []
        for i in range(1, n // 2 + 1):
            res.extend([i, -i])
        if n % 2 == 1:
            res.append(0)
        return res

def test():
    sol = Solution()
    assert sol.sumZero(5) == [1,-1,2,-2,0], "test 1 failed"
    assert sol.sumZero(3) == [1,-1,0], "test 2 failed"
    assert sol.sumZero(1) == [0], "test 3 failed"
    print("✓ find-n-unique-integers-sum-up-to-zero passed")

if __name__ == "__main__":
    test()
