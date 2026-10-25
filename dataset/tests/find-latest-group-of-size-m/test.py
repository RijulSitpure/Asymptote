class Solution:
    def findLatestStep(self, arr: list[int], m: int) -> int:
        n = len(arr)
        if m == n:
            return n
        length = [0] * (n + 2)
        count = [0] * (n + 1)
        ans = -1
        for step, x in enumerate(arr, 1):
            left = length[x - 1]
            right = length[x + 1]
            new_len = left + right + 1
            length[x - left] = new_len
            length[x + right] = new_len
            count[left] -= 1
            count[right] -= 1
            count[new_len] += 1
            if count[m] > 0:
                ans = step
        return ans

def test():
    sol = Solution()
    assert sol.findLatestStep([3,5,1,2,4], 1) == 4, "test 1 failed"
    assert sol.findLatestStep([3,1,5,4,2], 2) == -1, "test 2 failed"
    print("✓ find-latest-group-of-size-m passed")

if __name__ == "__main__":
    test()
