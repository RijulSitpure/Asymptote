class Solution:
    def canChoose(self, groups: list[list[int]], nums: list[int]) -> bool:
        idx = 0
        n = len(nums)
        for g in groups:
            m = len(g)
            found = False
            while idx + m <= n:
                if nums[idx:idx + m] == g:
                    idx += m
                    found = True
                    break
                idx += 1
            if not found:
                return False
        return True

def test():
    sol = Solution()
    assert sol.canChoose([[1,-1,-1],[3,-2,0]], [1,-1,0,1,-1,-1,3,-2,0]) == True
    assert sol.canChoose([[10,-2],[1,2,3,4]], [1,2,3,4,10,-2]) == False
    assert sol.canChoose([[1,2,3],[3,4]], [7,7,1,2,3,4,7,7]) == False

    print("✓ form-array-by-concatenating-subarrays-of-another-array passed")

if __name__ == '__main__':
    test()
