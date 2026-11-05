class Solution:
    def countPopcountDepth(self, n: int, k: int) -> int:
        if n < 1:
            return 0
        depth = {1: 0}
        def get_depth(x: int) -> int:
            if x in depth:
                return depth[x]
            cnt = bin(x).count('1')
            depth[x] = 1 + get_depth(cnt)
            return depth[x]

        ans = 0
        for x in range(1, n + 1):
            if get_depth(x) == k:
                ans += 1
        return ans

def run_tests():
    s = Solution()
    res1 = s.countPopcountDepth(4, 1) # depth 1: popcount(x) = 1 (powers of 2 > 1): 2, 4 -> 2
    assert res1 == 2, f"Expected 2, got {res1}"
    res2 = s.countPopcountDepth(4, 0) # depth 0: 1 -> 1
    assert res2 == 1, f"Expected 1, got {res2}"
    print("3621 number-of-integers-with-popcount-depth-equal-to-k-i PASSED")

if __name__ == "__main__":
    run_tests()
