class Solution:
    def orderlyQueue(self, s: str, k: int) -> str:
        if k > 1:
            return "".join(sorted(s))
        return min(s[i:] + s[:i] for i in range(len(s)))

def test():
    sol = Solution()
    assert sol.orderlyQueue("cba", 1) == "acb", "test 1 failed"
    assert sol.orderlyQueue("baaca", 3) == "aaabc", "test 2 failed"
    print("✓ orderly-queue passed")

if __name__ == "__main__":
    test()
