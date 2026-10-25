class Solution:
    def minMoves(self, nums: list[int], limit: int) -> int:
        n = len(nums)
        diff = [0] * (2 * limit + 2)
        for i in range(n // 2):
            a, b = nums[i], nums[n - 1 - i]
            if a > b:
                a, b = b, a
            # default 2 moves for all sums: diff[2] += 2
            diff[2] += 2
            # 1 move range: a + 1 to b + limit
            diff[a + 1] -= 1
            # 0 move point: a + b
            diff[a + b] -= 1
            diff[a + b + 1] += 1
            # 2 move range resumes: b + limit + 1
            diff[b + limit + 1] += 1
        curr = 0
        ans = n
        for s in range(2, 2 * limit + 1):
            curr += diff[s]
            ans = min(ans, curr)
        return ans

def test():
    sol = Solution()
    assert sol.minMoves([1,2,4,3], 4) == 1
    assert sol.minMoves([1,2,2,1], 2) == 2
    assert sol.minMoves([1,2,1,2], 2) == 0

    print("✓ minimum-moves-to-make-array-complementary passed")

if __name__ == '__main__':
    test()
