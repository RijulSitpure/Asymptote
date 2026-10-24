class Solution:
    def findKthNumber(self, n: int, k: int) -> int:
        curr = 1
        k -= 1

        def count_steps(prefix: int) -> int:
            steps = 0
            first = prefix
            last = prefix
            while first <= n:
                steps += min(n + 1, last + 1) - first
                first *= 10
                last = last * 10 + 9
            return steps

        while k > 0:
            steps = count_steps(curr)
            if steps <= k:
                curr += 1
                k -= steps
            else:
                curr *= 10
                k -= 1

        return curr

def test():
    sol = Solution()
    assert sol.findKthNumber(13, 2) == 10, "test 1 failed"
    assert sol.findKthNumber(1, 1) == 1, "test 2 failed"
    assert sol.findKthNumber(100, 10) == 17, "test 3 failed"
    print("✓ k-th-smallest-in-lexicographical-order passed")

if __name__ == "__main__":
    test()
