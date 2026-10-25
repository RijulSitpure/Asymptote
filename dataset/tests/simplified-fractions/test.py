import math

class Solution:
    def simplifiedFractions(self, n: int) -> list[str]:
        res = []
        for d in range(2, n + 1):
            for num in range(1, d):
                if math.gcd(num, d) == 1:
                    res.append(f"{num}/{d}")
        return res

def test():
    sol = Solution()
    assert sol.simplifiedFractions(2) == ["1/2"], "test 1 failed"
    assert sol.simplifiedFractions(3) == ["1/2","1/3","2/3"], "test 2 failed"
    assert sol.simplifiedFractions(4) == ["1/2","1/3","2/3","1/4","3/4"], "test 3 failed"
    print("✓ simplified-fractions passed")

if __name__ == "__main__":
    test()
