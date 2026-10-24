class Solution:
    def reachNumber(self, target: int) -> int:
        target = abs(target)
        k = 0
        total = 0
        while total < target or (total - target) % 2 != 0:
            k += 1
            total += k
        return k

def test():
    sol = Solution()
    assert sol.reachNumber(2) == 3, "test 1 failed"
    assert sol.reachNumber(3) == 2, "test 2 failed"
    print("✓ reach-a-number passed")

if __name__ == "__main__":
    test()
