import math

class Solution:
    def smallestGoodBase(self, n: str) -> str:
        num = int(n)
        max_m = int(math.log2(num))

        for m in range(max_m, 1, -1):
            k = int(num ** (1.0 / m))
            if k >= 2:
                total = sum(k**i for i in range(m + 1))
                if total == num:
                    return str(k)

        return str(num - 1)

def test():
    sol = Solution()
    assert sol.smallestGoodBase("13") == "3", "test 1 failed"
    assert sol.smallestGoodBase("4681") == "8", "test 2 failed"
    assert sol.smallestGoodBase("1000000000000000000") == "999999999999999999", "test 3 failed"
    print("✓ smallest-good-base passed")

if __name__ == "__main__":
    test()
